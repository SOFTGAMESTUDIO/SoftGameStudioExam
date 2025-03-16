import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { fireDB } from "../../../../fireabase/FirebaseConfig";

const AdminFetchUserWeb = () => {
  const [loading, setLoading] = useState(true);
  const [userWebData, setUserWebData] = useState([]);
  const [previewCode, setPreviewCode] = useState(""); // For displaying the output in an iframe
  const [mode, setMode] = useState("light"); // Assuming "light" mode initially
  const [emailFilter, setEmailFilter] = useState(""); // Email filter state

  // Fetch data from Firebase
  useEffect(() => {
    const fetchUserWebData = async () => {
      try {
        const querySnapshot = await getDocs(collection(fireDB, "user_web"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserWebData(data);
      } catch (error) {
        console.error("Error fetching user web data: ", error);
        alert("Failed to fetch user web data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserWebData();
  }, []);

  // Filter data by email
  const filteredUserWebData = userWebData.filter((data) =>
    data.email.toLowerCase().includes(emailFilter.toLowerCase())
  );

  // Handle Preview
  const handlePreview = (html, css, js) => {
    const completeCode = `
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>${js}</script>
        </body>
      </html>
    `;
    setPreviewCode(completeCode);
  };

  // Loading state rendering
  if (loading) {
    return (
      <h2 className="text-white text-center text-2xl w-full h-screen">
        Loading...
      </h2>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-900 text-white p-6 ${mode}`}>
      <h1 className="text-4xl font-bold text-center mb-8">User Web Data</h1>

      {/* Email filter input */}
      <div className="mb-6 text-center">
        <input
          type="text"
          placeholder="Filter by email"
          value={emailFilter}
          onChange={(e) => setEmailFilter(e.target.value)} // Update filter value
          className="px-4 py-2 text-lg bg-gray-800 border border-gray-700 rounded-md"
        />
      </div>

      {filteredUserWebData.length > 0 ? (
        <div className="space-y-6">
          {filteredUserWebData.map((data) => (
            <div
              key={data.id}
              className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4"
            >
              <h2 className="text-2xl font-semibold">User ID: {data.uid}</h2>
              <p>
                <strong>Email:</strong> {data.email}
              </p>
              <p>
                <strong>Roll no.:</strong> {data.rollno || "N/A"}
              </p>
              <p>
                <strong>Timestamp:</strong>{" "}
                {new Date(data.timestamp?.seconds * 1000).toLocaleString()}
              </p>
              <div>
                <h3 className="text-xl font-bold">HTML:</h3>
                <pre className="bg-gray-700 p-4 rounded-md text-sm overflow-auto">
                  {data.html || "No HTML code available."}
                </pre>
              </div>
              <div>
                <h3 className="text-xl font-bold">CSS:</h3>
                <pre className="bg-gray-700 p-4 rounded-md text-sm overflow-auto">
                  {data.css || "No CSS code available."}
                </pre>
              </div>
              <div>
                <h3 className="text-xl font-bold">JavaScript:</h3>
                <pre className="bg-gray-700 p-4 rounded-md text-sm overflow-auto">
                  {data.js || "No JavaScript code available."}
                </pre>
              </div>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => handlePreview(data.html, data.css, data.js)}
              >
                Show Output
              </button>
              {/* Output Preview */}
              {previewCode && (
                <div className="bg-gray-800 p-4 mt-8 rounded-md shadow-lg">
                  <h2 className="text-2xl font-bold text-center mb-4">
                    Output Preview
                  </h2>
                  <iframe
                    title="User Output"
                    srcDoc={previewCode}
                    className="w-full h-96 border-none"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg">No user web data available.</p>
      )}
    </div>
  );
};

export default AdminFetchUserWeb;
