import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import myContext from "../../context/data/myContext";
import Layout from "../../components/layout/Layout";
import { fireDB } from "../../fireabase/FirebaseConfig";
import Time from "../../components/Time/Time";

const Profile = () => {
  const [rollNo, setRollNo] = useState("");
  const [allResults, setAllResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ads, setAds] = useState([]);
  const [events, setEvents] = useState([]);
  const [filteredUser, setFilteredUser] = useState({});

  const navigate = useNavigate();
  const userid = JSON.parse(localStorage.getItem("user"))?.user?.email;
  const { user, editUserHandle, deleteUserData, order } = useContext(myContext);

  const userOrders = order.filter((obj) => obj.email === userid);
  const filteredOrders = userOrders.flatMap((o) => o.cartItems);

  const db = getFirestore();
  const adsCollection = collection(db, "advertisements");
  const EventCollection = collection(db, "Event");

  // Fetch all results from Firestore
  const fetchAllResults = async () => {
    setLoading(true);
    try {
      const resultsRef = collection(fireDB, "results");
      const querySnapshot = await getDocs(resultsRef);
      const resultsData = querySnapshot.docs.map((doc) => doc.data());
      setAllResults(resultsData);
      setFilteredResults(resultsData);
    } catch (error) {
      console.error("Error fetching results:", error);
      alert("Failed to fetch results. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch ads and events
  const fetchAds = async () => {
    const querySnapshot = await getDocs(adsCollection);
    let adsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    adsData.sort((a, b) => new Date(b.date) - new Date(a.date));
    setAds(adsData);
  };

  const fetchEvents = async () => {
    const querySnapshot = await getDocs(EventCollection);
    let adsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    adsData.sort((a, b) => new Date(b.date) - new Date(a.date));
    setEvents(adsData);
  };

  useEffect(() => {
    fetchAllResults();
    fetchEvents();
    fetchAds();
  }, []);

  useEffect(() => {
    if (user && userid) {
      const matchedUser = user.find((obj) => obj.email === userid);
      setFilteredUser(matchedUser || {});
    }
    setLoading(false);
  }, [user, userid]);

  // Handle search by email
  const handleSearch = (e) => {
    setRollNo(e.target.value);
    if (!e.target.value.trim()) {
      setFilteredResults(allResults);
    } else {
      const filteredData = allResults.filter((result) =>
        result.email.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredResults(filteredData);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <h2 className="text-2xl text-cyan-400 animate-pulse">Loading...</h2>
      </div>
    );
  }

  if (!filteredUser) {
    navigate("/login");
    return null;
  }

  const ProfileCard = () => {
    const [showOptions, setShowOptions] = useState(false);

    return (
      <div className="bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-2xl font-bold text-cyan-400 text-center mb-6">
          Profile Information
        </h2>
        <div className="space-y-4 text-gray-300">
          <p>
            <span className="font-semibold text-cyan-400">Name: </span>
            {filteredUser.name || "Unknown User"}
          </p>
          <p>
            <span className="font-semibold text-cyan-400">Email: </span>
            {filteredUser.email || "No email provided"}
          </p>
          <p>
            <span className="font-semibold text-cyan-400">Roll Number: </span>
            {filteredUser.rollNumber || "No Roll No provided"}
          </p>
          <p>
            <span className="font-semibold text-cyan-400">Phone: </span>
            {filteredUser.phone || "No phone number provided"}
          </p>
          <div>
            <span className="font-semibold text-cyan-400">Address:</span>
            <p className="mt-2 text-gray-300">
              {`House No: #${filteredUser.address?.houseno || "N/A"}, `}
              {`Street No: ${filteredUser.address?.streetno || "N/A"}, `}
              {`Area: ${filteredUser.address?.area || "N/A"}, `}
              {`City: ${filteredUser.address?.city || "N/A"}, `}
              {`State: ${filteredUser.address?.state || "N/A"}, `}
              {`Country: ${filteredUser.address?.country || "N/A"}, `}
              {`Pincode: ${filteredUser.address?.pincode || "N/A"}`}
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="bg-gray-700 text-cyan-400 font-semibold py-2 px-4 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
          >
            {showOptions ? "Hide Options" : "Settings"}
          </button>
        </div>

        {showOptions && (
          <div className="flex flex-wrap justify-between mt-4">
            <Link to="/updateuser">
              <button
                onClick={() => editUserHandle(filteredUser)}
                className="m-2 bg-cyan-500 text-gray-900 font-semibold py-2 px-4 rounded-lg hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              >
                Edit Profile
              </button>
            </Link>
            <button
              onClick={() => deleteUserData(filteredUser)}
              className="m-2 bg-red-500 text-gray-100 font-semibold py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
            >
              Delete Account
            </button>
          </div>
        )}
      </div>
    );
  };

  const Orders = () => {
    return (
      <div className="w-full bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-6 text-cyan-400">
          Search Student Results
        </h1>

        {/* Search Bar */}
        <div className="flex items-center space-x-4 mb-6">
          <input
            type="email"
            placeholder="Enter Email to Search"
            value={rollNo}
            onChange={handleSearch}
            className="flex-1 p-3 rounded-lg bg-gray-700 border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Results Table */}
        <div className="overflow-x-auto">
          {filteredResults.length > 0 ? (
            <table className="min-w-full table-auto text-gray-200">
              <thead>
                <tr className="bg-gray-700">
                  <th className="px-4 py-2">Sr. No.</th>
                  <th className="px-4 py-2">Roll No.</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Subject</th>
                  <th className="px-4 py-2">Grade</th>
                  <th className="px-4 py-2">Marks</th>
                  <th className="px-4 py-2">Position</th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.map((result, index) => (
                  <tr
                    key={index}
                    className="bg-gray-700 border-b border-gray-600"
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{result.rollNumber}</td>
                    <td className="px-4 py-2">{result.name}</td>
                    <td className="px-4 py-2">{result.email}</td>
                    <td className="px-4 py-2">{result.subject}</td>
                    <td className="px-4 py-2">{result.grade}</td>
                    <td className="px-4 py-2">{result.marks}</td>
                    <td className="px-4 py-2">{result.position}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex justify-center items-center min-h-40 bg-gray-900">
              <div className="bg-gray-800 p-8 rounded-lg shadow-xl text-center">
                <h1 className="text-3xl font-semibold text-gray-200 mb-4">
                  No Results Found
                </h1>
                <p className="text-lg text-gray-400">
                  No results match the entered criteria. Please try again.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-900 text-gray-100 p-6 lg:p-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-cyan-400">
              Profile Dashboard
            </h1>
            <p className="text-gray-400">Manage your personal details</p>
          </div>

          {/* Flex container with baseline alignment */}
          <div className="flex flex-col  gap-8 items-baseline">
            <div className="w-full ">
              <ProfileCard />
            </div>
            <div className="w-full ">
              <Orders />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;