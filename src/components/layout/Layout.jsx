import React, { Fragment, useContext, use, useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { Link } from "react-router-dom";


function Layout({ children }) {

  const [showFirstDiv, setShowFirstDiv] = useState(true);
  const toggleDivs = () => {
    setShowFirstDiv(!showFirstDiv);
  }
  return (
    <div>
      <Navbar />
      <div className="">
        <div className="content">{children}</div>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
