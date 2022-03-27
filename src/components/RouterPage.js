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
import Step2 from "./Step2";
import Logout from "./logout";
import Header from "./Includes/Header";
import ForgetPassword from "./Auth/ForgetPassword";
import ResetPassword from "./Auth/ResetPassword";
import Step1 from "./WheelofEmotion/Step1";

const RouterPage = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route exact path="/forget-password" element={<ForgetPassword />} />
        <Route exact path="/reset-password" element={<ResetPassword />} />
        
        <Route exact path="/about-us" element={<AboutUs />} />
        <Route exact path="/contact-us" element={<ContactUs />} />
        <Route exact path="/step1" element={<Step1 />} />
        <Route exact path="/step2" element={<Step2 />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/sign-up" element={<Signup2 />} />
        <Route exact path="/chart" element={<Chart />} />
        <Route exact path="/logout" element={<Logout />} />
        <Route exact path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default RouterPage;
