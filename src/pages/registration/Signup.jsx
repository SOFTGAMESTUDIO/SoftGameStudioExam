import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import myContext from "../../context/data/myContext";
import Layout from "../../components/layout/Layout";

function Signup() {
  const context = useContext(myContext);
  const { newUser, setNewUser, addUser } = context;


  return (
    <Layout>
 <div className="bg-gray-900 flex justify-center items-center h-full text-white">
      <div className="bg-gray-800 px-10 py-10 rounded-xl">
        <div>
          <h1 className="text-center text-white text-xl mb-4 font-bold">
            Create a Free Account
          </h1>
        </div>
        <div>
          <input
            type="text"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            name="Name"
            className="bg-gray-600 mb-4 px-2 py-2 w-full  rounded-lg placeholder:text-white outline-none"
            placeholder="Name"
          />
        </div>
        <div>
          <input
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            name="email"
            className="bg-gray-600 mb-4 px-2 py-2 w-full  rounded-lg placeholder:text-white outline-none"
            placeholder="Email"
          />
        </div>
        <div>
          <input
            type="password"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
            name="password"
            className="bg-gray-600 mb-4 px-2 py-2 w-full  rounded-lg placeholder:text-white outline-none"
            placeholder="Password"
          />
        </div>
        <div className="flex mb-4">
          <input
            type="text"
            value={newUser.phone}
            onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
            className="bg-gray-600 mb-4 px-2 py-2 w-full  rounded-lg placeholder:text-white outline-none"
            placeholder="Phone Number"
          />
        </div>

        {/* Address Container */}
        <div className="mb-4 border-white border-2 rounded-xl p-2">
          <h2 className="text-white font-bold mb-2">Address</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                value={newUser.address.houseno}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    address: { ...newUser.address, houseno: e.target.value },
                  })
                }
                name="address"
                className="bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg placeholder:text-white outline-none"
                placeholder="House No."
              />
            </div>
            <div>
              <input
                type="text"
                value={newUser.address.streetno}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    address: { ...newUser.address, streetno: e.target.value },
                  })
                }
                name="address"
                className="bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg placeholder:text-white outline-none"
                placeholder="Street No."
              />
            </div>
            <div>
              <input
                type="text"
                value={newUser.address.area}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    address: { ...newUser.address, area: e.target.value },
                  })
                }
                name="address"
                className="bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg placeholder:text-white outline-none"
                placeholder="Area"
              />
            </div>
            <div>
              <input
                type="text"
                value={newUser.address.city}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    address: { ...newUser.address, city: e.target.value },
                  })
                }
                name="address"
                className="bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg placeholder:text-white outline-none"
                placeholder="City"
              />
            </div>
            <div>
              <input
                type="text"
                value={newUser.address.state}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    address: { ...newUser.address, state: e.target.value },
                  })
                }
                name="address"
                className="bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg placeholder:text-white outline-none"
                placeholder="State"
              />
            </div>
            <div>
              <input
                type="text"
                value={newUser.address.pincode}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    address: { ...newUser.address, pincode: e.target.value },
                  })
                }
                name="address"
                className="bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg placeholder:text-white outline-none"
                placeholder="Pincode"
              />
            </div>
            <div>
              <input
                type="text"
                value={newUser.address.country}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    address: { ...newUser.address, country: e.target.value },
                  })
                }
                name="address"
                className="bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg placeholder:text-white outline-none"
                placeholder="Country"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-3">
          <button
            onClick={addUser}
            className="bg-red-500 hover:bg-red-800 w-full text-white font-bold px-2 py-2 rounded-lg"
          >
            Signup
          </button>
        </div>
        <div>
          <div className="text-xs flex items-center text-center">
            <h1 className="text-white m-2">
              Already have an account?{" "}
              <Link to={"/login"} className="text-red-700 font-bold">
                Login
              </Link>
            </h1>
          </div>
        </div>
      </div>
    </div>
    </Layout>
   
    
  );
}

export default Signup;
