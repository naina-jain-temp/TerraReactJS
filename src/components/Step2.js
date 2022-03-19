import React, { useRef, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./Step2.css";
import { Navigation } from "swiper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import authServices from "../Services/authServices";
import Storage from "../Storage/Storage";
import SimpleReactValidator from "simple-react-validator";
import { Loader } from "./Loader";
//ReactSession.setStoreType("localStorage");

const Step2 = () => {
  const [submitLike, setSubmitLike] = useState("");
  const [submitRating, setSubmitRating] = useState("");

  const [isLoading, setIsLoading] = useState(false)
  const [, forceUpdate] = useState("");
  const validator = useRef(
    new SimpleReactValidator({ autoForceUpdate: { forceUpdate: forceUpdate } })
  );

  const getData = Storage.get("emotion");
  const navigate = useNavigate();

  const submitHandler = () => {
    let data = {
      emotion: getData?.emotion,
      rating: submitRating,
      islike: submitLike,
      emotionFrom: getData?.emotionFrom,
      emotionBy: getData?.emotionBy,
      ipaddress: getData?.ipaddress,
    };

    const formValid = validator.current.allValid();

    if (formValid) {
      setIsLoading(true)
      authServices
        .submitResponseApi(data)
        .then((res) => {
          if (res.statusCode === 200) {
            setIsLoading(false)
            navigate("/chart")
            toast.success(res.result);
          } else {
            setIsLoading(false)
            toast.error(res.message, { position: "top-center" });
          }
        })
        .catch((Err) => {
          console.log(Err);
        });
    } else {
      validator.current.showMessages();
    }
  };

  return (
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
                              <input
                                type="radio"
                                onClick={() => setSubmitLike("like")}
                                name="like"
                                checked={submitLike === "like" ? true : false}
                              />
                              <span
                                style={{ "background-color": "lightgreen" }}
                              >
                                <img src="assets/img/like.png" />
                                {submitLike === "like" && "Like"}
                              </span>
                            </div>
                            <div className="check-box dislike">
                              <input
                                type="radio"
                                name="dislike"
                                onClick={() => setSubmitLike("dislike")}
                                checked={
                                  submitLike === "dislike" ? true : false
                                }
                              />
                              <span style={{ "background-color": "orange" }}>
                                <img src="assets/img/dislike.png" />
                                {submitLike === "dislike" && "Dislike"}
                              </span>
                            </div>
                          </div>
                          {validator.current.message(
                            "Likes",
                            submitLike,
                            "required",
                            { className: "text-danger bg-light text-center mt-3 d-inline-block" }
                          )}
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
                                <button
                                  name="1"
                                  onClick={() => setSubmitRating(1)}
                                  className="btn btn-scale btn-scale-desc-1"
                                >
                                  1
                                </button>
                                <button
                                  name="2"
                                  onClick={() => setSubmitRating(2)}
                                  className="btn btn-scale btn-scale-desc-2"
                                >
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
                                <button
                                  name="3"
                                  onClick={() => setSubmitRating(3)}
                                  className="btn btn-scale btn-scale-desc-3"
                                >
                                  3
                                </button>
                                <button
                                  name="4"
                                  onClick={() => setSubmitRating(4)}
                                  className="btn btn-scale btn-scale-desc-4"
                                >
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
                                <button
                                  name="5"
                                  onClick={() => setSubmitRating(5)}
                                  className="btn btn-scale btn-scale-desc-5"
                                >
                                  5
                                </button>
                                <button
                                  name="6"
                                  onClick={() => setSubmitRating(6)}
                                  className="btn btn-scale btn-scale-desc-6"
                                >
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
                                <button
                                  name="7"
                                  onClick={() => setSubmitRating(7)}
                                  className="btn btn-scale btn-scale-desc-7"
                                >
                                  7
                                </button>
                                <button
                                  name="8"
                                  onClick={() => setSubmitRating(8)}
                                  className="btn btn-scale btn-scale-desc-8"
                                >
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
                                <button
                                  name="9"
                                  onClick={() => setSubmitRating(9)}
                                  className="btn btn-scale btn-scale-desc-9"
                                >
                                  9
                                </button>
                                <button
                                  name="10"
                                  onClick={() => setSubmitRating(10)}
                                  className="btn btn-scale btn-scale-desc-10"
                                >
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
                          {validator.current.message(
                            "Rating",
                            submitRating,
                            "required",
                            { className: "text-danger text-center bg-light" }
                          )}
                          <p className="bg-light text-dark fw-bold text-center p-1 mt-2 d-inline-block">
                            Your given rating is - {submitRating}
                          </p>
                        </div>
                        <div className="lt-rt-btn">
                          <button className="btn btn-custom btn-step prev prev">
                            {/* <i className="fas fa-angle-left"></i> */}
                          </button>
                          <div style={{ "text-align": "end" }}>
                            <button
                              type="submit"
                              onClick={() => submitHandler()}
                              //onClick={() => navigate("/chart")}
                              className="btn btn-custom btn-step mx-0"
                            >
                              {/* <i className="fas fa-sign-in-alt mx-lg-1"></i>{" "} */}
                              Submit
                            </button>
                          </div>
                        </div>
                      </SwiperSlide>
                    </Swiper>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Loader show={isLoading} />
    </main>
  );
};

export default Step2;
