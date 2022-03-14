import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import Chart from "./Chart";
import ErrorPage from "./ErrorPage";
import Index from "./Index";
import Login from "./Login";
import Signup from "./Signup";
import Signup2 from "./Signup2";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Logout from "./logout";

const RouterPage = () => {
  return(
      <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/step1" element={<Step1 />} />
            <Route path="/step2" element={<Step2 />} />          
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/sign-up" element={<Signup2 />} />
            <Route path="/chart" element={<Chart />} />
            <Route path="/logout" element={<Logout/>} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
      </Router>
  );
};

export default RouterPage;