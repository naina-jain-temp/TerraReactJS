import React, { useRef, useState, Fragment , } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import $ from "jquery";
//import ReactSession from 'react-client-session';
import "swiper/css";
import "swiper/css/navigation";
import "./Step2.css";
import { Navigation } from "swiper";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
//ReactSession.setStoreType("localStorage");

const Step2 = () => {

  var emotionData = '';
  var isLike = false;
  var rating = 0;

  const navigate = useNavigate();

  $(window).on("load", function () {
    let currentUrl = window.location.href;
    console.log('data');
    emotionData = currentUrl.split('=')[1];
  });
  

  const submitHandler = async (event) => {
    if(window.sessionStorage.getItem("token") !== '' && window.sessionStorage.getItem("token") !== undefined && window.sessionStorage.getItem("token") !== null){
      const response = await fetch("http://localhost:4000/api/v1/user/submitAuthResponse",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token" : window.sessionStorage.getItem("token")
        },
        body: JSON.stringify({
          "emotion" : emotionData,
          "rating" : rating,
          "isLike" : isLike
        })
      });

      const responseData = await response.json();
      if (responseData.success && responseData.statusCode === 200) {
        toast("Response submitted");
        navigate("/chart");
      }else{
        toast.error(responseData.message,{position: toast.POSITION.TOP_CENTER})
      }
    }else{

      const response = await fetch("http://localhost:4000/api/v1/user/submitResponse",{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "emotion" : emotionData,
          "rating" : rating,
          "isLike" : isLike
        })
      });
      const responseData = await response.json();
      if (responseData.success && responseData.statusCode === 200) {
        toast("Response submitted");
        navigate("/chart");
      }else{
        toast.error(responseData.message,{position: toast.POSITION.TOP_CENTER})
        
      }

    }
    //alert(ReactSession.get("token"));
   /* const response = await fetch("http://localhost:4000/api/v1/user/submitResponse",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "emotion" : emotionData,
        "rating" : rating,
        "isLike" : isLike
      })
    });*/
    
    
  };

  const submitIsLike = async(event) => {
    alert(event.target.name);
    if(event.target.name === 'like'){
      isLike = true;
    }else{
      isLike = false;
    }
  }

  const submitRating = async(event) => {
     rating = event.target.name;
    alert(rating);
  }

  

  return (
    <Fragment>
      <header>
        <div className="container">
          <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">
                <img src="assets/img/logo.png" className="logo" alt="Logo" />
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarScroll"
                aria-controls="navbarScroll"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon">
                  <i className="fas fa-bars"></i>
                </span>
              </button>
              <div className="collapse navbar-collapse" id="navbarScroll">
                <ul
                  className="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll align-items-baseline"
                  style={{ "--bs-scroll-height": "100px" }}
                >
                  <li className="nav-item">
                    <Link
                      to="/"
                      className="nav-link active"
                      aria-current="page"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/about-us" className="nav-link">
                      About Us
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/contact-us" className="nav-link">
                      Contact Us
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/login"
                      className="btn btn-outline-light px-4 rounded-pill"
                    >
                      Login
                    </Link>
                    {/* <a className="btn btn-outline-light px-4 rounded-pill">Login</a> */}
                  </li>
                  <li className="nav-item">
                    <Link to="/signup">
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        height="25px"
                        data-prefix="far"
                        data-icon="user"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        className="svg-inline--fa fa-user fa-w-14 fa-2x"
                      >
                        <path
                          fill="#fff"
                          d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z"
                          className=""
                        ></path>
                      </svg>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <main className="about">
        
      <ToastContainer />
        <section className="mt-4">
          <div className="container-md">
            <div className="row justify-content-center ">
              <div className="col-md-9">
                <div className="swiper mySwiper">
                  <div className="swiper-wrapper">
                    <div className="swiper-slide">
                      <Swiper
                        navigation={true}
                        modules={[Navigation]}
                        className="mySwiper"
                      >
                        <SwiperSlide>
                          <div className="step step-1">
                            <div className="mb-4 text-center title">
                              <h3>How do you feel about (x) right now?</h3>
                            </div>
                            <div className="d-flex justify-content-center">
                              <div className="check-box like">
                                <input type="radio" onClick = {submitIsLike} name="like" />
                                <span
                                  style={{ "background-color": "lightgreen" }}
                                >
                                  <img src="assets/img/like.png" />
                                  Like
                                </span>
                              </div>
                              <div className="check-box dislike">
                                <input type="radio" onClick =  {submitIsLike} name="dislike" />
                                <span style={{ "background-color": "orange" }}>
                                  <img src="assets/img/dislike.png" />
                                  Dislike
                                </span>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                        <SwiperSlide>
                          <div className="step step-2">
                            <div className="mb-4 text-center title">
                              <h3>
                                On a scale of 1-10 with 10 being the most
                                favorable, where will you place (x) right now?
                              </h3>
                            </div>

                            <div className="chart-scale d-flex justify-content-center flex-wrap ">
                              <div className="check-box">
                                <div>
                                  <button name = "1" onClick = {submitRating} className="btn btn-scale btn-scale-desc-1">
                                    1
                                  </button>
                                  <button name = "2" onClick = {submitRating} className="btn btn-scale btn-scale-desc-2">
                                    2
                                  </button>
                                </div>
                                <div
                                  style={{
                                    "margin-top": "8px",
                                    /* text-align: center; */
                                    /* align-content: center; */
                                    "margin-left": "22%",
                                  }}
                                >
                                  <img
                                    src="assets/img/emoji_11.png"
                                    style={{
                                      display: "block",
                                      width: "50px",
                                      margin: "10px 0 0",
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="check-box">
                                <div>
                                  <button name = "3" onClick = {submitRating} className="btn btn-scale btn-scale-desc-3">
                                    3
                                  </button>
                                  <button name = "4" onClick = {submitRating} className="btn btn-scale btn-scale-desc-4">
                                    4
                                  </button>
                                </div>
                                <div
                                  style={{
                                    "margin-top": "8px",
                                    /* text-align: center; */
                                    /* align-content: center; */
                                    "margin-left": "22%",
                                  }}
                                >
                                  <img
                                    src="assets/img/emoji_09.png"
                                    style={{
                                      display: "block",
                                      width: "50px",
                                      margin: "10px 0 0",
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="check-box">
                                <div>
                                  <button name = "5" onClick = {submitRating} className="btn btn-scale btn-scale-desc-5">
                                    5
                                  </button>
                                  <button name = "6" onClick = {submitRating} className="btn btn-scale btn-scale-desc-6">
                                    6
                                  </button>
                                </div>
                                <div
                                  style={{
                                    "margin-top": "8px",
                                    /* text-align: center; */
                                    /* align-content: center; */
                                    "margin-left": "22%",
                                  }}
                                >
                                  <img
                                    src="assets/img/emoji_07.png"
                                    style={{
                                      display: "block",
                                      width: "50px",
                                      margin: "10px 0 0",
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="check-box">
                                <div>
                                  <button name = "7" onClick = {submitRating} className="btn btn-scale btn-scale-desc-7">
                                    7
                                  </button>
                                  <button name = "8" onClick = {submitRating} className="btn btn-scale btn-scale-desc-8">
                                    8
                                  </button>
                                </div>
                                <div
                                  style={{
                                    "margin-top": "8px",
                                    /* text-align: center; */
                                    /* align-content: center; */
                                    "margin-left": "22%",
                                  }}
                                >
                                  <img
                                    src="assets/img/emoji_05.png"
                                    style={{
                                      display: "block",
                                      width: "50px",
                                      margin: "10px 0 0",
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="check-box">
                                <div>
                                  <button name = "9" onClick = {submitRating} className="btn btn-scale btn-scale-desc-9">
                                    9
                                  </button>
                                  <button name = "10" onClick = {submitRating} className="btn btn-scale btn-scale-desc-10">
                                    10
                                  </button>
                                </div>
                                <div
                                  style={{
                                    "margin-top": "8px",
                                    /* text-align: center; */
                                    /* align-content: center; */
                                    "margin-left": "22%",
                                  }}
                                >
                                  <img
                                    src="assets/img/emoji_03.png"
                                    style={{
                                      display: "block",
                                      width: "50px",
                                      margin: "10px 0 0",
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="lt-rt-btn">
                            <button className="btn btn-custom btn-step prev prev">
                              {/* <i className="fas fa-angle-left"></i> */}
                            </button>
                            <div style={{ "text-align": "end" }}>
                              <button
                                type="submit"
                                onClick={submitHandler}
                                //onClick={() => navigate("/chart")}
                                className="btn btn-custom btn-step mx-0"
                              >
                                {/* <i className="fas fa-sign-in-alt mx-lg-1"></i>{" "} */}
                                Submit
                              </button>
                            </div>
                          </div>

                          {/* <div className="mt-4 d-flex justify-content-center " >
                  <button className="btn btn-custom btn-step prev prev" >Previous</button>
                  <button className="btn btn-custom btn-step next next" >Next</button>
              </div> */}
                        </SwiperSlide>
                      </Swiper>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Fragment>
  );
};

export default Step2; 