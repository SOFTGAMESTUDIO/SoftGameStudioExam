import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { fireDB } from "../../../../../fireabase/FirebaseConfig";
import { toast } from "react-toastify";

const EditQuizDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quizDetails, setQuizDetails] = useState({
    name: "",
    language: "",
    imageUrl: "",
    description: "",
    examPage: "", // Added field for exam date and time
  });

  useEffect(() => {
    const fetchQuiz = async () => {
      const quizRef = doc(fireDB, "quizzes", id);
      const quizSnap = await getDoc(quizRef);
      if (quizSnap.exists()) {
        const data = quizSnap.data();
        setQuizDetails({
          name: data.name || "",
          language: data.language || "",
          imageUrl: data.imageUrl || "",
          description: data.description || "",
          examPage: data.examPage || "", // Set the examPage from Firestore data
        });
      } else {
        toast.error("Quiz not found");
        navigate("/admin/manage");
      }
    };
    fetchQuiz();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuizDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(fireDB, "quizzes", id), quizDetails);
      toast.success("Quiz details updated");
      navigate("/ADMIN-EXAM/");
    } catch (error) {
      toast.error("Failed to update quiz");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Quiz Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-400 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={quizDetails.name}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
            placeholder="Quiz name"
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-1">Language</label>
          <input
            type="text"
            name="language"
            value={quizDetails.language}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
            placeholder="Language"
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-1">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={quizDetails.imageUrl}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
            placeholder="Image URL"
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-1">Description</label>
          <textarea
            name="description"
            value={quizDetails.description}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
            placeholder="Description"
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-1">Exam Date and Time</label>
          <input
            type="datetime-local"
            name="examPage"
            value={quizDetails.examPage}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
          />
        </div>
        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditQuizDetails;
