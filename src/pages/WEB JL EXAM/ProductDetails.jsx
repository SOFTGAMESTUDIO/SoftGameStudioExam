import React, { useContext, useEffect, useState } from "react";
import myContext from "../../context/data/myContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import parse from "html-react-parser";
import { useParams } from "react-router";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { fireDB } from "../../fireabase/FirebaseConfig";
import Layout from "../../components/layout/Layout";

const ProductDetails = () => {
  const { mode, loading, setLoading } = useContext(myContext);
  const [product, setProduct] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  useEffect(() => {
    const getProductData = async () => {
      setLoading(true);
      try {
        const productDoc = await getDoc(doc(fireDB, "ExamConduct", params.id));
        setProduct(productDoc.data());
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };
    getProductData();
  }, [params.id, setLoading]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addCart = (product) => {
    dispatch(addToCart(product));
    toast.success("Added to cart");
  };

  if (loading || !product) {
    return <p className="text-center text-white">Loading...</p>;
  }

  return (
    <Layout>
      <section className="text-gray-300 body-font bg-gray-900 py-10">
        <div className="container mx-auto px-5">
          <div className="border border-gray-700 rounded-xl p-6 shadow-lg">
            <div className="flex flex-wrap md:flex-nowrap ">
              <img
                alt={product.title}
                className="md:w-1/2 w-60 h-full object-contain rounded-lg"
                src={product.imageUrl}
              />
              <div className="md:w-1/2 w-full md:pl-10 mt-6 md:mt-0">
                <h2 className="text-sm text-cyan-400 font-semibold uppercase tracking-wide mb-2">
                  {product.category}
                </h2>
                <h1 className="text-white text-4xl font-bold mb-4">
                  {product.title}
                </h1>
                <p className="leading-relaxed text-gray-400 mb-6">
                  {parse(product.description)}
                </p>
                
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetails;
