import React, { useEffect, useState, useRef } from "react";
import Plutchik from "@psychological-components/plutchik";
import "@psychological-components/plutchik/lib/theme-core.css";
import "./Step1.css";
import authServices from "../Services/authServices";
import { Navigate, useNavigate } from "react-router";
import Storage from "../Storage/Storage";
import publicIp from "public-ip";
import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";
import { Loader } from "./Loader";

const Step1 = () => {
  const navigate = useNavigate();
  const [, forceUpdate] = useState("");
  const validator = useRef(
    new SimpleReactValidator({ autoForceUpdate: { forceUpdate: forceUpdate } })
  );

  const [stepData, setStepData] = useState({
    labelone: "",
    labeltwo: "",
    wheel_data: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [ipAddress, setIpAddress] = useState();
  const [emotions, setEmotions] = useState();

  useEffect(() => {
    async function GetAddress() {
      return await publicIp.v4();
    }

    GetAddress().then((address) => {
      setIpAddress(address);
    });
  }, []);

  useEffect(() => {
    Plutchik({
      element: "#element",
      labels: [
        [
          "Acceptance",
          "Serinity",
          "Interest",
          "Annoyance",
          "Boredom",
          "Pensiveness",
          "Distraction",
          "Apprehension",
        ],
        [
          "Trust",
          "Joy",
          "Anticipation",
          "Anger",
          "Disgust",
          "Sadness",
          "Surprise",
          "Fear",
        ],
        [
          "Admiration",
          "Ecstasy",
          "Vigilance",
          "Rage",
          "Loathing",
          "Grief",
          "Amazement",
          "Terror",
        ],
        [
          "Submission",
          "Love",
          "Optimism",
          "Aggressiveness",
          "Contempt",
          "Emorse",
          "Disapproval",
          "Awe",
        ],
      ],
    });
  }, []);

  const emotionClick = () => {
    let data = document.querySelector("#element svg");
    let Anchors = data.getElementsByTagName("a");
    let value = "";
    for (var i = 0; i < Anchors.length; i++) {
      var str = Anchors[i].getAttribute("class");
      if (str.includes("active")) {
        value = Anchors[i].getAttribute("title");
      }
    }
    setEmotions(value);
  };

  function submitHandler(value) {
    const formValid = validator.current.allValid();
    if (formValid) {
      let postData = {
        emotion: emotions,
        ipaddress: ipAddress,
      };
      let data = {
        emotion: emotions,
        ipaddress: ipAddress,
        emotionFrom: stepData.labelone,
        emotionBy: stepData.labeltwo,
      };
      setIsLoading(true)
      authServices
        .checkResponseApi(postData)
        .then((res) => {
          if (res.statusCode === 200) {
            setIsLoading(false)
            navigate(`/step2?emotion=${value}`);
            Storage.set("emotion", data);
          } else {
            // toast.error(res.message, { position: "top-center" });
            setIsLoading(false)
            toast.error("Something Went Wrong", { position: "top-center" })
          }
        })
        .catch((Err) => {
          console.log(Err);
        });
    } else {
      validator.current.showMessages();
    }
  }

  return (
    <div>
      <main className="about">
        <section>
          <div className="container-md">
            <div className="lt-rt-btn">
              <div style={{ "text-align": "end" }}>
                <button
                  type="submit"
                  onClick={submitHandler}
                  //onClick={() => navigate("/chart")}
                  className="btn btn-custom btn-step mx-0"
                >
                  {/* <i className="fas fa-sign-in-alt mx-lg-1"></i>{" "} */}
                  Next
                </button>
              </div>
            </div>
            <div className="row justify-content-center align-items-center">
              <div className="col-md-3">
                <div className="customInput card shadow border">
                  <div className="form-group card-body">
                    <div className="d-flex align-items-center">
                      <i className="fa fa-bookmark text-primary me-3"></i>{" "}
                      <label>Emotion From</label>
                    </div>
                    <input
                      type="text"
                      name="emotionFrom"
                      className="form-control"
                      onChange={(e) =>
                        setStepData({
                          ...stepData,
                          labelone: e.target.value,
                        })
                      }
                    />

                    {validator.current.message(
                      "Emotion From",
                      stepData.labelone,
                      "required|alpha_space",
                      { className: "text-danger" }
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-6 text-center rounded mt-5">
                <div
                  id="element"
                  className="text-center m-auto"
                  onClick={() => emotionClick()}
                ></div>
                {validator.current.message("Emotion", emotions, "required", {
                  className:
                    "text-danger text-center bg-white p-2 mt-2 d-inline-block",
                })}
                <div className="mt-1 text-center title">
                  <h3
                    style={{ "font-size": "31px", color: "#201c6f" }}
                    className="mb-0"
                  >
                    Please click free to open up
                  </h3>
                </div>
              </div>
              <div className="col-md-3">
                <div className="customInput card shadow border">
                  <div className="form-group card-body">
                    <div className="d-flex align-items-center">
                      <i className="fa fa-bookmark text-primary me-3"></i>{" "}
                      <label>Emotion By</label>
                    </div>

                    <input
                      type="text"
                      name="emotionBy"
                      className="form-control"
                      onChange={(e) =>
                        setStepData({
                          ...stepData,
                          labeltwo: e.target.value,
                        })
                      }
                    />
                    {validator.current.message(
                      "Emotion By",
                      stepData.labeltwo,
                      "required|alpha_space",
                      { className: "text-danger" }
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Loader 
      show={isLoading}
      />
    </div>
  );
};
export default Step1;
