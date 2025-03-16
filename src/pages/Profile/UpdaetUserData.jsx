import React, { useContext } from "react";
import myContext from "../../context/data/myContext";
import Layout from "../../components/layout/Layout";

const UpdateUserData = () => {
  const context = useContext(myContext);
  const { user, setUser, updateUser } = context;

  // Helper function to update address fields
  const handleAddressChange = (field, value) => {
    setUser({
      ...user,
      address: { ...user.address, [field]: value },
    });
  };

  return (
    <Layout>
  <div className="bg-gray-900 flex justify-center items-center h-screen text-white">
      <div className="bg-gray-800 p-10 rounded-xl shadow-lg w-full max-w-lg">
        <h1 className="text-center text-xl mb-6 font-bold">Update User Details</h1>

        {/* User Information */}
        <div className="space-y-4">
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="bg-gray-700 px-4 py-2 w-full rounded-lg text-white placeholder-gray-400 outline-none"
            placeholder="Name"
          />
          <input
            type="text"
            value={user.phone}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
            className="bg-gray-700 px-4 py-2 w-full rounded-lg text-white placeholder-gray-400 outline-none"
            placeholder="Phone No."
          />
        </div>

        {/* Address Section */}
        <div className="mt-6 p-4 bg-gray-700 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-4">Address</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { field: "houseno", placeholder: "House No." },
              { field: "streetno", placeholder: "Street No." },
              { field: "area", placeholder: "Area" },
              { field: "city", placeholder: "City" },
              { field: "state", placeholder: "State" },
              { field: "pincode", placeholder: "Pincode" },
              { field: "country", placeholder: "Country" },
            ].map(({ field, placeholder }) => (
              <input
                key={field}
                type="text"
                value={user.address?.[field] || ""}
                onChange={(e) => handleAddressChange(field, e.target.value)}
                className="bg-gray-600 px-4 py-2 w-full rounded-lg text-white placeholder-gray-400 outline-none"
                placeholder={placeholder}
              />
            ))}
          </div>
        </div>

        <button
          onClick={updateUser}
          className="mt-6 bg-yellow-500 hover:bg-yellow-600 w-full text-black font-bold px-4 py-2 rounded-lg transition"
        >
          Update User
        </button>
      </div>
    </div>
    </Layout>
  
  );
};

export default UpdateUserData;
