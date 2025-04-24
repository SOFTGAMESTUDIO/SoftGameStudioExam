import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fireDB } from "../../fireabase/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Layout from "../../components/layout/Layout";

const ExamDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const docRef = doc(fireDB, "quizzes", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const examData = docSnap.data();
          setExam({
            ...examData,
            id: docSnap.id
          });
        } else {
          setExam(null);
        }
      } catch (error) {
        console.error("Error fetching exam details:", error);
        setExam(null);
      } finally {
        setLoading(false);
      }
    };

    fetchExam();
  }, [id]);

  // Countdown timer effect
  useEffect(() => {
    if (!exam?.examPage) return;

    const interval = setInterval(() => {
      const examTime = new Date(exam.examPage).getTime();
      const now = new Date().getTime();
      const diff = examTime - now;

      if (diff <= 0) {
        setTimeLeft("STARTED");
        clearInterval(interval);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s remaining`);
      }
      
    }, 1000);

    return () => clearInterval(interval);
  }, [exam]);

  const handleOpenQuiz = (examId) => {
    navigate(`/quiz/${examId}`);
  };

  if (loading) {
    return (
      <Layout>
        <p className="text-center mt-10 text-white">Loading exam details...</p>
      </Layout>
    );
  }

  if (!exam) {
    return (
      <Layout>
        <p className="text-center mt-10 text-red-500">Exam not found.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col md:flex-row bg-[#0f172a] text-white min-h-screen p-8 items-center justify-center">
        {/* Image */}
        <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
          <img
            src={exam.imageUrl}
            alt={exam.name}
            className="w-full max-w-sm object-contain rounded-lg shadow-xl"
          />
        </div>

        {/* Details */}
        <div className="w-full md:w-1/2 max-w-xl flex flex-col space-y-4">
          <p className="text-sm tracking-widest text-gray-400 uppercase">Exam Info</p>
          <h1 className="text-3xl font-bold text-white">{exam.name}</h1>

          <div
            className="text-base text-gray-300"
            dangerouslySetInnerHTML={{ __html: exam.description }}
          />

          <p className="text-sm text-gray-400">
            <span className="font-semibold text-white">Language:</span> {exam.language}
          </p>

          {/* Countdown or Start Button */}
          <div className="border-t border-gray-600 pt-4 flex justify-between items-center">
            {timeLeft === "STARTED" ? (
              <button
                onClick={() => handleOpenQuiz(exam.id)}
                className="bg-indigo-500 text-white px-6 py-2 rounded hover:bg-indigo-600 transition-all"
              >
                Start Quiz
              </button>
            ) : (
              <button
              onClick={() => handleOpenQuiz(exam.id)}
              className="bg-indigo-500 text-white px-6 py-2 rounded hover:bg-indigo-600 transition-all"
            >
              {timeLeft || "Loading timer..."}
            </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ExamDetails;
