import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import Layout from "../../components/layout/Layout";
import Editor from "@monaco-editor/react"; // Import Monaco Editor
import { fireDB } from "../../fireabase/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast from react-toastify


const CPPExam = () => {
  const navigate = useNavigate(); // Initialize navigate function


  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [programAnswers, setProgramAnswers] = useState({});
  const [language] = useState("cpp");

  const mcqQuestions = [
    {
        id: 1,
        question: "Which of the following is a valid C++ data type?",
        options: ["int", "string", "bool", "All of the above"]
    },
    {
        id: 2,
        question: "Which of the following correctly declares a pointer in C++?",
        options: ["int ptr;", "int *ptr;", "ptr int*;", "*ptr int;"]
    },
    {
        id: 3,
        question: "Which of the following is used to dynamically allocate memory in C++?",
        options: ["malloc", "alloc", "new", "create"]
    },
    {
        id: 4,
        question: "Which operator is used to access a member function of a class using an object?",
        options: [".", "->", "::", "*"]
    },
    {
        id: 5,
        question: "Which of the following is NOT a C++ access specifier?",
        options: ["private", "protected", "public", "secured"]
    },
    {
        id: 6,
        question: "What is the default return type of the main() function in C++?",
        options: ["int", "void", "float", "char"]
    },
    {
        id: 7,
        question: "Which header file is required to use the std::cout object in C++?",
        options: ["<stdio.h>", "<iostream>", "<string>", "<stdlib.h>"]
    },
    {
        id: 8,
        question: "Which keyword is used to prevent a function from being overridden?",
        options: ["constant", "static", "final", "virtual"]
    },
    {
        id: 9,
        question: "Which feature of C++ allows the same function name to be used for different types?",
        options: ["Encapsulation", "Inheritance", "Polymorphism", "Abstraction"]
    },
    {
        id: 10,
        question: "What does the ‘this’ pointer point to in a member function?",
        options: ["The base class", "The derived class", "The calling object", "NULL"]
    },
    {
        id: 11,
        question: "Which function is used to release dynamically allocated memory in C++?",
        options: ["free()", "delete", "remove()", "release()"]
    },
    {
        id: 12,
        question: "Which keyword is used for exception handling in C++?",
        options: ["throw", "catch", "try", "All of the above"]
    },
    {
        id: 13,
        question: "Which looping construct guarantees at least one execution?",
        options: ["for", "while", "do-while", "foreach"]
    },
    {
        id: 14,
        question: "Which of the following is true about constructors in C++?",
        options: ["They must have the same name as the class", "They can return values", "They can be virtual", "None of the above"]
    },
    {
        id: 15,
        question: "Which function is called when an object goes out of scope?",
        options: ["Constructor", "Destructor", "Deallocator", "Finalize"]
    },
    {
        id: 16,
        question: "What is the purpose of the 'friend' keyword in C++?",
        options: ["To create a global function", "To allow non-member functions to access private members", "To define a derived class", "To prevent function overloading"]
    },
    {
        id: 17,
        question: "Which of the following is true about static member functions?",
        options: ["They cannot access non-static members", "They are bound to a specific object", "They can use the 'this' pointer", "They can be virtual"]
    },
    {
        id: 18,
        question: "Which of the following is NOT a valid way to initialize an object in C++?",
        options: ["Constructor initialization", "Assignment initialization", "List initialization", "Direct initialization"]
    },
    {
        id: 19,
        question: "Which of the following is the correct syntax for declaring a reference variable?",
        options: ["int &ref = var;", "int ref = &var;", "int *ref = var;", "int &var = ref;"]
    },
    {
        id: 20,
        question: "Which of the following is used to read a whole line of input in C++?",
        options: ["cin >> input;", "getline(cin, input);", "cin.get(input);", "input.read();"]
    }
];


const programmingQuestions = [
  {
    id: 1,
    question: "Write a C++ program to find Sum of Digits (Logical Error)",
    starterCode: `#include <iostream>\nusing namespace std;\n\nint sumOfDigits(int n) {\n    int sum = 0;\n    while (n > 0) {\n        sum = n % 10;\n        n /= 10;\n    }\n    return sum;\n}\n\nint main() {\n    int num;\n    cout << "Enter a number: ";\n    cin >> num;\n    cout << "Sum of digits: " << sumOfDigits(num) << endl;\n    return 0;\n}`
  },
  {
    id: 2,
    question: "Write a C++ program to Find Array Index Out of Bounds (Runtime Error)",
    starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int arr[5] = {1, 2, 3, 4, 5};\n    for (int i = 0; i <= 5; i++) {  \n        cout << arr[i] << " ";\n    }\n    return 0;\n}`
  },
  {
    id: 3,
    question: "Write a C++ program to Find Infinite Loop (Logical Error)",
    starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int i = 10;\n    while (i != 0) {\n        cout << i << " ";\n        i = i - 2;  \n    }\n    return 0;\n}`
  },
  {
    id: 4,
    question: "Write a C++ program to String Manipulation (Syntax & Logical Errors)",
    starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    string str;\n    cout << "Enter a string: ";\n    cin >> str;\n    str[0] = toupper(str[0]);  \n\n    cout << "Modified string: " << str << endl;\n    return 0;\n}`
  },
  {
    id: 5,
    question: "Debug the Following C++ Program (Number Manipulation & Recursion)",
    starterCode: `#include <iostream>\nusing namespace std;\n\nint isPrime(int n) {\n    if (n <= 1) return false;\n    for (int i = 2; i < n / 2; i++) { \n        if (n % i == 0) return false;\n    }\n    return true;\n}\n\nint sumPrimeFactors(int n, int factor = 2) {\n    if (n <= 1) return 0; \n    if (n % factor == 0 && isPrime(factor)) {\n        return factor + sumPrimeFactors(n / factor, factor); \n    }\n    return sumPrimeFactors(n, factor + 1);\n}\n\nint main() {\n    int num;\n    cout << "Enter a number: ";\n    cin >> num;\n    cout << "Sum of prime factors: " << sumPrimeFactors(num) << endl;\n    return 0;\n}`
  },
  {
    id: 6,
    question: "Debug the Following C++ Program (String Processing & Palindrome Permutation)",
    starterCode: `#include <iostream>\nusing namespace std;\n\nbool canFormPalindrome(string str) {\n    int freq[26] = {0};\n    for (char c : str) {\n        freq[c - 'a']++;  \n    }\n\n    int oddCount = 0;\n    for (int i = 0; i <= 26; i++) {  \n        if (freq[i] % 2 == 1)\n            oddCount++;\n    }\n\n    return oddCount <= 1;\n}\n\nint main() {\n    string input;\n    cout << "Enter a string: ";\n    cin >> input;\n    if (canFormPalindrome(input))\n        cout << "Yes, it can be rearranged into a palindrome.\n";\n    else\n        cout << "No, it cannot be rearranged into a palindrome.\n";\n    return 0;\n}`
  }
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
                            WEB JL EXAM - C++
                          </h1>
                          <h1 className=" sm:hidden text-2xl font-bold text-white  px-2 py-1 rounded">
                            C++ EXAM
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
        <h1 className="text-4xl font-bold text-center mb-8">CPP Exam</h1>

        {/* MCQ Section */}
        <div className="bg-gray-900 text-gray-200 p-6">
          <h2 className="text-3xl font-bold mb-6">MCQ Questions</h2>
          <form className="space-y-8">
            {mcqQuestions.map((q) => (
              <div key={q.id} className="space-y-4">
                <h3 className="text-xl font-semibold">{q.question}</h3>
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
                height="800px"
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

export default CPPExam;
