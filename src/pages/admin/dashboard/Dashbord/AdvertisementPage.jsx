import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Link } from "react-router-dom";

const AdvertisementPanel = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    ctaLink: "",
    ctaText: "",
    status: "",
    imageLink: "",  // Added field for image link
    date: new Date().toISOString(),
  });
  const [ads, setAds] = useState([]);
  const [editingAd, setEditingAd] = useState(null);

  const db = getFirestore();
  const adsCollection = collection(db, "advertisements");

  // Fetch advertisements
  const fetchAds = async () => {
    const querySnapshot = await getDocs(adsCollection);
    let adsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setAds(adsData);
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const adData = { ...formData, date: new Date().toISOString() };
    if (editingAd) {
      await updateDoc(doc(db, "advertisements", editingAd), adData);
      setEditingAd(null);
    } else {
      await addDoc(adsCollection, adData);
    }
    setFormData({
      title: "",
      category: "",
      content: "",
      ctaLink: "",
      ctaText: "",
      status: "",
      imageLink: "",  // Clear the image link
      date: new Date().toISOString(),
    });
    fetchAds();
  };

  const handleEdit = (ad) => {
    setFormData(ad);
    setEditingAd(ad.id);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "advertisements", id));
    fetchAds();
  };

  return (
    <section className="text-gray-300 body-font relative bg-gray-900 p-8">
      <div className="container mx-auto">
        <h2 className="text-white text-xl mb-4">Manage Notification</h2>

        <form
          onSubmit={handleSubmit}
          className="mb-6 bg-gray-800 p-6 rounded-lg shadow-md"
        >
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            required
            className="w-full p-2 mb-2 bg-gray-700 border border-gray-600 rounded"
          />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            required
            className="w-full p-2 mb-2 bg-gray-700 border border-gray-600 rounded"
          />
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Content"
            required
            className="w-full p-2 mb-2 bg-gray-700 border border-gray-600 rounded"
          ></textarea>
          <input
            type="text"
            name="ctaLink"
            value={formData.ctaLink}
            onChange={handleChange}
            placeholder="Action Link"
            required
            className="w-full p-2 mb-2 bg-gray-700 border border-gray-600 rounded"
          />
          <input
            type="text"
            name="ctaText"
            value={formData.ctaText}
            onChange={handleChange}
            placeholder="Action Text"
            required
            className="w-full p-2 mb-2 bg-gray-700 border border-gray-600 rounded"
          />
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
            placeholder="Status"
            required
            className="w-full p-2 mb-2 bg-gray-700 border border-gray-600 rounded"
          />
          <input
            type="text"
            name="imageLink"  // Image URL input field
            value={formData.imageLink}
            onChange={handleChange}
            placeholder="Image Link (Optional)"
            className="w-full p-2 mb-2 bg-gray-700 border border-gray-600 rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {editingAd ? "Update" : "Create"} Advertisement
          </button>
        </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {ads.map((ad) => (
                  <div
                    key={ad.id}
                    className="bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out flex flex-col justify-between"
                  >
                    <h4 className="text-white text-xl font-semibold">
                      {ad.title}{" "}
                      <span className="text-sm text-gray-400">({ad.category})</span>
                    </h4>
      
                    {/* Conditionally render the image if it exists */}
                    {ad.imageLink && (
                      <img
                        src={ad.imageLink}
                        alt={ad.title}  // Updated alt text to match the ad title
                        className="w-full h-64 object-contain mt-4 rounded-lg"  // Adjusted classes for better display
                      />
                    )}
      
                    <div
                      className="text-gray-300 mt-3 text-sm leading-relaxed border-white border-2 rounded-lg p-2"
                      dangerouslySetInnerHTML={{ __html: ad.content }}
                    ></div>
      
      <div>
      <div className="flex justify-between items-center">
                      <p className="mt-4">
                        <button
                          className="inline-block px-6 py-2 text-center text-white bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out"
                        >
                          <Link to={ad.ctaLink}>{ad.ctaText}</Link>
                        </button>
                      </p>
      
                      <p
                        className={
                          ad.status === "Active" ? "text-green-400" : "text-red-400"
                        }
                      >
                        {ad.status}
                      </p>
                    </div>
                    <p className="text-gray-500 text-sm mt-2">
                      Posted on: {new Date(ad.date).toLocaleString()}
                    </p>
                    <div className="flex justify-evenly m-4">
                <button
                  onClick={() => handleEdit(ad)}
                  className="text-yellow-400 hover:bg-yellow-500 hover:text-gray-800 transition rounded-md px-3 py-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(ad.id)}
                  className="text-red-400 hover:bg-red-500 hover:text-gray-800 transition rounded-md px-3 py-1"
                >
                  Delete
                </button>
              </div>
                  </div>
      </div>
                  
                  
                ))}
              </div>

       
      </div>
    </section>
  );
};

export default AdvertisementPanel;
