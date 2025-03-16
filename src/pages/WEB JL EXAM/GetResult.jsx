import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { fireDB } from "../../fireabase/FirebaseConfig";
import Layout from "../../components/layout/Layout";

const GetResult = () => {
  const [rollNo, setRollNo] = useState(""); // State to hold the search input
  const [allResults, setAllResults] = useState([]); // State to store all fetched results
  const [filteredResults, setFilteredResults] = useState([]); // State to store filtered results based on rollNo
  const [loading, setLoading] = useState(false); // State for the loading spinner

  // Fetch all results from Firestore
  const fetchAllResults = async () => {
    setLoading(true);
    try {
      const resultsRef = collection(fireDB, "results"); // Your Firestore collection name
      const querySnapshot = await getDocs(resultsRef);
      const resultsData = querySnapshot.docs.map((doc) => doc.data());
      setAllResults(resultsData);
      setFilteredResults(resultsData); // Initially show all results
    } catch (error) {
      console.error("Error fetching results:", error);
      alert("Failed to fetch results. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllResults(); // Fetch all results when the component mounts
  }, []);

  // Handle the search filter by roll number (auto-filter on input change)
  const handleSearch = (e) => {
    setRollNo(e.target.value); // Update rollNo state as user types
    if (!e.target.value.trim()) {
      setFilteredResults(allResults); // Show all results if no roll number is entered
    } else {
      const filteredData = allResults.filter((result) =>
        result.email.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredResults(filteredData); // Update with filtered results
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-200 p-6">
        <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold text-center mb-6">
            Search Student Results
          </h1>

          {/* Search Bar */}
          <div className="flex items-center space-x-4 mb-6">
            <input
              type="email"
              placeholder="Enter Email to Search"
              value={rollNo}
              onChange={handleSearch} // Update filtered results on input change
              className="flex-1 p-3 rounded-lg bg-gray-700 border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      </div>
    </Layout>
  );
};

export default GetResult;
