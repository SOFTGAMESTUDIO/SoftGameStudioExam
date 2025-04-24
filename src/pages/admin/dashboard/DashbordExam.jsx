import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Link } from "react-router-dom";
import SavedCodeDetails from "./Dashbord/SavedCodeDetails";
import AdminFetchUserWeb from "./Dashbord/AdminFetchUserWeb";
import UploadResult from "./Dashbord/UploadResult";
import Layout from "../../../components/layout/Layout";
import ExamDetails from "./Dashbord/ExamUplode";
import AdminCreateQuiz from "./Dashbord/Quiz/CreateQuiz";
import UserAnswers from "./Dashbord/Quiz/UserAnswers";
import ManageQuizzes from "./Dashbord/Quiz/ManageQuizzes";

const DashbordExam = () => {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-10 bg-gray-900 text-white">
        <Link to={"/dashboard"}>
          <button className="p-4 mb-6 font-semibold text-lg border-b-4 border-purple-500 bg-transparent text-purple-500 hover:shadow-xl hover:scale-105 transform transition-all duration-300 rounded-md py-3 px-6 flex items-center gap-3">
            Dashboard
          </button>
        </Link>
        
        <Tabs>
          <TabList className="flex flex-wrap justify-center gap-6 mb-8"><Tab>
              <button className="font-semibold text-lg border-b-4 border-blue-500 bg-transparent text-blue-500 hover:shadow-xl hover:scale-105 transform transition-all duration-300 rounded-md py-3 px-6 flex items-center gap-3">
                Add Exam
              </button>
            </Tab>
            <Tab>
              <button className="font-semibold text-lg border-b-4 border-blue-500 bg-transparent text-blue-500 hover:shadow-xl hover:scale-105 transform transition-all duration-300 rounded-md py-3 px-6 flex items-center gap-3">
                Exam Check
              </button>
            </Tab>
            <Tab>
              <button className="font-semibold text-lg border-b-4 border-pink-500 bg-transparent text-pink-500 hover:shadow-xl hover:scale-105 transform transition-all duration-300 rounded-md py-3 px-6 flex items-center gap-3">
                WEB Exam Check
              </button>
            </Tab>
            <Tab>
              <button className="font-semibold text-lg border-b-4 border-emerald-500 bg-transparent text-emerald-500 hover:shadow-xl hover:scale-105 transform transition-all duration-300 rounded-md py-3 px-6 flex items-center gap-3">
                Upload Result
              </button>
            </Tab>
            <Tab>
              <button className="font-semibold text-lg border-b-4 border-emerald-500 bg-transparent text-emerald-500 hover:shadow-xl hover:scale-105 transform transition-all duration-300 rounded-md py-3 px-6 flex items-center gap-3">
                Create Quiz
              </button>
            </Tab>
            <Tab>
              <button className="font-semibold text-lg border-b-4 border-emerald-500 bg-transparent text-emerald-500 hover:shadow-xl hover:scale-105 transform transition-all duration-300 rounded-md py-3 px-6 flex items-center gap-3">
              Manage Quizzes
              </button>
            </Tab>
            <Tab>
              <button className="font-semibold text-lg border-b-4 border-emerald-500 bg-transparent text-emerald-500 hover:shadow-xl hover:scale-105 transform transition-all duration-300 rounded-md py-3 px-6 flex items-center gap-3">
                Answer Quiz
              </button>
            </Tab>
          </TabList>
          

          <TabPanel>
            <ExamDetails />
          </TabPanel>
          <TabPanel>
            <SavedCodeDetails />
          </TabPanel>
          <TabPanel>
            <AdminFetchUserWeb />
          </TabPanel>
          <TabPanel>
            <UploadResult />
          </TabPanel>
          <TabPanel>
            <AdminCreateQuiz/>
          </TabPanel>
          <TabPanel>
            <ManageQuizzes/>
          </TabPanel>
          <TabPanel>
            <UserAnswers/>
          </TabPanel>
        </Tabs>
      </div>
    </Layout>
  );
};

export default DashbordExam;
