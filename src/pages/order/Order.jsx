import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import myContext from "../../context/data/myContext";
import Layout from "../../components/layout/Layout";
import Time from "../../components/Time/Time";

const Order = () => {

  
  const userid = JSON.parse(localStorage.getItem("user") || "{}")?.user?.email || "";
  const { order } = useContext(myContext);
  const userOrders = Array.isArray(order) ? order.filter((obj) => obj.email === userid) : [];
  const [timeUpMap, setTimeUpMap] = useState({});

  const filteredOrders = userOrders.flatMap((o) => o.cartItems || []).filter((item) =>
    item.category?.includes("OnlineExam")
  );
  const handleTimeEnd = (index) => {
    setTimeUpMap((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <Layout>
      <div className="min-h-screen p-6">
        <h1 className="text-white text-3xl font-bold p-4 text-center">Your Exam </h1>
        {userOrders.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((item, index) => (
                <div key={index} className="bg-[#282c34] text-white flex flex-col justify-between rounded-xl shadow-lg overflow-hidden transition-all transform hover:scale-105 duration-300 p-2">
                  <div>
                  <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover rounded-t-xl" />
                  <h2 className="text-2xl font-semibold">{item.title}</h2>
                  </div>
                 
                  <div className="mt-8 flex justify-evenly w-full align-bottom">
                      <div>
                      <Time 
                            targetTime="2025-03-16T11:00:00" 
                            onTimeEnd={() => handleTimeEnd(index)}
                          >
                            <Link to={item.location || "#"}>
                              <button className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-200 ease-in-out">
                                Enroll Now
                              </button>
                            </Link>
                          </Time>
                      </div>
                        
                        <button
                      onClick={() => (window.location.href = `/webproductinfo/${item.id}`)}
                      className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-200 ease-in-out"
                    >
                      Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <h2 className="text-center text-3xl font-semibold mt-10 text-white">No matching orders found</h2>
            )}
          </div>
        ) : (
          <h2 className="text-center text-3xl font-semibold mt-20 text-white">No Orders Found</h2>
        )}
      </div>
    </Layout>
  );
};

export default Order;
