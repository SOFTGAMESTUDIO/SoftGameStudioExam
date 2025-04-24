import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Home from './pages/home/Home';
import Dashboard from './pages/admin/dashboard/Dashboard';
import NoPage from './pages/nopage/NoPage';
import MyState from './context/data/myState';
import Login from './pages/registration/Login';
import Signup from './pages/registration/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Privacy from './pages/CUSTOMER SERVICE/PrivacyPolicy';
import About from './pages/CUSTOMER SERVICE/About';
import ContactUs from './pages/CUSTOMER SERVICE/Contact_Us';
import ReturnPolicy from './pages/CUSTOMER SERVICE/Return Policy';
import Order from './pages/order/Order';
import AddProduct from './pages/admin/page/AddProduct';
import UpdateProduct from './pages/admin/page/UpdateProduct';
import Profile from "./pages/Profile/Profile";


import ProductDetails from "./pages/WEB JL EXAM/ProductDetails";

import TermsAndConditions from "./pages/CUSTOMER SERVICE/TermsAndConditions";


import DashbordExam from './pages/admin/dashboard/DashbordExam';
import DashbordUser from './pages/admin/dashboard/DashbordUser';


import CopyrightPage from './pages/CopyrightPage/CopyrightPage';

import Resetpassword from './pages/registration/Resetpassword'



import Testimonial from './components/testimonial/Testimonial';


import QuizExam from './pages/EXAM CONTROLER/QuizExam';
import GetResult from './pages/WEB JL EXAM/GetResult';
import UpdaetUserData from './pages/Profile/UpdaetUserData';

import ScrollToTop from './ScrollToTop';
import ExamList from './pages/EXAM CONTROLER/ExamList';
import ExamDetails from './pages/EXAM CONTROLER/ExamDetails';
import BackButtonHandler from './BackButtonHandler';
import EditQuizDetails from './pages/admin/dashboard/Dashbord/Quiz/EditQuizDetails';
import EditQuizQuestions from './pages/admin/dashboard/Dashbord/Quiz/EditQuizQuestions';






















function App() {
  return (
    <MyState>
      <Router future={{ 
    v7_startTransition: true, 
    v7_relativeSplatPath: true 
}}>
      <ScrollToTop/>
      <BackButtonHandler/>
        <Routes>
       

          <Route path="/" element={<Home />} />
          <Route path="/CopyrightPage" element={<CopyrightPage/>} />      
          <Route path="/SoftGame_Studio_Members_Details" element={<Testimonial />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/updateuser" element={<UpdaetUserData />} />
          <Route path="/webproductinfo/:id" element={<ProductDetails />} />

          
          
          <Route
            path="/ADMIN-USER"
            element={
              <ProtectedRouteForAdmin>
                <DashbordUser/>
              </ProtectedRouteForAdmin>
            }
          />
          <Route
            path="/ADMIN-EXAM"
            element={
              <ProtectedRouteForAdmin>
                <DashbordExam/>
              </ProtectedRouteForAdmin>
            }
          />
          
          <Route
            path="/OnlineQuiz"
            element={<ExamList/>}
          />
          
          <Route
           
            path="/quiz/:id"
            element={
              <ProtectedRoute>
                <QuizExam/>
              </ProtectedRoute>}
          />
          <Route
            path="/examinfo/:id"
            element={<ExamDetails/>}
          />
          <Route
            path="/addproduct"
            element={
              <ProtectedRouteForAdmin>
                <AddProduct />
              </ProtectedRouteForAdmin>
            }
          />
          <Route
            path="/updateproduct"
            element={
              <ProtectedRouteForAdmin>
                <UpdateProduct />
              </ProtectedRouteForAdmin>
            }
          />
          <Route
            path="/YOUREXAM"
            element={
              <ProtectedRoute>
                <Order />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ADMIN-EXAM/details/:id"
            element={
              <ProtectedRouteForAdmin>
                <EditQuizDetails/>
              </ProtectedRouteForAdmin>
            }
          />
          <Route
            path="/ADMIN-EXAM/questions/:id"
            element={
              <ProtectedRouteForAdmin>
                <EditQuizQuestions/>
              </ProtectedRouteForAdmin>
            }
          />

          
          
          <Route
            path="/dashboard"
            element={
              <ProtectedRouteForAdmin>
                <Dashboard />
              </ProtectedRouteForAdmin>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/resetpassword" element={<Resetpassword />} />
          <Route path="/*" element={<NoPage />} />
          <Route path="/PrivacyPolicy" element={<Privacy />} />
          <Route path="/ReturnPolicy" element={<ReturnPolicy />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/TermsAndConditions" element={<TermsAndConditions />} />
          <Route path="/About" element={<About />} />
          <Route path="/Result" element={<GetResult />} />

       
          
        </Routes>
        <ToastContainer />
      </Router>
    </MyState>
  );
}

export default App 

// user 

export const ProtectedRoute = ({children}) => {
  const user = localStorage.getItem('user')
  if(user){
    return children
  }else{
    return <Navigate to={'/login'}/>
  }
}

// admin 

//  const ProtectedRoutesForAdmin = ({children}) => {
//   const admin = JSON.parse(localStorage.getItem('user'))
//   console.log(admin.user.email)
//   if (admin.user.email === 'lgteamworkofficial@gmail.com') {
//     return children
//   }
//   else {
//     return <Navigate to='/login' />
//   }
// }
export const ProtectedRouteForAdmin = ({children})=> {
  const admin = JSON.parse(localStorage.getItem('user'))
  
  if (admin.user.email === import.meta.env.VITE__ADMIN_EMAIL) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }

}


