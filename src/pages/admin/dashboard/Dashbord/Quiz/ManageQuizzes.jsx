import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fireDB } from "../../../../../fireabase/FirebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

const ManageQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  const fetchQuizzes = async () => {
    const quizCollection = collection(fireDB, "quizzes");
    const quizSnapshot = await getDocs(quizCollection);
    const quizList = quizSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setQuizzes(quizList);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      await deleteDoc(doc(fireDB, "quizzes", id));
      toast.success("Quiz deleted successfully");
      fetchQuizzes();
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Manage Quizzes</h2>
      {quizzes.length === 0 ? (
        <p className="text-gray-400">No quizzes found.</p>
      ) : (
        quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="border border-gray-700 bg-gray-800 rounded p-4 mb-4"
          >
            <h3 className="text-xl font-semibold text-white">{quiz.name}</h3>
            <p className="text-sm text-gray-400">Language: {quiz.language}</p>
            <p className="text-sm text-gray-400">Description: {quiz.description}</p>
            <div className="mt-4 space-x-2">
              <button
                onClick={() => navigate(`/ADMIN-EXAM/details/${quiz.id}`)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
              >
                Edit Quiz Details
              </button>
              <button
                onClick={() => navigate(`/ADMIN-EXAM/questions/${quiz.id}`)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Edit Questions
              </button>
              <button
                onClick={() => handleDelete(quiz.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Delete Quiz
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ManageQuizzes;