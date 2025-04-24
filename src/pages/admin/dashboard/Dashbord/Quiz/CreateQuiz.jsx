import React, { useState, useEffect } from "react";
import { fireDB } from "../../../../../fireabase/FirebaseConfig";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import Editor from "@monaco-editor/react"; // Import Monaco Editor

const initialQuestion = {
  question: "",
  code: "", // Added the code field
  options: { a: "", b: "", c: "", d: "" },
  correctAnswer: "a",
};

const AdminCreateQuiz = () => {
  const [step, setStep] = useState(0); // 0: quiz details, 1: questions
  const [quizId, setQuizId] = useState(null);
  const [quizDetails, setQuizDetails] = useState({
    name: "",
    language: "",
    imageUrl: "",
    description: "",
    examPage: "",
  });
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
  const [questionForm, setQuestionForm] = useState(initialQuestion);

  // Handle quiz details input change
  const handleQuizDetailsChange = (e) => {
    const { name, value } = e.target;
    setQuizDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Submit quiz details and create quiz doc in Firestore
  const handleQuizDetailsSubmit = async (e) => {
    e.preventDefault();
    const { name, language, imageUrl, description, examPage } = quizDetails;
    if (!name || !language || !imageUrl || !description ) {
      toast.error("Please fill all quiz details.");
      return;
    }
    try {
      const docRef = await addDoc(collection(fireDB, "quizzes"), {
        name,
        language,
        imageUrl,
        description,
        examPage,
        createdAt: new Date(),
      });
      setQuizId(docRef.id);
      setStep(1);
      toast.success("Quiz created. Now add questions.");
    } catch (error) {
      console.error("Error creating quiz:", error);
      toast.error("Failed to create quiz.");
    }
  };

  // Handle question form input change
  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    if (name === "question" || name === "correctAnswer" || name === "code") {
      setQuestionForm((prev) => ({ ...prev, [name]: value }));
    } else {
      setQuestionForm((prev) => ({
        ...prev,
        options: { ...prev.options, [name]: value },
      }));
    }
  };

  // Add or update question in questions array
  const handleAddOrUpdateQuestion = () => {
    const { question, options, correctAnswer, code } = questionForm;
    if (
      !question.trim() ||
      !options.a.trim() ||
      !options.b.trim() ||
      !options.c.trim() ||
      !options.d.trim() ||
      !["a", "b", "c", "d"].includes(correctAnswer)
    ) {
      toast.error("Please fill all question fields correctly.");
      return;
    }
    if (currentQuestionIndex === null) {
      // Add new question
      setQuestions((prev) => [...prev, { ...questionForm }]);
      toast.success("Question added.");
    } else {
      // Update existing question
      const updatedQuestions = [...questions];
      updatedQuestions[currentQuestionIndex] = { ...questionForm };
      setQuestions(updatedQuestions);
      toast.success("Question updated.");
    }
    setQuestionForm(initialQuestion);
    setCurrentQuestionIndex(null);
  };

  // Edit question
  const handleEditQuestion = (index) => {
    setCurrentQuestionIndex(index);
    setQuestionForm(questions[index]);
  };

  // Delete question
  const handleDeleteQuestion = (index) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      const updatedQuestions = questions.filter((_, i) => i !== index);
      setQuestions(updatedQuestions);
      if (currentQuestionIndex === index) {
        setQuestionForm(initialQuestion);
        setCurrentQuestionIndex(null);
      }
      toast.success("Question deleted.");
    }
  };

  // Save all questions to Firestore under quiz document
  const handleSaveQuestions = async () => {
    if (!quizId) {
      toast.error("Quiz not created yet.");
      return;
    }
    if (questions.length === 0) {
      toast.error("Add at least one question.");
      return;
    }
    try {
      const quizDocRef = doc(fireDB, "quizzes", quizId);
      await updateDoc(quizDocRef, {
        questions,
      });
      toast.success("Questions saved successfully.");
      // Optionally reset form or navigate away
    } catch (error) {
      console.error("Error saving questions:", error);
      toast.error("Failed to save questions.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-md">
      {step === 0 && (
        <form onSubmit={handleQuizDetailsSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold mb-4 text-white">Create Quiz Exam</h2>
      
          <div>
            <label className="block font-semibold text-gray-300">Name of Quiz Exam</label>
            <input
              type="text"
              name="name"
              value={quizDetails.name}
              onChange={handleQuizDetailsChange}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded px-3 py-2"
              required
            />
          </div>
      
          <div>
            <label className="block font-semibold text-gray-300">Language of Exam</label>
            <input
              type="text"
              name="language"
              value={quizDetails.language}
              onChange={handleQuizDetailsChange}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded px-3 py-2"
              required
            />
          </div>
      
          <div>
            <label className="block font-semibold text-gray-300">Image URL of Exam</label>
            <input
              type="text"
              name="imageUrl"
              value={quizDetails.imageUrl}
              onChange={handleQuizDetailsChange}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded px-3 py-2"
              required
            />
          </div>
      
          <div>
            <label className="block font-semibold text-gray-300">Description of Exam</label>
            <textarea
              name="description"
              value={quizDetails.description}
              onChange={handleQuizDetailsChange}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded px-3 py-2"
              rows={3}
              required
            />
          </div>
      
          <div>
            <label className="block font-semibold text-gray-300">Exam Date and Time</label>
            <input
              type="datetime-local"
              name="examPage"
              value={quizDetails.examPage}
              onChange={handleQuizDetailsChange}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded px-3 py-2"
            />
          </div>
      
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Next: Add Questions
          </button>
        </form>   
      )}

      {step === 1 && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">Add Questions</h2>

          <div className="space-y-3 mb-4 border border-gray-700 p-4 rounded bg-gray-800">
            <div>
              <label className="block font-semibold text-gray-300">Question</label>
              <input
                type="text"
                name="question"
                value={questionForm.question}
                onChange={handleQuestionChange}
                className="w-full bg-gray-900 text-white border border-gray-700 rounded px-3 py-2"
              />
            </div>

            <div>
  <label className="block font-semibold text-gray-300">Code (optional)</label>
    <Editor
      height="200px"
      language="javascript"  // Change language based on your needs
      value={questionForm.code}
      onChange={(value) => handleQuestionChange({ target: { name: 'code', value } })}
      theme="vs-dark"
    />
</div>

            <div className="grid grid-cols-2 gap-4 mt-2">
              {["a", "b", "c", "d"].map((opt) => (
                <div key={opt}>
                  <label className="block font-semibold text-gray-300">Option {opt.toUpperCase()}</label>
                  <input
                    type="text"
                    name={opt}
                    value={questionForm.options[opt]}
                    onChange={handleQuestionChange}
                    className="w-full bg-gray-900 text-white border border-gray-700 rounded px-3 py-2"
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="block font-semibold text-gray-300">Correct Answer</label>
              <select
                name="correctAnswer"
                value={questionForm.correctAnswer}
                onChange={handleQuestionChange}
                className="w-full bg-gray-900 text-white border border-gray-700 rounded px-3 py-2"
              >
                <option value="a">A</option>
                <option value="b">B</option>
                <option value="c">C</option>
                <option value="d">D</option>
              </select>
            </div>

            <div>
              <button
                type="button"
                onClick={handleAddOrUpdateQuestion}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                {currentQuestionIndex === null ? "Add Question" : "Update Question"}
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {questions.map((q, index) => (
              <div key={index} className="border border-gray-700 p-4 rounded bg-gray-800">
                <p className="font-semibold text-white">Q{index + 1}: {q.question}</p>
                {q.code && (
                  <pre className="text-sm text-green-400 bg-gray-900 p-2 rounded mt-1 whitespace-pre-wrap">
                    {q.code}
                  </pre>
                )}
                <p className="text-sm text-gray-300 mt-1">
                  A: {q.options.a} | B: {q.options.b} | C: {q.options.c} | D: {q.options.d} | Correct: {q.correctAnswer.toUpperCase()}
                </p>
                <button
                  onClick={() => handleEditQuestion(index)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteQuestion(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={handleSaveQuestions}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 mt-6"
          >
            Save Questions
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminCreateQuiz;
