import React, { useContext, useEffect } from "react";
import myContext from "../../context/data/myContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function ProductCard() {
  const context = useContext(myContext);
  const { product } = context;

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  console.log(cartItems);

  const addCart = (product) => {
    dispatch(addToCart(product));
    toast.success("Add to cart");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    window.scrollTo(0, 8);
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));

  // Filtering products into two groups
  const freeProducts = product
    .filter((obj) => Number(obj.price) === 0)
    .filter((obj) => obj.category !== "Game" && obj.category !== "Projects")
    .filter(
      (obj) => obj.category !== "Online Exam" && obj.category !== "Seminars"
    );
  const pricedProducts = product
    .filter((obj) => Number(obj.price) > 0)
    .filter((obj) => obj.category !== "Game" && obj.category !== "Projects")
    .filter(
      (obj) => obj.category !== "Online Exam" && obj.category !== "Seminars"
    );
  const Game = product.filter((obj) => obj.category === "Game");
  const Project = product.filter((obj) => obj.category === "Projects");

  return (
    <section className="text-gray-600 body-font">
      <div className="block">
        <div className="w-full mb-6">
          {/* Free Products Section */}
          <section className="text-gray-600 body-font">
            <div className="block container px-5 py-8 md:py-16 mx-auto">
              <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-100">
                  {" "}
                  Our Register Free Courses
                </h1>
                <div className="h-1 w-20 bg-white rounded"></div>
              </div>
              <>
                <div className="block m-4"></div>
                <div className="items-center text-center">
                  <div className="flex flex-wrap justify-evenly ">
                    {freeProducts.slice(0, 2).map((item, index) => {
                      const {
                        title,
                        price,
                        imageUrl,
                        category,
                        description,
                        location,
                        id,
                      } = item;
                      // Logic for free products
                      return (
                        <div className="flex-wrap " key={index}>
                          <div class="p-4 md:w-96 ">
                            <div class=" border-2 border-gray-800 rounded-lg overflow-hidden">
                              <img
                                alt="ecommerce"
                                className="lg:h-60 md:h-60 w-full object-cover object-center"
                                src={imageUrl}
                              />
                              <div class="p-6 ">
                                <h2 class="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
                                  {category}
                                </h2>
                                <h1 class="h-14 title-font text-lg font-medium text-white mb-3">
                                  {title}
                                </h1>
                                {/* <p class="h-48 leading-relaxed mb-3  overflow-scroll">
                                      {description}
                                    </p> */}
                                <div class="">
                                  <Link to={location}>
                                    <button
                                      type="button"
                                      className="focus:outline-none m-2 text-black bg-cyan-400  font-medium rounded-lg text-sm w-full py-2"
                                    >
                                      <a class="text-black inline-flex items-center md:mb-2 lg:mb-0">
                                        Access Now
                                        <svg
                                          class="w-4 h-4 ml-2"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                          stroke-width="2"
                                          fill="none"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        >
                                          <path d="M5 12h14"></path>
                                          <path d="M12 5l7 7-7 7"></path>
                                        </svg>
                                      </a>
                                    </button>
                                  </Link>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      (window.location.href = `/productinfo/${id}`)
                                    }
                                    className="focus:outline-none m-2 text-black bg-cyan-400  font-medium rounded-lg text-sm w-full py-2"
                                  >
                                    <a class="text-black inline-flex items-center md:mb-2 lg:mb-0">
                                      Details
                                      <svg
                                        class="w-4 h-4 ml-2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        fill="none"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      >
                                        <path d="M5 12h14"></path>
                                        <path d="M12 5l7 7-7 7"></path>
                                      </svg>
                                    </a>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <button>
                    <Link
                      to={"/allproducts"}
                      className="flex justify-center items-center bg-cyan-400 p-4 rounded-full"
                    >
                      <i class="fa-solid fa-layer-group mr-2"></i>
                      <h1>Explore More Free Courses</h1>
                    </Link>
                  </button>
                </div>
              </>
            </div>
          </section>

          {/* Priced Products  Section */}
          <section className="text-gray-600 body-font">
            <div className="block container px-5 py-8 md:py-16 mx-auto">
              <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-100">
                  {" "}
                  Our Register Priced Courses
                </h1>
                <div className="h-1 w-20 bg-white rounded"></div>
              </div>
              <>
                <div className="block m-4"></div>
                <div className="items-center text-center">
                  <div className="flex flex-wrap justify-evenly ">
                    {pricedProducts.slice(0, 2).map((item, index) => {
                      const {
                        title,
                        price,
                        imageUrl,
                        category,
                        description,
                        location,
                        id,
                      } = item;
                      // Logic for free products
                      return (
                        <div className="flex-wrap " key={index}>
                          <div class="p-4 md:w-96 ">
                            <div class=" border-2 border-gray-800 rounded-lg overflow-hidden">
                              <img
                                alt="ecommerce"
                                className="lg:h-60 md:h-60 w-full object-cover object-center"
                                src={imageUrl}
                              />
                              <div class="p-6 ">
                                <h2 class="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
                                  {category}
                                </h2>
                                <h1 class="h-14 title-font text-lg font-medium text-white mb-3">
                                  {title}
                                </h1>
                                {/* <p class="h-48 leading-relaxed mb-3  overflow-scroll">
                                      {description}
                                    </p> */}
                                <div class="">
                                  <button
                                    type="button"
                                    onClick={() => addCart(item)}
                                    className="focus:outline-none m-2 text-black bg-cyan-400  font-medium rounded-lg text-sm w-full py-2"
                                  >
                                    <a class="text-black inline-flex items-center md:mb-2 lg:mb-0">
                                      ₹ {price} Add Cart
                                      <svg
                                        class="w-4 h-4 ml-2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        fill="none"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      >
                                        <path d="M5 12h14"></path>
                                        <path d="M12 5l7 7-7 7"></path>
                                      </svg>
                                    </a>
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      (window.location.href = `/productinfo/${id}`)
                                    }
                                    className="focus:outline-none m-2 text-black bg-cyan-400  font-medium rounded-lg text-sm w-full py-2"
                                  >
                                    <a class="text-black inline-flex items-center md:mb-2 lg:mb-0">
                                      Details
                                      <svg
                                        class="w-4 h-4 ml-2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        fill="none"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      >
                                        <path d="M5 12h14"></path>
                                        <path d="M12 5l7 7-7 7"></path>
                                      </svg>
                                    </a>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <button>
                    <Link
                      to={"/prumium_cources"}
                      className="flex justify-center items-center bg-cyan-400 p-4 rounded-full"
                    >
                      <i class="fa-solid fa-layer-group mr-2"></i>
                      <h1>Explore More Priced Courses</h1>
                    </Link>
                  </button>
                </div>
              </>
            </div>
          </section>
          {/* Game Code  Section */}
          <section className="text-gray-600 body-font">
            <div className="block container px-5 py-8 md:py-16 mx-auto">
              <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-100">
                  {" "}
                  Our Register Games Code
                </h1>
                <div className="h-1 w-20 bg-white rounded"></div>
              </div>
              <>
                <div className="block m-4"></div>
                <div className="items-center text-center">
                  <div className="flex flex-wrap justify-evenly ">
                    {Game.slice(0, 2).map((item, index) => {
                      const {
                        title,
                        price,
                        imageUrl,
                        category,
                        description,
                        location,
                        id,
                      } = item;
                      // Logic for free products
                      return (
                        <div className="flex-wrap " key={index}>
                          <div class="p-4 md:w-96 ">
                            <div class=" border-2 border-gray-800 rounded-lg overflow-hidden">
                              <img
                                alt="ecommerce"
                                className="lg:h-60 md:h-60 w-full object-cover object-center"
                                src={imageUrl}
                              />
                              <div class="p-6 ">
                                <h2 class="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
                                  {category}
                                </h2>
                                <h1 class="h-14 title-font text-lg font-medium text-white mb-3">
                                  {title}
                                </h1>
                                {/* <p class="h-48 leading-relaxed mb-3  overflow-scroll">
                                      {description}
                                    </p> */}
                                <div class="">
                                  <button
                                    type="button"
                                    onClick={() => addCart(item)}
                                    className="focus:outline-none m-2 text-black bg-cyan-400  font-medium rounded-lg text-sm w-full py-2"
                                  >
                                    <a class="text-black inline-flex items-center md:mb-2 lg:mb-0">
                                      ₹ {price} Add Cart
                                      <svg
                                        class="w-4 h-4 ml-2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        fill="none"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      >
                                        <path d="M5 12h14"></path>
                                        <path d="M12 5l7 7-7 7"></path>
                                      </svg>
                                    </a>
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      (window.location.href = `/productinfo/${id}`)
                                    }
                                    className="focus:outline-none m-2 text-black bg-cyan-400  font-medium rounded-lg text-sm w-full py-2"
                                  >
                                    <a class="text-black inline-flex items-center md:mb-2 lg:mb-0">
                                      Details
                                      <svg
                                        class="w-4 h-4 ml-2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        fill="none"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      >
                                        <path d="M5 12h14"></path>
                                        <path d="M12 5l7 7-7 7"></path>
                                      </svg>
                                    </a>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <button>
                    <Link
                      to={"/Game_Code"}
                      className="flex justify-center items-center bg-cyan-400 p-4 rounded-full"
                    >
                      <i class="fa-solid fa-layer-group mr-2"></i>
                      <h1>Explore More Game Code</h1>
                    </Link>
                  </button>
                </div>
              </>
            </div>
          </section>
          {/* Projects Code  Section */}
          <section className="text-gray-600 body-font">
            <div className="block container px-5 py-8 md:py-16 mx-auto">
              <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-100">
                  {" "}
                  Our Register Projects Code
                </h1>
                <div className="h-1 w-20 bg-white rounded"></div>
              </div>
              <>
                <div className="block m-4"></div>
                <div className="items-center text-center">
                  <div className="flex flex-wrap justify-evenly ">
                    {Project.slice(0, 2).map((item, index) => {
                      const {
                        title,
                        price,
                        imageUrl,
                        category,
                        description,
                        location,
                        id,
                      } = item;
                      // Logic for free products
                      return (
                        <div className="flex-wrap " key={index}>
                          <div class="p-4 md:w-96 ">
                            <div class=" border-2 border-gray-800 rounded-lg overflow-hidden">
                              <img
                                alt="ecommerce"
                                className="lg:h-60 md:h-60 w-full object-cover object-center"
                                src={imageUrl}
                              />
                              <div class="p-6 ">
                                <h2 class="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
                                  {category}
                                </h2>
                                <h1 class="h-14 title-font text-lg font-medium text-white mb-3">
                                  {title}
                                </h1>
                                {/* <p class="h-48 leading-relaxed mb-3  overflow-scroll">
                                       {description}
                                     </p> */}
                                <div class="">
                                  <button
                                    type="button"
                                    onClick={() => addCart(item)}
                                    className="focus:outline-none m-2 text-black bg-cyan-400  font-medium rounded-lg text-sm w-full py-2"
                                  >
                                    <a class="text-black inline-flex items-center md:mb-2 lg:mb-0">
                                      ₹ {price} Add Cart
                                      <svg
                                        class="w-4 h-4 ml-2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        fill="none"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      >
                                        <path d="M5 12h14"></path>
                                        <path d="M12 5l7 7-7 7"></path>
                                      </svg>
                                    </a>
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      (window.location.href = `/productinfo/${id}`)
                                    }
                                    className="focus:outline-none m-2 text-black bg-cyan-400  font-medium rounded-lg text-sm w-full py-2"
                                  >
                                    <a class="text-black inline-flex items-center md:mb-2 lg:mb-0">
                                      Details
                                      <svg
                                        class="w-4 h-4 ml-2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        fill="none"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      >
                                        <path d="M5 12h14"></path>
                                        <path d="M12 5l7 7-7 7"></path>
                                      </svg>
                                    </a>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <button>
                    <Link
                      to={"/Projects_Code"}
                      className="flex justify-center items-center bg-cyan-400 p-4 rounded-full"
                    >
                      <i class="fa-solid fa-layer-group mr-2"></i>
                      <h1>Explore More Projects Code</h1>
                    </Link>
                  </button>
                </div>
              </>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

export default ProductCard;
