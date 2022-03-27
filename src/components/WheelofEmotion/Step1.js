import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import publicIp from "public-ip";
import Plutchik from "@psychological-components/plutchik";
import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";
import { EmotionArray } from "./EmotionArray";
import authServices from "../../Services/authServices";
import "@psychological-components/plutchik/lib/theme-core.css";
import Storage from "../../Storage/Storage";
import { Loader } from "../Loader";

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
  const [emotionList, setEmotionList] = useState(EmotionArray);
  // const [isDisabled, setIsDisabled] = useState(true)

  //   console.log("EmotionArray", EmotionArray)

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

  const emotionClick = (id) => {
    let array = [...emotionList];
    array.find((item, i) => {
      if (i === id) {
        item["active"] = true;
        setEmotions(item.title);
      } else {
        item["active"] = false;
      }
    });
    setEmotionList(array);
  };

  const formValid = validator.current.allValid();

  function submitHandler() {
    if (formValid) {
      let titlevalue = "";
      emotionList.find((item) => {
        if (item.active === true) return (titlevalue = item.title);
      });
      let postData = {
        emotion: titlevalue,
        ipaddress: ipAddress,
      };
      let data = {
        emotion: titlevalue,
        ipaddress: ipAddress,
        emotionFrom: stepData.labelone,
        emotionBy: stepData.labeltwo,
      };
      setIsLoading(true);
      authServices
        .checkResponseApi(postData)
        .then((res) => {
          if (res.statusCode === 200) {
            setIsLoading(false);
            navigate(`/step2?emotion=${emotions}`);
            Storage.set("emotion", data);
          } else if (
            res.statusCode === 401 ||
            res.statusCode === 403 ||
            res.statusCode === 409
          ) {
            toast.error(res.message, { position: "top-center" });
            setIsLoading(false);
          } else {
            toast.error("Something Went Wrong", { position: "top-center" });
            setIsLoading(false);
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
                  disabled={!formValid}
                >
                  {/* <i className="fas fa-sign-in-alt mx-lg-1"></i>{" "} */}
                  Next
                </button>
              </div>
            </div>
           <div className="customizable">
           <div className="row justify-content-center align-items-center">
              <div className="col-xs-3 col-md-3">
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
              <div className="col-xs-6 col-md-6">
                <div
                  style={{ display: "none" }}
                  id="element"
                  className="text-center m-auto"
                ></div>

                <div
                  class="plutchik-instance"
                >
                  <svg
                    class="plutchik"
                    version="1.1"
                    viewBox="0 0 500 500"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    {emotionList &&
                      emotionList.length > 0 &&
                      emotionList.map((item, key) => {
                        return (
                          <a
                            key={key}
                            href="javascript:void(0)"
                            className={
                              item.active
                                ? `${item.createclass} active`
                                : item.createclass
                            }
                            title={item.title}
                            onClick={() => emotionClick(key)}
                          >
                            <path d={item.svgpath}></path>
                            <text
                              dangerouslySetInnerHTML={{
                                __html: item.textpath,
                              }}
                            >
                              {/* <textPath startoffset="50%">Acceptance</textPath> */}
                            </text>
                          </a>
                        );
                      })}
                  </svg>
                  {validator.current.message(
                      "Emotion",
                      emotions,
                      "required",
                      { className: "text-danger" }
                    )}
                </div>
              </div>
              <div className="col-xs-3 col-md-3">
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
          </div>
        </section>
      </main>
      <Loader show={isLoading} />
    </div>
  );
};
export default Step1;
