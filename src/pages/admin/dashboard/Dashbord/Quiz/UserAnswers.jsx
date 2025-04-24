import React, { useState, useEffect } from "react";
import { fireDB } from "../../../../../fireabase/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const UserAnswers = () => {
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizzesMap, setQuizzesMap] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch all quizzes to get correct answers
  const fetchQuizzes = async () => {
    const quizzesSnapshot = await getDocs(collection(fireDB, "quizzes"));
    const quizzesData = {};
    quizzesSnapshot.forEach((doc) => {
      quizzesData[doc.id] = doc.data();
    });
    return quizzesData;
  };

  // Fetch all user answers
  const fetchUserAnswers = async () => {
    try {
      const quizzesData = await fetchQuizzes();
      setQuizzesMap(quizzesData);

      const userAnswersSnapshot = await getDocs(collection(fireDB, "user_Quiz"));
      const answersData = [];
      userAnswersSnapshot.forEach((doc) => {
        answersData.push({ id: doc.id, ...doc.data() });
      });
      setUserAnswers(answersData);
    } catch (error) {
      console.error("Error fetching user answers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserAnswers();
  }, []);

  // Calculate correct answers for a given user
  const calculateCorrectCount = (userAnswer) => {
    const quiz = Object.values(quizzesMap).find(
      (q) => q.language === userAnswer.language
    );
    if (!quiz || !quiz.questions) return 0;

    let correctCount = 0;
    const mcqAnswers = userAnswer.mcqAnswers || {};

    quiz.questions.forEach((question, index) => {
      const userAnswerKey = mcqAnswers[index]; // index as string keys: "0", "1", ...
      const correctAnswerKey = question.correctAnswer;
      if (userAnswerKey === correctAnswerKey) {
        correctCount++;
      }
    });

    return correctCount;
  };

  if (loading) {
    return <p className="text-center mt-10">Loading user answers...</p>;
  }

  if (userAnswers.length === 0) {
    return <p className="text-center mt-10">No user answers found.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">User Answers and Scores</h2>
      {userAnswers.map((ua) => {
        const correctCount = calculateCorrectCount(ua);
        const quiz = Object.values(quizzesMap).find(
          (q) => q.language === ua.language
        );

        return (
          <div
          key={ua.id}
          className="border rounded p-4 bg-gray-900 shadow-md text-white"
        >
          <h3 className="font-semibold text-lg mb-2">
            User: {ua.name} ({ua.email})
          </h3>
          <p className="mb-2">Roll Number: {ua.rollNumber}</p>
          <p className="mb-2">Quiz Language: {ua.language}</p>
          <p className="mb-4">
            Score: {correctCount} / {quiz?.questions?.length || 0}
          </p>
        
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-gray-700">
              <thead className="bg-gray-800 text-gray-200">
                <tr>
                  <th className="border border-gray-700 px-2 py-1">Q#</th>
                  <th className="border border-gray-700 px-2 py-1">Question</th>
                  <th className="border border-gray-700 px-2 py-1">Your Answer</th>
                  <th className="border border-gray-700 px-2 py-1">Correct Answer</th>
                  <th className="border border-gray-700 px-2 py-1">Result</th>
                </tr>
              </thead>
              <tbody>
                {quiz?.questions?.map((question, index) => {
                  const userAnswerKey = ua.mcqAnswers?.[index];
                  const correctAnswerKey = question.correctAnswer;
        
                  const userAnswerText = userAnswerKey
                    ? question.options[userAnswerKey]
                    : "No Answer";
                  const correctAnswerText = question.options[correctAnswerKey];
                  const isCorrect = userAnswerKey === correctAnswerKey;
        
                  return (
                    <tr
                      key={index}
                      className={
                        isCorrect
                          ? "bg-green-800 text-white"
                          : "bg-red-800 text-white"
                      }
                    >
                      <td className="border border-gray-700 px-2 py-1 text-center">
                        {index + 1}
                      </td>
                      <td className="border border-gray-700 px-2 py-1">
                        {question.question}
                      </td>
                      <td className="border border-gray-700 px-2 py-1">
                        {userAnswerText}
                      </td>
                      <td className="border border-gray-700 px-2 py-1">
                        {correctAnswerText}
                      </td>
                      <td className="border border-gray-700 px-2 py-1 text-center">
                        {isCorrect ? "✔️" : "❌"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        
        );
      })}
    </div>
  );
};

export default UserAnswers;
