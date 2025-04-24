import React, { useState, useEffect, useContext } from "react";
import { fireDB } from "../../fireabase/FirebaseConfig";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import myContext from "../../context/data/myContext";
import Certificate from "../../components/Certificate/Certificate";
import Layout from "../../components/layout/Layout";

const QuizExam = () => {
  const { id: quizId } = useParams();

  const [date, setDate] = useState("");
  const [step, setStep] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isAlreadySubmitted, setIsAlreadySubmitted] = useState(false);
  const [isDisqualified, setIsDisqualified] = useState(false);
  const [filteredUser, setFilteredUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [quizData, setQuizData] = useState(null);

  const { user } = useContext(myContext);
  const userid = JSON.parse(localStorage.getItem("user"))?.user?.email;

  useEffect(() => {
    setDate(new Date().toLocaleDateString());
  }, []);

  useEffect(() => {
    // 1. Disable right-click
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);
  
    // 2. Disable copy/paste/cut
    const handleCopyCutPaste = (e) => e.preventDefault();
    document.addEventListener("copy", handleCopyCutPaste);
    document.addEventListener("cut", handleCopyCutPaste);
    document.addEventListener("paste", handleCopyCutPaste);
  
    // 3. Try to block PrintScreen (limited)
    const blockPrintScreen = (e) => {
      if (e.key === "PrintScreen") {
        navigator.clipboard.writeText("Screenshot is disabled.");
        alert("Screenshots are disabled on this page.");
      }
    };
    window.addEventListener("keyup", blockPrintScreen);
  
  
   
    document.addEventListener("visibilitychange", handleVisibilityChange);
  
    // Clean up on unmount
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("copy", handleCopyCutPaste);
      document.removeEventListener("cut", handleCopyCutPaste);
      document.removeEventListener("paste", handleCopyCutPaste);
      window.removeEventListener("keyup", blockPrintScreen);
    };
  }, [step, isAlreadySubmitted]);
  
  // 4. Auto submit if user switches tab or minimizes
  const handleDisqualification = async () => {
    if (!filteredUser?.uid || !quizData) return;
  
    try {
      await addDoc(collection(fireDB, "user_Quiz"), {
        quizId,
        uid: filteredUser.uid,
        email: filteredUser.email,
        name: filteredUser.name,
        rollNumber: filteredUser.rollNumber,
        language: quizData.language,
        timestamp: new Date(),
        disqualified: true,
        reason: "Cheating - switched tab",
      });
  
      toast.error("You were disqualified for switching tabs.");
      window.location.href = "/";
    } catch (error) {
      console.error("Error saving disqualification:", error);
      toast.error("Failed to save disqualification.");
    }
  };
  
  const handleVisibilityChange = () => {
    if (document.hidden && step === 1 && !isAlreadySubmitted) {
      handleDisqualification(); // Save to Firebase and redirect
    }
  };
  
  // 4. Auto submit if user switches tab or minimizes
  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
  
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [step, isAlreadySubmitted, filteredUser, quizData]);
  
  

  useEffect(() => {
    if (user && userid) {
      const matchedUser = user.find((obj) => obj.email === userid);
      if (matchedUser) setFilteredUser(matchedUser);
    }
  }, [user, userid]);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!quizId) {
        toast.error("Quiz ID not provided.");
        setLoading(false);
        return;
      }
      try {
        const docRef = doc(fireDB, "quizzes", quizId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setQuizData(docSnap.data());
        } else {
          toast.error("Quiz not found.");
        }
      } catch (error) {
        console.error("Error fetching quiz:", error);
        toast.error("Failed to load quiz.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [quizId]);

  useEffect(() => {
    const checkSubmission = async () => {
      if (!filteredUser?.uid || !quizData) return;
  
      try {
        const q = query(
          collection(fireDB, "user_Quiz"),
          where("uid", "==", filteredUser.uid),
          where("quizId", "==", quizId)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setIsAlreadySubmitted(true);
  
          const docData = querySnapshot.docs[0].data();
  
          if (docData?.disqualified) {
            setIsDisqualified(true);
            console.warn("User was disqualified. Reason:", docData?.reason);
          }
        }
      } catch (err) {
        console.error("Error checking submission:", err);
      }
    };
  
    checkSubmission();
  }, [filteredUser, quizData, quizId]);
  


  const handleRadioChange = (questionIndex, option) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: option }));
  };

  const handleNext = () => {
    if (!quizData) return;
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!filteredUser?.uid) {
      toast.error("User not authenticated.");
      return;
    }
    if (!quizData) {
      toast.error("Quiz data not loaded.");
      return;
    }

    try {
      await addDoc(collection(fireDB, "user_Quiz"), {
        mcqAnswers: selectedAnswers,
        quizId,
        language: quizData.language,
        uid: filteredUser.uid,
        email: filteredUser.email,
        name: filteredUser.name,
        rollNumber: filteredUser.rollNumber,
        timestamp: new Date(),
      });

      toast.success("Quiz submitted successfully!");
      setStep(2);
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit. Try again.");
    }
  };

  if (loading) {
    return (
      <Layout>
        <p className="text-center mt-10 text-white">Loading quiz...</p>
      </Layout>
    );
  }

  if (!quizData) {
    return (
      <Layout>
        <p className="text-center mt-10 text-red-500 ">Quiz data not available.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      {step === 0 && (
        <div className="flex flex-col items-center justify-center space-y-6 min-h-screen">
          <h1 className="text-3xl font-bold text-blue-500">{quizData.name} Quiz</h1>
          <p className="text-sm text-gray-400">
            Welcome, <span className="font-medium">{filteredUser?.name || "Loading..."}</span>
          </p>

          {isAlreadySubmitted ? (
  isDisqualified ? (
    <div className="text-red-500 font-semibold text-center">
      You have been <strong>disqualified</strong> from this exam.<br />
      Reason: <em>Cheating - switched tab</em>
    </div>
  ) : (
    <div className="text-center items-center flex flex-col">
      <div className="bg-green-900/20 border border-green-600 text-green-400 px-4 py-3 rounded-lg w-fit text-center text-md font-medium">
        You have already completed this exam.
      </div>
      <div className="overflow-scroll text-black"> 
        <Certificate
          name={filteredUser.name}
          rollNumber={filteredUser.rollNumber}
          examName={quizData.name}
          date={date}
          language={quizData.language}
        />
      </div>
    </div>
  )
) : (
  <button
    onClick={() => setStep(1)}
    className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-lg text-white font-semibold w-fit shadow-md"
  >
    Start Quiz
  </button>
)}
         
        </div>
      )}

      {step === 1 && (
        <div className="space-y-6 m-5 p-5">
          <div className="bg-[#1e293b] p-5 rounded-xl shadow-inner">
            <h2 className="text-lg font-semibold mb-3 text-blue-400">
              Q{currentQuestion + 1}. {quizData.questions[currentQuestion]?.question || "Question not available"}
            </h2>
             {/* Display Code only if available */}
             {quizData.questions[currentQuestion]?.code && (
  <div className="mt-6 max-w-3xl w-full bg-gray-800 p-4 rounded-lg text-white">
    <h2 className="text-xl font-semibold mb-4">Code for this Question:</h2>
    <pre className="overflow-x-auto whitespace-pre-wrap p-4 bg-gray-900 rounded-md font-mono text-sm">
      {quizData.questions[currentQuestion].code}
    </pre>
  </div>
)}

            <div className="space-y-3 min-h-[100px]">
              {quizData.questions[currentQuestion]?.options ? (
                Object.entries(quizData.questions[currentQuestion].options).map(([key, value]) => (
                  <label
                    key={key}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer border transition
                      ${selectedAnswers[currentQuestion] === key
                        ? "bg-blue-600 border-blue-400 text-white"
                        : "bg-[#0f172a] border-gray-700 text-gray-300 hover:bg-gray-800"
                      }`}
                  >
                    
                    <input
                      type="radio"
                      name={`question-${currentQuestion}`}
                      value={key}
                      checked={selectedAnswers[currentQuestion] === key}
                      onChange={() => handleRadioChange(currentQuestion, key)}
                      className="accent-blue-600 w-6 h-6 cursor-pointer"
                    />
                    <span className="select-none">{value}</span>
                  </label>
                ))
              ) : (
                <p className="text-gray-400 italic">No options available for this question.</p>
              )}
            </div>
          </div>

         

          <div className="flex justify-between pt-4">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="bg-gray-700 text-gray-300 px-5 py-2 rounded-md disabled:opacity-40"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md"
            >
              {currentQuestion === quizData.questions.length - 1 ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col items-center space-y-6 text-center mt-10">
          <h1 className="text-3xl font-bold text-green-500">Congratulations!</h1>
          <p className="text-md text-gray-400">You've successfully completed the quiz.</p>
          <div className="overflow-scroll text-black">
          <Certificate
              name={filteredUser.name}
              rollNumber={filteredUser.rollNumber}
              examName={quizData.name}
              date={date}
              language={quizData.language}
            />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default QuizExam;
