import React, { useEffect, useState, useRef } from "react";
import Plutchik from "@psychological-components/plutchik";
import "@psychological-components/plutchik/lib/theme-core.css";
import authServices from "../Services/authServices";
import { Navigate, useNavigate } from "react-router";
import Storage from "../Storage/Storage";
import publicIp from "public-ip";
import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";
import { Loader } from "./Loader";
import { EmotionArray } from "./WheelofEmotion/EmotionArray";

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
  const [emotionList, setEmotionList] = useState(EmotionArray)
  // const [isDisabled, setIsDisabled] = useState(true)

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

  const emotionClick = (value, id) => {



    // let data = document.querySelector("#element svg");
    // let Anchors = data.getElementsByTagName("a");
    // let value = "";
    // for (var i = 0; i < Anchors.length; i++) {
    //   var str = Anchors[i].getAttribute("class");
    //   if (str.includes("active")) {
    //     value = Anchors[i].getAttribute("title");
    //   }
    // }
    setEmotions(value);
  };

  console.log("emotions -----> ", emotions);

  // const emotionClick = () => {
  //   let data = document.querySelector("#element svg");
  //   let el = data.getElementsByTagName("a");
  //   // console.log("el ---> ", el);
  //   let value = "";
  //   for (let i = 0; i < el.length; i++) {
  //     var c = 0;

  //     var str = el[i].getAttribute("class");
  //     if (str.includes("active")) {
  //       value = el[i].getAttribute("title");
  //       while (c < el.length) {
  //         // alert("hello")
  //         // el[c++].className = "slide";
  //         el[c++].classList.add("customactive");
  //         // value = el[c++].getAttribute("title");
  //       }
  //       // el[i].className = "slide active";
  //       el[i].classList.remove("customactive");
  //     }
  //   }
  //   console.log("value", value)
  // };

  const formValid = validator.current.allValid();

  function submitHandler() {
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

  const textPath = `<textPath xlink:href="#p-0-0" startoffset="50%">
  Acceptance
</textPath>`;

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

            <div className="row justify-content-center align-items-center">
              <div className="col-md-6">
                <div
                  class="plutchik-instance"
                  style={{ width: "75%", height: "50%", margin: "auto" }}
                >
                  <svg
                    class="plutchik"
                    version="1.1"
                    viewBox="0 0 500 500"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    {EmotionArray.map((item, key) => {
                      return (
                        <a
                        key={key}
                          href="javascript:;"
                          class={item.createclass}
                          title={item.title}
                        onClick={()=>emotionClick(item.title, key)}
                        >
                          <path d={item.svgpath}></path>
                          <text
                            dangerouslySetInnerHTML={{ __html: item.textpath }}
                          >
                            {/* <textPath startoffset="50%">Acceptance</textPath> */}
                          </text>
                        </a>
                      );
                    })}
                  </svg>
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

// const emotionClick = () => {
//   let data = document.querySelector("#element svg");
//   let Anchors = data.getElementsByTagName("a");
//   let value = "";
//   for (var i = 0; i < Anchors.length; i++) {
//     var str = Anchors[i].getAttribute("class");
//     if (str.includes("active")) {
//       console.log(str);
//       value = Anchors[i].getAttribute("title");
//      Anchors[i].classList.add("customactive");
//     }else{
//       Anchors[i].classList.remove("customactive");
//     }
//   }
//   // Anchors.classList.add("customactive" + value);
//   setEmotions(value);
// };

//const emotionClick = () => {
// alert("hello");
// let data = document.querySelector("#element svg");
// let Anchors = data.getElementsByTagName("a");
// let value = "";
// let blank_array = [];
// let activevalue = "";
// let str = [];
// for (var i = 0; i < Anchors.length; i++) {
//   str.push(Anchors[i].getAttribute("class"));
//   blank_array.push(Anchors[i].getAttribute("title"));

// if (str.includes("active")) {
//   activevalue = Anchors[i].getAttribute("title");
// }
// console.log("activevalue", activevalue);

// strarray.filter((item, ind)=>{
//   console.log("strarray[ind]", strarray[ind]);
//   extract = strarray[ind].slice(7);
//   if(item.includes(extract)){
//     activevalue = Anchors[i].getAttribute("title")
//   }
// })

// for (let item in strarray){
//   var extract = strarray[item].slice(7);
//   if(item.includes(extract)){
//     activevalue = Anchors[i].getAttribute("title")
//   }
// }
// }

// console.log("str ---> ", str);
// console.log("Anchors.length", Anchors.length);

// str &&
//   str.length > 0 &&
//   str.map((val, ind) => {
//     if (val.includes("active")) {
//       activevalue = Anchors[ind].getAttribute("title");
//       if (blank_array[ind] === activevalue) {
//         Anchors[ind].classList.add("customactive");
//       } else {
//         Anchors[ind].classList.remove("customactive");
//       }
//     }
//   });

//   console.log("activevalue", activevalue)

// blank_array &&
//   blank_array.length > 0 &&
//   blank_array.filter((item, i) => {
//     if (activevalue.includes(item)) {
//       value = activevalue;
//       Anchors[i].classList.add("customactive");
//     } else {
//       Anchors[i].classList.remove("customactive");
//     }
//   });
// console.log("str ---> ", str)
// console.log("value ---> ", value)
// console.log("activevalue", activevalue)
// console.log("blank_array", blank_array)
// Anchors.classList.add("customactive" + value);
// setEmotions(value);
//};
