import React, { useState } from "react";
import { fireDB } from "../../fireabase/FirebaseConfig"; // Corrected path to FirebaseConfig
import { collection, addDoc } from "firebase/firestore";
import Layout from "../../components/layout/Layout";
import Editor from "@monaco-editor/react"; // Import the Monaco Editor
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast from react-toastify

const CExam = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const user = JSON.parse(localStorage.getItem("user")) || null;
 
   const [selectedAnswers, setSelectedAnswers] = useState({});
   const [programAnswers, setProgramAnswers] = useState({});
   const [language] = useState("C");
 
   const mcqQuestions = [
     
       {
         id: 1,
         question: "Which of the following is not a reserved keyword in C?",
         options: ["A. auto", "B. register", "C. new", "D. extern"],
       },
       {
         id: 2,
         question:
           "What does the following line do in C?\nint a = 5, b = 10, c = 15;",
         options: [
           "A. Declares three variables and initializes them.",
           "B. Declares a single variable and assigns multiple values.",
           "C. Declares three variables but does not initialize them.",
           "D. Syntax error.",
         ],
       },
       {
         id: 3,
         question:
           "In C, how are multiple statements grouped together in control structures?",
         options: [
           "A. Parentheses ()",
           "B. Curly braces {}",
           "C. Square brackets []",
           "D. None of the above",
         ],
       },
       {
         id: 4,
         question: "What does the sizeof() operator return?",
         options: [
           "A. The size of a variable in bits",
           "B. The size of a variable in bytes",
           "C. The memory address of a variable",
           "D. None of the above",
         ],
       },
       {
         id: 5,
         question:
           'What is the output of the following code?\nint x = 5;\nif (x == 10) {\n printf("True");\n} else {\n printf("False");}',
         options: ["A. True", "B. False", "C. Error", "D. Undefined behavior"],
       },
       {
         id: 6,
         question: "Which of the following is true for the continue statement?",
         options: [
           "A. It terminates the loop.",
           "B. It skips the rest of the loop iteration.",
           "C. It skips to the end of the program.",
           "D. None of the above.",
         ],
       },
       {
         id: 7,
         question:
           "Which of the following functions in C is used to generate random numbers?",
         options: ["A. rand()", "B. random()", "C. generate()", "D. number()"],
       },
       {
         id: 8,
         question: "Can a function in C return multiple values directly?",
         options: [
           "A. Yes, using return statement.",
           "B. Yes, using arrays or pointers.",
           "C. No, a function can return only one value.",
           "D. None of the above.",
         ],
       },
       {
         id: 9,
         question:
           "Which of the following function declarations is valid in C?",
         options: [
           "A. int func(int a, b);",
           "B. void func(a, b);",
           "C. int func(int a, int b);",
           "D. func(int a, int b);",
         ],
       },
       {
         id: 10,
         question:
           "What is the default value of an array element if it is not initialized?",
         options: [
           "A. 0",
           "B. Garbage value",
           "C. Null",
           "D. None of the above",
         ],
       },
       {
         id: 11,
         question:
           'What is the output of the following code?\nint arr[3] = {1, 2, 3};\nprintf("%d", arr[3]);',
         options: [
           "A. 3",
           "B. Garbage value",
           "C. Error",
           "D. Undefined behavior",
         ],
       },
       {
         id: 12,
         question: "Which function is used to compare two strings in C?",
         options: ["A. strcmp()", "B. strcat()", "C. strcpy()", "D. strlen()"],
       },
       {
         id: 13,
         question: "What will happen if you try to dereference a null pointer?",
         options: [
           "A. 0 is returned.",
           "B. Undefined behavior.",
           "C. The program crashes.",
           "D. The value null is printed.",
         ],
       },
       {
         id: 14,
         question: "What does the * operator do in pointer arithmetic?",
         options: [
           "A. Assigns a pointer to another pointer.",
           "B. Accesses the value at the pointer's memory location.",
           "C. Declares a pointer.",
           "D. None of the above.",
         ],
       },
       {
         id: 15,
         question: "Can a structure in C contain a pointer to itself?",
         options: [
           "A. Yes, using struct.",
           "B. No, it causes a compilation error.",
           "C. Yes, but only with arrays.",
           "D. None of the above.",
         ],
       },
       {
         id: 16,
         question: "How do you access a structure member using a pointer?",
         options: [
           "A. pointer.member",
           "B. (*pointer).member",
           "C. pointer->member",
           "D. Both B and C",
         ],
       },
       {
         id: 17,
         question: "Which function is used to open a file in C?",
         options: ["A. file()", "B. fopen()", "C. open()", "D. read()"],
       },
       {
         id: 18,
         question: 'What does the mode "w" in fopen() do?',
         options: [
           "A. Opens the file for writing; overwrites if it exists.",
           "B. Opens the file for writing; appends data if it exists.",
           "C. Opens the file for reading.",
           "D. Opens the file for reading and writing.",
         ],
       },
       {
         id: 19,
         question: "What does #include do in C?",
         options: [
           "A. Includes a header file in the program.",
           "B. Includes a library dynamically.",
           "C. Declares a variable globally.",
           "D. None of the above.",
         ],
       },
       {
         id: 20,
         question: "What is the difference between == and = in C?",
         options: [
           "A. == is for assignment, = is for comparison.",
           "B. = is for assignment, == is for comparison.",
           "C. Both are the same.",
           "D. None of the above.",
         ],
       },
     
   ];
 
   const programmingQuestions = [
    {
      id: 1,
      question: "Debug the Infinite Loop",
      starterCode: `#include <stdio.h>\nint main() {\n    int count = 10;\n    while (count >= 0) {\n        printf("Count: %d", count);\n    }\n    return 0;\n}`,
    },
    {
      id: 2,
      question: "Debug the Highest Value in Array",
      starterCode: `#include <stdio.h>\nint main() {\n    int Arr[] = {-11,-5,-3,-10,-15};\n    int len = 0;\n    for (int i = 0; i < 5; i++) {\n        if(Arr[i] > len){\n            len = Arr[i];\n        }\n    }\n    printf("The Highest Value is %d",len);\n    return 0;\n}`,
    },
    {
      id: 3,
      question: "Swap the Value of A & B Without Using 3 Variables",
      starterCode: `#include <stdio.h>\nvoid swap(int a,int b){\n    printf("Before Swap A = %d , B = %d",a,b);\n    b = a+b;\n    a = a-b;\n    b = a-b;\n    printf("After Swap A = %d, B = %d",a,b);\n}\nint main() {\n    int A = 2;\n    int B = 3;\n    swap(A,B);\n    return 0;\n}`,
    },
    {
      id: 4,
      question: "The pointer Address is not Show Fix the Error",
      starterCode: `#include <stdio.h>\nint main() {\n    int *ptr = NULL;\n    *ptr = 10;\n    printf("%d", *ptr);\n    return 0;\n}`,
    },
    {
      id: 5,
      question: "C program that checks whether a number is prime",
      starterCode: `#include <stdio.h>\n\nint isPrime(int n) {\n    if (n <= 1)\n        return 0;  \n\n    for (int i = 2; i <= n / 2; i++) {  // Fixed loop syntax\n        if (n % i == 0)\n            return 0; \n    }\n\n    return 1;\n}\n\nint main() {\n    int num;\n    printf("Enter a number: ");\n    scanf("%d", &num);  // Fixed scanf syntax\n\n    if (isPrime(num))\n        printf("%d is a prime number.\n", num);\n    else\n        printf("%d is not a prime number.\n", num);\n\n    return 0;\n}`,
    },
    {
      id: 6,
      question: "Armstrong Number Debugging Program in C",
      starterCode: `#include <stdio.h>\n\nint power(int base, int exp) {\n    int result = 1;\n    for (int i = 1; i <= exp; i++)\n        result *= base; // Fixed misplaced semicolon\n    return result;\n}\n\nint isArmstrong(int num) {\n    int temp = num, sum = 0, digits = 0;\n\n    while (temp != 0) {  // Removed extra semicolon\n        digits++;\n        temp /= 10;\n    }\n\n    temp = num;\n    while (temp != 0) {\n        int digit = temp % 10;\n        sum += power(digit, digits);\n        temp /= 10;\n    }\n\n    return (sum == num);\n}\n\nint main() {\n    int number;\n    printf("Enter a number: ");\n    scanf("%d", &number);  // Fixed scanf syntax\n\n    if (isArmstrong(number))\n        printf("%d is an Armstrong number.\n", number);\n    else\n        printf("%d is not an Armstrong number.\n", number);\n\n    return 0;\n}`,
    },
  ];
  
 
   const handleRadioChange = (questionId, option) => {
     setSelectedAnswers((prev) => ({
       ...prev,
       [questionId]: option,
     }));
   };
 
   const handleProgramChange = (questionId, value) => {
     setProgramAnswers((prev) => ({
       ...prev,
       [questionId]: value,
     }));
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
                            WEB JL EXAM - C
                          </h1>
                          <h1 className=" sm:hidden text-2xl font-bold text-white  px-2 py-1 rounded">
                            C EXAM
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
          C - WEB JL EXAM
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
          <h2 className="text-3xl font-bold mb-6">
            Programming Questions For 40 Marks
          </h2>
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
                language="c"
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

export default CExam;
