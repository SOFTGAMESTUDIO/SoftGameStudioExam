import React, { useEffect, useState, useContext } from "react";
import { collection, getDocs } from "firebase/firestore";
import { fireDB } from "../../fireabase/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import myContext from "../../context/data/myContext";
import Layout from "../layout/Layout";
import { motion } from "framer-motion";

const Collection = () => {
  const [books, setBooks] = useState([]);
  const [bookLoading, setBookLoading] = useState(true);

  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timers, setTimers] = useState({});
  const navigate = useNavigate();
  const context = useContext(myContext);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const snap = await getDocs(collection(fireDB, "quizzes"));
        const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setBooks(data);
      } catch (e) {
        console.error("Books error:", e);
      } finally {
        setBookLoading(false);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const querySnapshot = await getDocs(collection(fireDB, "quizzes"));
        const quizzesData = [];
        querySnapshot.forEach((doc) => {
          quizzesData.push({ id: doc.id, ...doc.data() });
        });
        setQuizzes(quizzesData);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTimers = {};
      quizzes.forEach((quiz) => {
        const examTime = new Date(quiz.examPage).getTime();
        const now = new Date().getTime();
        const diff = examTime - now;

        if (diff <= 0) {
          updatedTimers[quiz.id] = "STARTED";
        } else {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          updatedTimers[quiz.id] = `${days}d ${hours}h ${minutes}m ${seconds}s remaining`;
        }
      });
      setTimers(updatedTimers);
    }, 1000);

    return () => clearInterval(interval);
  }, [quizzes]);

  const handleOpenQuiz = (quiz) => {
    navigate(`/quiz/${quiz.id}`);
  };

  const handleDetailsQuiz = (quiz) => {
    navigate(`/examinfo/${quiz.id}`);
  };

  return (
    <div className="bg-gray-950 min-h-screen">
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-center text-white col-span-full">Loading exams...</p>
        ) : quizzes.length === 0 ? (
          <Layout>
            <p className="text-center mt-10 text-white h-screen justify-center items-center flex">
              No exams found.
            </p>
          </Layout>
        ) : (
          quizzes.map((quiz, index) => (
            <motion.div
              key={quiz.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <div className="flex justify-center">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  src={quiz.imageUrl}
                  alt={quiz.name}
                  className="h-60 object-contain object-center mb-6 rounded-xl"
                />
              </div>
              <h2 className="text-xs text-cyan-400 mb-2">Quiz</h2>
              <h1 className="text-lg font-semibold text-white mb-4">{quiz.name}</h1>
              <p className="text-xs text-gray-300 mb-4">Language: {quiz.language}</p>
              <div className="text-center mb-4 text-white text-sm">
                {timers[quiz.id] === "STARTED" ? (
                  <button
                    onClick={() => handleOpenQuiz(quiz)}
                    className="w-full bg-gradient-to-br from-purple-600 to-blue-500 text-white rounded-lg text-sm px-5 py-2.5"
                  >
                    Start Quiz
                  </button>
                ) : (
                  <button className="w-full bg-gradient-to-br from-purple-600 to-blue-500 text-white rounded-lg text-sm px-5 py-2.5">
                    {timers[quiz.id] || "Loading timer..."}
                  </button>
                )}
              </div>
              <div className="text-center">
                <button
                  onClick={() => handleDetailsQuiz(quiz)}
                  className="w-full bg-gradient-to-br from-pink-600 to-indigo-500 text-white rounded-lg text-sm px-5 py-2.5"
                >
                  Details
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default Collection;
