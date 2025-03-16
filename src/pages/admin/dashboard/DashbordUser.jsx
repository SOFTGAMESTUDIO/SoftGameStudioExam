import React, { useContext } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaUser, FaCartPlus } from "react-icons/fa";
import { AiFillShopping } from "react-icons/ai";
import { Link } from "react-router-dom";
import UserData from"./Dashbord/UsersData";
import EmployData from "./Dashbord/EmployData";
import Layout from "../../../components/layout/Layout";



const DashbordUser = () => {
  

    return (
      <Layout>
         <Link to={"/dashboard"}>
                <button
                 
                 className="p-4 m-4 font-medium text-lg border-b-4 border-purple-500 bg-transparent text-purple-500 
        hover:shadow-xl hover:scale-105 transform transition-all duration-300 rounded-md py-2 px-4 flex items-center gap-2"
               >
                 
                 Dashbord
         </button>
                </Link>
 <div className="container mx-auto px-4 py-8 bg-gray-900 text-white">
      <Tabs className="mt-8">
        <TabList className="flex flex-wrap justify-center gap-8 mb-6">
          <Tab>
            <button
              className="font-medium text-lg border-b-4 border-cyan-500 bg-transparent text-cyan-500 
     hover:shadow-xl hover:scale-105 transform transition-all duration-300 rounded-md py-2 px-4 flex items-center gap-2"
            >
              <FaUser />
              Users
            </button>
          </Tab>
          <Tab>
            <button
              className="font-medium text-lg border-b-4 border-cyan-500 bg-transparent text-cyan-500 
     hover:shadow-xl hover:scale-105 transform transition-all duration-300 rounded-md py-2 px-4 flex items-center gap-2"
            >
              <FaUser />
              Empoloy Data
            </button>
          </Tab>
        </TabList> 

        {/* Users Panel */}
        <TabPanel>
          <UserData/>
        </TabPanel>
        <TabPanel>
          <EmployData/>
        </TabPanel>
      </Tabs>
    </div>
      </Layout>
     
    );
}

export default DashbordUser;
