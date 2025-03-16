import React, { useContext, useState, useEffect } from "react";
import myContext from "../../context/data/myContext";
import Layout from "../../components/layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const ProfileDashbord = () => {
  const navigate = useNavigate();
  const userid = JSON.parse(localStorage.getItem("user"))?.user?.email;
  const { user, editUserHandle, deleteUserData } = useContext(myContext);
  const [filteredUser, setFilteredUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [ads, setAds] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedSection, setSelectedSection] = useState("User Details");

  const db = getFirestore();
  const adsCollection = collection(db, "advertisements");
  const EventCollection = collection(db, "Event");

  useEffect(() => {
    if (user && userid) {
      const matchedUser = user.find((obj) => obj.email === userid);
      setFilteredUser(matchedUser || {});
    }
    setLoading(false);
  }, [user, userid]);

  useEffect(() => {
    const fetchAds = async () => {
      const querySnapshot = await getDocs(adsCollection);
      let adsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      adsData.sort((a, b) => new Date(b.date) - new Date(a.date));
      setAds(adsData);
    };

    const fetchEvents = async () => {
      const querySnapshot = await getDocs(EventCollection);
      let eventsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      eventsData.sort((a, b) => new Date(b.date) - new Date(a.date));
      setEvents(eventsData);
    };

    fetchAds();
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <h2 className="text-2xl text-cyan-400 animate-pulse">Loading...</h2>
      </div>
    );
  }

  if (!filteredUser || !filteredUser.email) {
    navigate("/login");
    return null;
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-row">
        <div className=" w-1/5 bg-gray-800 p-4 md:p-6 space-y-4">
          {[
            "User Details", "Notifications", "Orders", "Events", "Help & Support"
          ].map((section) => (
            <button
              key={section}
              className={`w-full text-left p-3 rounded-lg transition-all ${selectedSection === section ? "bg-cyan-500 text-black font-bold" : "hover:bg-cyan-400 hover:text-black border-2 border-cyan-400"}`}
              onClick={() => setSelectedSection(section)}
            >
              {section}
            </button>
          ))}
        </div>
        <div className="w-4/5 p-4 md:p-6">
          {selectedSection === "User Details" && (
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">Profile Information</h2>
              <p><span className="font-semibold text-cyan-400">Name:</span> {filteredUser.name || "Unknown User"}</p>
              <p><span className="font-semibold text-cyan-400">Email:</span> {filteredUser.email || "No email provided"}</p>
              <button onClick={() => editUserHandle(filteredUser)} className="mt-4 bg-cyan-500 text-black font-semibold py-2 px-4 rounded-lg">Edit Profile</button>
              <button onClick={() => deleteUserData(filteredUser)} className="mt-4 bg-red-500 text-white font-semibold py-2 px-4 rounded-lg">Delete Account</button>
            </div>
          )}
          {selectedSection === "Notifications" && (
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold text-cyan-400 mb-4">Notifications</h2>
              {ads.map((ad) => (
                <p key={ad.id} className="text-gray-300">{ad.title}</p>
              ))}
            </div>
          )}
          {selectedSection === "Orders" && (
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold text-cyan-400 mb-4">Orders</h2>
              <Link to="/order" className="text-cyan-400 hover:underline">Go To Order Section</Link>
            </div>
          )}
          {selectedSection === "Events" && (
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold text-cyan-400 mb-4">Events & Seminars</h2>
              {events.map((event) => (
                <p key={event.id} className="text-gray-300">{event.title}</p>
              ))}
            </div>
          )}
          {selectedSection === "Help & Support" && (
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold text-cyan-400 mb-4">Help & Support</h2>
              <Link to="/ContactUs" className="text-cyan-400 hover:underline">Contact Us</Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProfileDashbord;
