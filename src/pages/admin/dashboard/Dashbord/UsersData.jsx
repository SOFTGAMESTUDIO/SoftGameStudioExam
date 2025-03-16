import React, { useContext, useState } from "react";
import myContext from "../../../../context/data/myContext";

const UsersData = () => {
  const { user } = useContext(myContext);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter users based on search query (rollno or email)
  const filteredUsers = user.filter(
    (item) =>
      item.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
      {/* Page Header */}
      <header className="text-center mb-10">
        <h1 className="text-5xl font-bold mb-4 text-gray-100">
          User Management
        </h1>
        <p className="text-lg text-gray-400">
          Search and manage user details effortlessly
        </p>
      </header>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search by  Email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 w-1/2 text-gray-900 bg-gray-100 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
        />
      </div>

      {/* User Data Table */}
      <div className="overflow-x-auto rounded-lg shadow-xl bg-gray-800">
        <table className="min-w-full table-auto border-collapse text-gray-200">
          {/* Table Header */}
          <thead className="bg-gray-700 text-lg">
            <tr>
              <th className="px-6 py-4 text-left border-b border-gray-600">
                S.No
              </th>
              <th className="px-6 py-4 text-left border-b border-gray-600">
                Name
              </th>
              <th className="px-6 py-4 text-left border-b border-gray-600">
                Email
              </th>
              <th className="px-6 py-4 text-left border-b border-gray-600">
                Roll No
              </th>
              <th className="px-6 py-4 text-left border-b border-gray-600">
                UID
              </th>
              <th className="px-6 py-4 text-left border-b border-gray-600">
                Phone
              </th>
              <th className="px-6 py-4 text-left border-b border-gray-600">
                Address
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {filteredUsers.map((item, index) => (
              <tr
                key={item.uid}
                className={`${
                  index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                } hover:bg-gray-600 transition duration-300`}
              >
                <td className="px-6 py-4 border-b border-gray-600">
                  {index + 1}
                </td>
                <td className="px-6 py-4 border-b border-gray-600">
                  {item.name}
                </td>
                <td className="px-6 py-4 border-b border-gray-600">
                  {item.email}
                </td>
                <td className="px-6 py-4 border-b border-gray-600">
                  {item.rollNumber}
                </td>
                <td className="px-6 py-4 border-b border-gray-600">
                  {item.uid}
                </td>
                <td className="px-6 py-4 border-b border-gray-600">
                  {item.phone}
                </td>
                <td className="px-6 py-4 border-b border-gray-600">
                  <p>{`House No: #${item.address?.houseno || "N/A"}`}</p>
                  <p>{`Street No: ${item.address?.streetno || "N/A"}`}</p>
                  <p>{`Area: ${item.address?.area || "N/A"}`}</p>
                  <p>{`City: ${item.address?.city || "N/A"}`}</p>
                  <p>{`State: ${item.address?.state || "N/A"}`}</p>
                  <p>{`Country: ${item.address?.country || "N/A"}`}</p>
                  <p>{`Pincode: ${item.address?.pincode || "N/A"}`}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersData;
