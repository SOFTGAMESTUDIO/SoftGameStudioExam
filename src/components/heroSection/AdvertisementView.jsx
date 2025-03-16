import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom"; // For navigating between pages
import Layout from "../layout/Layout";

const AdvertisementView = () => {
  const [ads, setAds] = useState([]);

  const db = getFirestore();
  const adsCollection = collection(db, "advertisements");

  // Fetch advertisements
  const fetchAds = async () => {
    const querySnapshot = await getDocs(adsCollection);
    let adsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Sort ads based on date (newest first)
    adsData.sort((a, b) => new Date(b.date) - new Date(a.date)); // Newest first

    setAds(adsData);
  };

  useEffect(() => {
    fetchAds();
  }, []); // Run once when the component is mounted

  return (
    <Layout>
<section className="bg-gray-900 text-gray-300 body-font py-12">
      <div className="container mx-auto">
        <h2 className="text-white text-3xl font-semibold mb-8 text-center">
          Advertisements
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ads.map((ad) => (
            <div
              key={ad.id}
              className="bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
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
            </div>
          ))}
        </div>
      </div>
    </section>
    </Layout>
    
  );
};

export default AdvertisementView;
