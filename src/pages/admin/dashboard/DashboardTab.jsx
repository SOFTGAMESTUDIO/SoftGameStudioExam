import React from "react";
import { Link } from "react-router-dom";

const DashboardTab = () => {
  const tabs = [
    
    {
      title: "Exam Details",
      details: ["Exam Data", "Upload Result", "Edit Result"],
      link: "/ADMIN-EXAM"
    },
    
    {
      title: "Users ",
      details: ["Users Data", "Add New Employee", "See All Employees Data"],
      link: "/ADMIN-USER"
    },
   
    
  ];

  return (
    <section className="text-gray-400 bg-gray-900 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {tabs.map((tab, index) => (
            <div key={index} className="p-4 xl:w-1/4 md:w-1/2 w-full">
              <div className="h-full p-6 rounded-lg border-2 border-gray-700 flex flex-col relative overflow-hidden">
                <h2 className="text-xs tracking-widest text-gray-400 title-font mb-1 font-medium">Admin</h2>
                <h1 className="text-3xl text-white pb-2 mb-4 border-b border-gray-800 leading-tight text-center">{tab.title}</h1>
                <div className="flex flex-col flex-grow">
                  {tab.details.map((detail, i) => (
                    <p key={i} className="flex items-center text-gray-300 text-lg mb-3">
                      <span className="w-5 h-5 mr-2 inline-flex items-center justify-center bg-gray-800 text-gray-500 rounded-full flex-shrink-0">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20 6L9 17l-5-5"></path>
                        </svg>
                      </span>
                      {detail}
                    </p>
                  ))}
                </div>
                <div className="mt-auto">
                  <Link to={tab.link}>
                    <button className="flex items-center justify-center text-white bg-gray-800 border-0 py-3 px-6 w-full focus:outline-none hover:bg-gray-700 rounded mt-4">
                      View Details
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-5 h-5 ml-auto"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DashboardTab;
