import React, { useState } from "react";
import { fireDB } from "../../fireabase/FirebaseConfig"; // Ensure correct path and export
import { collection, addDoc } from "firebase/firestore";
import Layout from "../../components/layout/Layout";
import Editor from "@monaco-editor/react"; // Import the Monaco Editor
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast from react-toastify

const PythonExam = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const user = JSON.parse(localStorage.getItem("user")) || null;

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [programAnswers, setProgramAnswers] = useState({});
  const [language] = useState("Python");

  const mcqQuestions = [
    {
      id: 1,
      question: "What will be the output of the following code?",
      code: "list1 = [1, 2, 3]\nlist2 = list1\nlist2.append(4)\nprint(list1)",
      options: ["[1, 2, 3]", "[1, 2, 3, 4]", "Error", "[1, 2, 3, 4, 5]"],
    },
    {
      id: 2,
      question: "Which of the following data structures has a LIFO property?",
      options: ["Queue", "Stack", "Linked List", "Heap"],
    },
    {
      id: 3,
      question: "What will be the output of the following code?",
      code: "a = (1, 2, 3)\nb = a\na += (4,)\nprint(b)",
      options: ["(1, 2, 3)", "(1, 2, 3, 4)", "Error", "(4,)"],
    },
    {
      id: 4,
      question:
        "Which sorting algorithm has the best average-case time complexity?",
      options: [
        "Bubble Sort",
        "Merge Sort",
        "Selection Sort",
        "Insertion Sort",
      ],
    },
    {
      id: 5,
      question: "What will be the output of the following Python code?",
      code: "def func(x, lst=[]):\n    lst.append(x)\n    return lst\n\nprint(func(1))\nprint(func(2))\nprint(func(3))",
      options: [
        "[1], [2], [3]",
        "[1], [1, 2], [1, 2, 3]",
        "Error",
        "[1, 2, 3]",
      ],
    },
    {
      id: 6,
      question: "Which of the following data structures uses a FIFO approach?",
      options: ["Queue", "Stack", "Heap", "Tree"],
    },
    {
      id: 7,
      question: "Which of the following Python data structures is mutable?",
      options: ["Tuple", "String", "List", "Set"],
    },
    {
      id: 8,
      question: "What will be the output of the following code?",
      code: "x = [[1, 2], [3, 4]]\ny = x[:]\ny[0][0] = 9\nprint(x)",
      options: [
        "[[1, 2], [3, 4]]",
        "[[9, 2], [3, 4]]",
        "Error",
        "[[1, 2], [9, 4]]",
      ],
    },
    {
      id: 9,
      question: "Which data structure is used for implementing recursion?",
      options: ["Queue", "Stack", "Array", "Graph"],
    },
    {
      id: 10,
      question: "What will be the output of the following code?",
      code: "nums = [1, 2, 3, 4, 5]\nprint(nums[::-1])",
      options: [
        "[1, 2, 3, 4, 5]",
        "[5, 4, 3, 2, 1]",
        "Error",
        "[2, 3, 4, 5, 1]",
      ],
    },
    {
      id: 11,
      question:
        "Which of the following data structures allows duplicate values?",
      options: ["Set", "Dictionary", "List", "Heap"],
    },
    {
      id: 12,
      question: "What will be the output of the following Python snippet?",
      code: "print(bool('False'))",
      options: ["True", "False", "Error", "None"],
    },
    {
      id: 13,
      question: "Which of the following is NOT a built-in Python function?",
      options: ["map()", "reduce()", "filter()", "combine()"],
    },
    {
      id: 14,
      question: "Which of the following is a stable sorting algorithm?",
      options: ["Merge Sort", "Quick Sort", "Heap Sort", "Selection Sort"],
    },
    {
      id: 15,
      question: "What will be the output of the following code?",
      code: "a = [1, 2, 3]\nb = a[:]\nb[0] = 10\nprint(a)",
      options: ["[1, 2, 3]", "[10, 2, 3]", "Error", "[1, 2]"],
    },
    {
      id: 16,
      question: "Which Python keyword is used to define a generator function?",
      options: ["yield", "return", "lambda", "async"],
    },
    {
      id: 17,
      question:
        "Which of the following operations is the fastest in a dictionary?",
      options: ["Insertion", "Deletion", "Lookup", "Traversal"],
    },
    {
      id: 18,
      question: "What will be the output of the following code?",
      code: "x = {1, 2, 3}\ny = {2, 3, 4}\nprint(x & y)",
      options: ["{1, 2, 3, 4}", "{2, 3}", "Error", "{}"],
    },
    {
      id: 19,
      question:
        "Which of the following data structures is best suited for searching?",
      options: ["Binary Search Tree", "Queue", "Stack", "Linked List"],
    },
    {
      id: 20,
      question: "What will be the output of the following code?",
      code: "s = 'python'\nprint(s[:3] + s[3:])",
      options: ["'python'", "'py'", "'thon'", "'error'"],
    },
  ];

  const programmingQuestions = [
    {
      id: 1,
      question: `Python: 
Bug: The loop should run n times, but due to an incorrect range, it runs one extra time.
`,
      starterCode: `def sum_numbers(n):
    total = 0
    for i in range(1, n + 1): 
        total += i
    return total

num = int(input(\"Enter a number: \"))
print(\"Sum is:\", sum_numbers(num))`,
    },
    {
      id: 2,
      question: `Python: Bug: The loop should run until n, but <= makes it run one extra time.`,
      starterCode: `def sum_n_numbers(n):
    total = 0
    i = 1
    while i <= n:  
        total += i
        i += 1
    return total

num = int(input(\"Enter a number: \"))
print(\"Sum is:\", sum_n_numbers(num))`,
    },
    {
      id: 3,
      question: `Python: Bug: The total variable is initialized
`,
      starterCode: `def sum_list(numbers):
    total = 1  
    for num in numbers:
        total += num
    return total

nums = [3, 5, 7, 9]
print(\"Sum is:\", sum_list(nums))`,
    },
    {
      id: 4,
      question: `Python: Bug: The function does not return the sum, causing None to be printed.`,
      starterCode: `def sum_even_numbers(n):
    total = 0
    for i in range(2, n + 1, 2):
        total += i

num = int(input(\"Enter a number: \"))
print(\"Sum of even numbers:\", sum_even_numbers(num))`,
    },
    {
      id: 5,
      question: `Python: Bug: The function is supposed to sum only even numbers, but the condition is incorrect.`,
      starterCode: `def sum_even_numbers(n):
    total = 0
    for i in range(1, n + 1):
        if i % 2 == 1:  
            total += i
    return total

num = int(input(\"Enter a number: \"))
print(\"Sum of even numbers:\", sum_even_numbers(num))`,
    },
    {
      id: 6,
      question: `Python: Bug: The formula for the sum of the first n natural numbers is incorrect.`,
      starterCode: `def sum_natural_numbers(n):
    return (n * (n + 1)) / 2  

num = int(input(\"Enter a number: \"))
print(\"Sum of first\", num, \"natural numbers is:\", sum_natural_numbers(num))`,
    },
  ];

  const handleRadioChange = (questionId, option) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleProgramChange = (questionId, value) => {
    setProgramAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const saveAnswersToFirebase = async () => {
    if (!user) {
      alert("User is not authenticated!");
      return;
    }
    try {
      const { uid, email } = user.user || {};
      if (!uid || !email) {
        alert("Incomplete user information!");
        return;
      }
      await addDoc(collection(fireDB, "user_answers"), {
        mcqAnswers: selectedAnswers,
        programAnswers,
        language,
        uid,
        email,
        timestamp: new Date(),
      });
      toast.success("Answers saved successfully!");
      navigate("/"); // Redirect to home page
    } catch (err) {
      console.error("Error saving answers:", err);
      alert("Failed to save answers. Please try again.");
    }
  };

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code).then(() => {
      alert("Code copied to clipboard!");
    });
  };

  return (
    <>
      <header className="sticky top-0 z-50  bg-gray-700">
        <nav
          aria-label="Top"
          className="bg-gray-100 px-4 sm:px-6 lg:px-8 shadow-xl "
          style={{
            backgroundColor: "#282c34",
          }}
        >
          <div className="">
            <div className="flex h-16 items-center">
              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <div className="flex ">
                  <h1 className="hidden sm:block text-2xl font-bold text-white  px-2 py-1 rounded">
                    WEB JL EXAM - Python
                  </h1>
                  <h1 className=" sm:hidden text-2xl font-bold text-white  px-2 py-1 rounded">
                    Python EXAM
                  </h1>
                </div>
              </div>

              <div className="ml-auto flex items-center lg:space-x-6">
                <div className="flex text-base justify-center items-center text-center">
                  <div className="flex justify-center mt-1">
                    <button
                      className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700"
                      onClick={saveAnswersToFirebase}
                    >
                      Save Answers
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <h1 className="text-4xl font-bold text-center mb-8">
          Python - WEB JL EXAM
        </h1>

        {/* MCQ Section */}
        <div className="bg-gray-900 text-gray-200 p-6">
          <h2 className="text-3xl font-bold mb-6">
            MCQ Questions For 20 Marks
          </h2>
          <form className="space-y-8">
            {mcqQuestions.map((q) => (
              <div key={q.id} className="space-y-4">
                <h3 className="text-xl font-semibold">{q.question}</h3>
                {q.code && (
                  <pre className="bg-gray-800 text-white p-4 rounded-md overflow-scroll">
                    {q.code}
                  </pre>
                )}
                <div className="space-y-2">
                  {q.options.map((option) => (
                    <label key={option} className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        value={option}
                        checked={selectedAnswers[q.id] === option}
                        onChange={() => handleRadioChange(q.id, option)}
                        className="h-5 w-5 text-blue-500 bg-gray-800 border-gray-700 rounded focus:ring focus:ring-blue-500"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </form>
        </div>

        {/* Programming Questions Section */}
        <div className="bg-gray-900 text-gray-200 p-6 mt-6">
          <h2 className="text-3xl font-bold mb-6">Programming Questions</h2>
          {programmingQuestions.map((q) => (
            <div key={q.id} className="mb-6">
              <h3 className="text-xl font-semibold mb-2">{q.question}</h3>
              <div className="relative">
                <pre className="bg-gray-800 text-white p-4 rounded-md overflow-scroll">
                  {q.starterCode}
                </pre>
                <button
                  onClick={() => copyToClipboard(q.starterCode)}
                  className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Copy Code
                </button>
              </div>
              <Editor
                height="300px"
                theme="vs-dark"
                language="cpp"
                value={programAnswers[q.id] || q.starterCode}
                onChange={(value) => handleProgramChange(q.id, value || "")}
                className="w-full mt-4"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PythonExam;
