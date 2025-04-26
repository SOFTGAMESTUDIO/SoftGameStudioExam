import React, { useState, useEffect } from "react";
import { fireDB } from "../../../../../fireabase/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const UserAnswers = () => {
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserAnswers = async () => {
    try {
      const snapshot = await getDocs(collection(fireDB, "user_Quiz"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUserAnswers(data);
    } catch (error) {
      console.error("Error fetching user answers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserAnswers();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading user submissions...</p>;
  }

  if (userAnswers.length === 0) {
    return <p className="text-center mt-10">No user submissions found.</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-white">User Quiz Submissions</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-700 text-white">
          <thead className="bg-gray-800 text-gray-200">
            <tr>
              <th className="border border-gray-700 px-3 py-2">#</th>
              <th className="border border-gray-700 px-3 py-2">Name</th>
              <th className="border border-gray-700 px-3 py-2">Email</th>
              <th className="border border-gray-700 px-3 py-2">Roll Number</th>
              <th className="border border-gray-700 px-3 py-2">Language</th>
              <th className="border border-gray-700 px-3 py-2">Score</th>
              <th className="border border-gray-700 px-3 py-2">Cheating</th>
              <th className="border border-gray-700 px-3 py-2">Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {userAnswers.map((ua, index) => (
              <tr key={ua.id} className="hover:bg-gray-800">
                <td className="border border-gray-700 px-3 py-2 text-center">{index + 1}</td>
                <td className="border border-gray-700 px-3 py-2">{ua.name}</td>
                <td className="border border-gray-700 px-3 py-2">{ua.email}</td>
                <td className="border border-gray-700 px-3 py-2">{ua.rollNumber}</td>
                <td className="border border-gray-700 px-3 py-2">{ua.language}</td>
                <td className="border border-gray-700 px-3 py-2 text-center">{ua.score || 0}</td>
                <td className={`border border-gray-700 px-3 py-2 text-center font-semibold ${
                  ua.disqualified ? "text-red-500" : "text-green-400"
                }`}>
                  {ua.disqualified ? `${ua.reason}`  : "No"}
                </td>
                <td className="border border-gray-700 px-3 py-2 text-sm">
                  {ua.timestamp
                    ? new Date(ua.timestamp.seconds * 1000).toLocaleString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserAnswers;
