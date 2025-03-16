import React, { useState, useEffect } from "react";
import {fireDB} from "../../../../fireabase/FirebaseConfig"
import { collection, getDocs } from "firebase/firestore";


const FetchAnswers = () => {
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emailFilter, setEmailFilter] = useState(""); // State to store email input

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const querySnapshot = await getDocs(collection(fireDB, "user_answers"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAnswers(data);
      } catch (error) {
        console.error("Error fetching answers:", error);
        alert("Failed to fetch answers. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnswers();
  }, []);

  const filteredAnswers = answers.filter((answer) =>
    answer.email.toLowerCase().includes(emailFilter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Submitted Answers</h1>

      {/* Input for email filtering */}
      <div className="mb-6 text-center">
        <input
          type="text"
          placeholder="Filter by email"
          value={emailFilter}
          onChange={(e) => setEmailFilter(e.target.value)} // Update filter value
          className="px-4 py-2 text-lg bg-gray-800 border border-gray-700 rounded-md"
        />
      </div>

      {loading ? (
        <div className="text-center text-lg font-medium">Loading...</div>
      ) : filteredAnswers.length === 0 ? (
        <div className="text-center text-lg font-medium">
          No answers found for the given email.
        </div>
      ) : (
        <div className="space-y-8">
          {filteredAnswers.map((answer, index) => (
            <div
              key={answer.id}
              className="bg-gray-800 p-6 rounded-md shadow-md"
            >
              <h2 className="text-xl font-bold mb-4">
                Submission #{index + 1}
              </h2>
              <p>
                <strong>Language :</strong> {answer.language || "N/A"}
              </p>
              <p>
                <strong>User ID:</strong> {answer.uid || "N/A"}
              </p>
              <p>
                <strong>Email:</strong> {answer.email || "N/A"}
              </p>
              <p>
                <strong>Submitted At:</strong>{" "}
                {answer.timestamp
                  ? new Date(answer.timestamp.seconds * 1000).toLocaleString()
                  : "N/A"}
              </p>

              {/* MCQ Answers */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">MCQ Answers:</h3>
                {Object.keys(answer.mcqAnswers || {}).length > 0 ? (
                  <ul className="list-disc ml-5">
                    {Object.entries(answer.mcqAnswers).map(([key, value]) => (
                      <li key={key}>
                        <strong>Question {key}:</strong> {value}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No MCQ answers provided.</p>
                )}
              </div>

              {/* Programming Answers */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">
                  Programming Answers:
                </h3>
                {Object.keys(answer.programAnswers || {}).length > 0 ? (
                  Object.entries(answer.programAnswers).map(([key, value]) => (
                    <div key={key} className="mb-4">
                      <p>
                        <strong>Question {key}:</strong>
                      </p>
                      <pre className="bg-gray-700 text-white p-4 rounded-md overflow-auto">
                        {value}
                      </pre>
                    </div>
                  ))
                ) : (
                  <p>No programming answers provided.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FetchAnswers;
