import React, { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { fireDB } from "../../fireabase/FirebaseConfig";
import Layout from "../../components/layout/Layout";
import Editor from "@monaco-editor/react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast from react-toastify

const CodeEditor = () => {

     const navigate = useNavigate(); // Initialize navigate function


  const user = JSON.parse(localStorage.getItem("user")) || null;

  const [activeTab, setActiveTab] = useState("html");
  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [jsCode, setJsCode] = useState("");
  const [output, setOutput] = useState("");
  const [layout, setLayout] = useState("modern");

  useEffect(() => {
    setOutput(`
      <html>
        <head>
          <style>${cssCode}</style>
        </head>
        <body>
          ${htmlCode}
          <script>${jsCode}</script>
        </body>
      </html>
    `);
  }, [htmlCode, cssCode, jsCode]);

  const handleCodeChange = (code) => {
    if (activeTab === "html") setHtmlCode(code);
    else if (activeTab === "css") setCssCode(code);
    else setJsCode(code);
  };

  const handleSave = async () => {
    try {
      const { uid, email } = user?.user || {};
      if (!uid || !email) {
        alert("Incomplete user information!");
        return;
      }
      await addDoc(collection(fireDB, "user_web"), {
        uid,
        email,
        timestamp: new Date(),
        html: htmlCode,
        css: cssCode,
        js: jsCode,
      });
      toast.success("Answers saved successfully!");
      navigate("/"); // Redirect to home page
    } catch (error) {
      console.error("Error saving code: ", error);
      alert("Failed to save code.");
    }
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
                            WEB JL EXAM - WEB DEV
                          </h1>
                          <h1 className=" sm:hidden text-2xl font-bold text-white  px-2 py-1 rounded">
                            WEB DEV EXAM
                          </h1>
                        </div>
                     
                    </div>
      
                    <div className="ml-auto flex items-center lg:space-x-6">
                      <div className="flex text-base justify-center items-center text-center">
                      <div className="flex justify-center mt-1">
          <button
            className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700"
            onClick={handleSave}
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
      <div className="flex flex-col h-full bg-gray-900 text-white p-4">
        
        {/* Layout Switcher */}
        <div className="flex border-b border-gray-700 mb-4">
          <button
            onClick={() => setLayout("modern")}
            className={`flex-1 p-3 text-center font-semibold ${
              layout === "modern" ? "bg-blue-500" : "bg-blue-700"
            }`}
          >
            Modern Layout
          </button>
          <button
            onClick={() => setLayout("classic")}
            className={`flex-1 p-3 text-center font-semibold ${
              layout === "classic" ? "bg-blue-500" : "bg-blue-700"
            }`}
          >
            Classic Layout
          </button>
        </div>

        {/* Modern Layout */}
        {layout === "modern" ? (
          <>
            {/* Modern Tab Section (Icons & Styling) */}
            <div className="flex justify-between bg-gray-800 p-2 rounded-md mb-4 ">
              {["html", "css", "javascript", "output"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 text-center font-semibold py-2 rounded-md   m-2 ${
                    activeTab === tab ? "bg-blue-500" : "bg-gray-700"
                  }`}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Modern Editor & Output (Editor on top, Output below) */}
            <div className="flex flex-col gap-4 flex-1">
              {activeTab !== "output" ? (
                <div className="flex-1 bg-gray-800 p-4 rounded-lg shadow-md">
                  <Editor
                    height="500px"
                    theme="vs-dark"
                    language={activeTab}
                    value={activeTab === "html" ? htmlCode : activeTab === "css" ? cssCode : jsCode}
                    onChange={(value) => handleCodeChange(value || "")}
                  />
                </div>
              ) : (
                <div className="flex-1 bg-white p-4 rounded-lg shadow-md border border-gray-300 overflow-auto">
                  <iframe key={layout} title="output" srcDoc={output} className="w-full h-full min-h-96 border-none" />
                </div>
              )}
            </div>
          </>
        ) : (
          /* Classic Layout */
          <>
            {/* Classic Tab Section (Traditional Look) */}
            <div className="flex border-b border-gray-700 mb-4">
              {["html", "css", "javascript"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 p-3 text-center uppercase font-semibold ${
                    activeTab === tab ? "bg-gray-700" : "bg-gray-800"
                  }`}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
             
            </div>

            {/* Classic Editor & Output (Side by Side) */}
            <div className="flex flex-row gap-4 flex-1">
              <div className="w-1/2 bg-gray-800 p-4 rounded-lg shadow-md">
                <Editor
                  height="500px"
                  theme="vs-dark"
                  language={activeTab}
                  value={activeTab === "html" ? htmlCode : activeTab === "css" ? cssCode : jsCode}
                  onChange={(value) => handleCodeChange(value || "")}
                />
              </div>
              <div className="w-1/2 bg-white p-4 rounded-lg shadow-md border border-gray-300 overflow-auto">
                <iframe key={layout} title="output" srcDoc={output} className="w-full h-full border-none" />
              </div>
            </div>
          </>
        )}

       
      </div>
    </>
  );
};

export default CodeEditor;
