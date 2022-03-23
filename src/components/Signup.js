import React, { Fragment, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import authServices from "../Services/authServices";
import SimpleReactValidator from "simple-react-validator";
import Storage from "../Storage/Storage";
import { Loader } from "./Loader";

const passwordValidator = new RegExp(
  /^(?=.\d)(?=.[a-z])(?=.[A-Z])[0-9a-zA-Z]{8,}$/
); ///^(?=.?[A-Z])(?=.?[a-z])(?=.?[0-9])(?=.?[^\w\s]).{8,}$/;

const Signup = () => {
  const navigate = useNavigate();

  const [, forceUpdate] = useState("");
  const validator = useRef(
    new SimpleReactValidator({ autoForceUpdate: { forceUpdate: forceUpdate } })
  );

  const [formValues, setFormValues] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    agegroup: "",
    gender: "",
    religion: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errPassword, SetErrPassword] = useState(false);
  const [termsCondition, setTermsCondition] = useState();

  const handleChange = (e) => {
    // new RegExp ('/^(?=.?[A-Z])(?=.?[a-z])(?=.?[0-9])(?=.?[^\w\s]).{8,}$/')
    const { name, value } = e.target;
    var reg = new RegExp("^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$");
    var test = reg.test(value);
    if (name === "password") {
      if (value.trim === "") {
        SetErrPassword("The Password is required");
      } else if (!test) {
        SetErrPassword(
          "Password must contain at least 8 characters with number, capital, small and special character"
        );
      } else {
        SetErrPassword(true);
      }
    }
    setFormValues({ ...formValues, [name]: value });
  };

  const formValid = validator.current.allValid();
  const submitHandler = (e) => {
    e.preventDefault();

    if (formValid && errPassword === true) {
      let postData = {
        firstname: formValues.fname,
        lastname: formValues.lname,
        email: formValues.email,
        password: formValues.password,
        city: formValues.city,
        state: formValues.state,
        zip: formValues.zip,
        country: formValues.country,
        agegroup: formValues.agegroup,
        gender: formValues.gender,
        religion: formValues.religion,
      };

      setIsLoading(true);
      authServices
        .registrationApi(postData)
        .then((res) => {
          if (res.statusCode === 200) {
            setIsLoading(false);
            Storage.set("token", res.result);
            toast.success("Signup Successfully. Ridirecting to Login", {
              position: "top-center",
            });
            window.location.href = "/";
          } else {
            setIsLoading(false);
            toast.error(res.message, { position: "top-center" });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      validator.current.showMessages();
    }
  };

  return (
    <div className="contact">
      <section className="signup_Sec">
        <div>
          <div className="container h-100 ">
            <h1 className="text-center">
              <span id="default-title">Create Account</span>
            </h1>
            <div
              style={{
                color: "#201c6f",
                "text-align": "center",
              }}
            >
              Already have an account? <Link to="/login">Login</Link>
            </div>
            <div className="row justify-content-center h-100 align-items-center ">
              <div className="col-lg-8 col-md-9 shadow-lg rounded bg-pink">
                <div className=" bg-white right-area rounded p-4">
                  <form onSubmit={(e) => submitHandler(e)}>
                    <div className="row">
                      <div className="form-group col-md-6 mb-3">
                        <input
                          type="text"
                          name="fname"
                          style={{
                            border: "none",
                            "border-bottom": "2px solid #ddd",
                            "border-radius": "0",
                            "padding-left": "35px",
                          }}
                          className="form-control form-control-user inputclassName"
                          placeholder="First Name"
                          onChange={(e) => handleChange(e)}
                        />
                        <i
                          style={{
                            position: "absolute",
                            top: "29%",
                            left: "5px",
                            "font-size": "17px",
                            color: "#101d6b",
                          }}
                          className="fas fa-address-book common"
                        ></i>
                        {validator.current.message(
                          "First Name",
                          formValues.fname,
                          "required|alpha",
                          { className: "text-danger" }
                        )}
                      </div>

                      <div className="form-group col-md-6 mb-3">
                        <input
                          type="text"
                          name="lname"
                          style={{
                            border: "none",
                            "border-bottom": "2px solid #ddd",
                            "border-radius": "0",
                            "padding-left": "35px",
                          }}
                          className="form-control form-control-user inputclassName"
                          placeholder="Last Name"
                          onChange={(e) => handleChange(e)}
                        />
                        <i
                          style={{
                            position: "absolute",
                            top: "29%",
                            left: "5px",
                            "font-size": "17px",
                            color: "#101d6b",
                          }}
                          className="fas fa-address-book common"
                        ></i>
                        {validator.current.message(
                          "Last Name",
                          formValues.lname,
                          "required|alpha",
                          { className: "text-danger" }
                        )}
                      </div>

                      <div className="form-group col-md-6 mb-3">
                        <input
                          type="email"
                          name="email"
                          style={{
                            border: "none",
                            "border-bottom": "2px solid #ddd",
                            "border-radius": "0",
                            "padding-left": "35px",
                          }}
                          className="form-control form-control-user inputclassName"
                          placeholder="Email"
                          value={formValues.email}
                          onChange={(e) => handleChange(e)}
                        />
                        <i
                          style={{
                            position: "absolute",
                            top: "29%",
                            left: "5px",
                            "font-size": "17px",
                            color: "#101d6b",
                          }}
                          className="fa fa-envelope common"
                        ></i>
                        {validator.current.message(
                          "Email",
                          formValues.email,
                          "required|email",
                          { className: "text-danger" }
                        )}
                      </div>

                      <div className="form-group col-md-6 mb-3">
                        <input
                          type="password"
                          name="password"
                          style={{
                            border: "none",
                            "border-bottom": "2px solid #ddd",
                            "border-radius": "0",
                            "padding-left": "35px",
                          }}
                          className="form-control form-control-user inputclassName"
                          placeholder="Password"
                          value={formValues.password}
                          onChange={(e) => handleChange(e)}
                        />
                        <i
                          style={{
                            position: "absolute",
                            top: "29%",
                            left: "5px",
                            "font-size": "17px",
                            color: "#101d6b",
                          }}
                          className="fa fa-unlock-alt common"
                        ></i>
                        {/* {validator.current.message(
                          "Password",
                          formValues.password,
                          "required",
                          { className: "text-danger" }
                        )} */}
                        <small className="text-danger">{errPassword}</small>
                      </div>

                      <div className="form-group col-md-6 mb-3">
                        <select
                          style={{
                            "border-top": "none",
                            "border-right": "none",
                            "border-bottom": "2px solid rgb(221, 221, 221)",
                            "border-left": "none",
                            "border-image": "initial",
                            "border-radius": "0px",
                            "padding-left": "35px",
                          }}
                          class="form-control form-control-user inputclassName"
                          name="agegroup"
                          id="cars"
                          onChange={(e) => handleChange(e)}
                        >
                          <option value="" selected disabled>
                            --Select Age Group--
                          </option>
                          <option value="0-18">0-18</option>
                          <option value="19-40">19-40</option>
                          <option value="41-60">41-60</option>
                          <option value="Above 60">Above 60</option>
                        </select>

                        <i
                          style={{
                            position: "absolute",
                            top: "29%",
                            left: "5px",
                            "font-size": "17px",
                            color: "#101d6b",
                          }}
                          className="fa fa-child common"
                        ></i>
                        {validator.current.message(
                          "Age Group",
                          formValues.agegroup,
                          "required",
                          { className: "text-danger" }
                        )}
                      </div>

                      <div className="form-group col-md-6 mb-3">
                        <select
                          onChange={(e) => handleChange(e)}
                          style={{
                            "border-top": "none",
                            "border-right": "none",
                            "border-bottom": "2px solid rgb(221, 221, 221)",
                            "border-left": "none",
                            "border-image": "initial",
                            "border-radius": "0px",
                            "padding-left": "35px",
                          }}
                          class="form-control form-control-user inputclassName"
                          name="gender"
                          id="cars"
                        >
                          <option value="" selected disabled>
                            --Select Gender--
                          </option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Transgender">Transgender</option>
                        </select>

                        <i
                          style={{
                            position: "absolute",
                            top: "29%",
                            left: "5px",
                            "font-size": "17px",
                            color: "#101d6b",
                          }}
                          className="fa fa-user common"
                        ></i>
                        {validator.current.message(
                          "Gender",
                          formValues.gender,
                          "required",
                          { className: "text-danger" }
                        )}
                      </div>

                      <div className="form-group col-md-6 mb-3">
                        <select
                          onChange={(e) => handleChange(e)}
                          style={{
                            "border-top": "none",
                            "border-right": "none",
                            "border-bottom": "2px solid rgb(221, 221, 221)",
                            "border-left": "none",
                            "border-image": "initial",
                            "border-radius": "0px",
                            "padding-left": "35px",
                          }}
                          class="form-control form-control-user inputclassName"
                          name="religion"
                          id="cars"
                        >
                          <option value="" selected disabled>
                            --Select Religion--
                          </option>
                          <option value="Hindu">Hindu</option>
                          <option value="Muslim">Muslim</option>
                          <option value="Sikh">Sikh</option>
                          <option value="Issai">Issai</option>
                        </select>

                        <i
                          style={{
                            position: "absolute",
                            top: "29%",
                            left: "5px",
                            "font-size": "17px",
                            color: "#101d6b",
                          }}
                          class="fa fa-plus common"
                          aria-hidden="true"
                        ></i>
                        {validator.current.message(
                          "religion",
                          formValues.religion,
                          "required",
                          { className: "text-danger" }
                        )}
                      </div>
                      <div className="form-group col-md-6 mb-3">
                        <input
                          type="text"
                          name="city"
                          style={{
                            border: "none",
                            "border-bottom": "2px solid #ddd",
                            "border-radius": "0",
                            "padding-left": "35px",
                          }}
                          className="form-control form-control-user inputclassName"
                          placeholder="City"
                          value={formValues.city}
                          onChange={(e) => handleChange(e)}
                        />
                        <i
                          style={{
                            position: "absolute",
                            top: "29%",
                            left: "5px",
                            "font-size": "17px",
                            color: "#101d6b",
                          }}
                          className="fas fa-city common"
                        ></i>
                        {validator.current.message(
                          "City",
                          formValues.city,
                          "required|alpha_space",
                          { className: "text-danger" }
                        )}
                      </div>

                      <div className="form-group col-md-4 mb-3">
                        <input
                          type="text"
                          name="state"
                          style={{
                            border: "none",
                            "border-bottom": "2px solid #ddd",
                            "border-radius": "0",
                            "padding-left": "35px",
                          }}
                          className="form-control form-control-user inputclassName"
                          placeholder="State"
                          value={formValues.state}
                          onChange={(e) => handleChange(e)}
                        />
                        <i
                          style={{
                            position: "absolute",
                            top: "29%",
                            left: "5px",
                            "font-size": "17px",
                            color: "#101d6b",
                          }}
                          className="fas fa-city common"
                        ></i>
                        {validator.current.message(
                          "State",
                          formValues.state,
                          "required|alpha_space",
                          { className: "text-danger" }
                        )}
                      </div>

                      <div className="form-group col-md-4 mb-3">
                        <input
                          type="text"
                          name="country"
                          style={{
                            border: "none",
                            "border-bottom": "2px solid #ddd",
                            "border-radius": "0",
                            "padding-left": "35px",
                          }}
                          className="form-control form-control-user inputclassName"
                          placeholder="Country"
                          onChange={(e) => handleChange(e)}
                        />
                        <i
                          style={{
                            position: "absolute",
                            top: "29%",
                            left: "5px",
                            "font-size": "17px",
                            color: "#101d6b",
                          }}
                          className="fas fa-globe common"
                        ></i>
                        {validator.current.message(
                          "Country",
                          formValues.country,
                          "required|alpha_space",
                          { className: "text-danger" }
                        )}
                      </div>

                      <div className="form-group col-md-4 mb-3">
                        <input
                          type="text"
                          name="zip"
                          style={{
                            border: "none",
                            "border-bottom": "2px solid #ddd",
                            "border-radius": "0",
                            "padding-left": "35px",
                          }}
                          className="form-control form-control-user inputclassName"
                          placeholder="Zip"
                          value={formValues.zip}
                          onChange={(e) => handleChange(e)}
                        />
                        <i
                          style={{
                            position: "absolute",
                            top: "29%",
                            left: "5px",
                            "font-size": "17px",
                            color: "#101d6b",
                          }}
                          className="fas fa-map-pin common"
                        ></i>
                        {validator.current.message(
                          "City",
                          formValues.zip,
                          "required|alpha_num",
                          { className: "text-danger" }
                        )}
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="gridCheck"
                          onClick={() => setTermsCondition("checked")}
                        />
                        <label className="form-check-label" for="gridCheck">
                          I agree to terms and services.
                        </label>
                      </div>
                      {validator.current.message(
                        "Terms & service",
                        termsCondition,
                        "required",
                        { className: "text-danger" }
                      )}
                    </div>
                    <div
                      className="form-group"
                      style={{ "text-align": "center" }}
                    >
                      <button
                        type="submit"
                        className="btn btn-custom btn-step mx-0"
                        // onClick={submitHandler}
                        disabled={!formValid}
                      >
                        <i className="fas fa-save mx-lg-1"></i> Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Loader show={isLoading} />
    </div>
  );
};

export default Signup;

// const response = await fetch("http://localhost:4000/api/v1/user/signup",{
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     firstname: formValues.fname,
//     lastname: formValues.lname,
//     email: formValues.email,
//     password: formValues.password,
//     addressone: formValues.address,
//     addresstwo: formValues.address2,
//     city: formValues.city,
//     state: formValues.state,
//     zip: formValues.zip,
//     country : formValues.country
//   })
// });
// const responseData = await response.json();
// if (responseData.success && responseData.statusCode === 200) {
//   toast.success("Signup Successfully. Ridirecting to Login",{position: toast.POSITION.TOP_CENTER})
//   setFname("");
//   setLname("");
//   setEmail("");
//   setPassword("");
//   setAddress("");
//   setAddress2("");
//   setCity("");
//   setState("");
//   setZip("");
//   setCountry("");
//   setTimeout(() => {
//     window.location.href = "/login";
//   }, 2000);
// }else{
//   toast.error(responseData.message,{position: toast.POSITION.TOP_CENTER})
// }
