import React, { Fragment, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {  toast } from "react-toastify";
import authServices from "../Services/authServices";
import Storage from "../Storage/Storage";
import SimpleReactValidator from "simple-react-validator";
import { Loader } from "./Loader";

toast.configure();

const Login = () => {
  const navigate = useNavigate();

  const [, forceUpdate] = useState("");
  const validator = useRef(
    new SimpleReactValidator({ autoForceUpdate: { forceUpdate: forceUpdate } })
  );

  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [errPassword, SetErrPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    var reg =  new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$'); 
    var test = reg.test(value);
    if(name === "password"){
      if (value.trim === "") {
        SetErrPassword("The Password is required")
      }else if (!test) {
        SetErrPassword("Password must contain at least 8 characters with number, capital, small and special character")
      }else{
        SetErrPassword(true);
      }  		
    }
    setFormValues({ ...formValues, [name]: value });
  };

  const formValid = validator.current.allValid();
  const submitHandler = async (event) => {
    event.preventDefault();
   

    if (formValid && errPassword === true) {
      let postData = {
        email: formValues.email,
        password: formValues.password,
      };
      setIsLoading(true)
      authServices
        .loginApi(postData)
        .then((res) => {
          if (res.statusCode === 200) {
            setIsLoading(false)
            toast.success("Login Successfully", { position: "top-center" });
            Storage.set("token", JSON.stringify(res.result));
            // window.location.href = "/"
            // navigate("/")
            navigate("/");
            window.location.reload(true);
          } else {
            setIsLoading(false)
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
      <section className="login_Sec">
        <div>
          <div
            className="container h-100 "
            style={{ left: "0", right: "0", margin: "auto", top: "0" }}
          >
            {/* Outer Row */}
            <div className="row justify-content-center h-100 align-items-center ">
              <div className="col-lg-8 col-md-9 shadow-lg rounded bg-pink">
                <div className="row">
                  <div className="col-sm-6  text-center m-auto">
                    <div className="p-3">
                      <a className="navbar-brand" href="index.html">
                        <img
                          src="assets/img/logo.png"
                          className="logo img-fluid"
                          alt="Logo"
                        />
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-6 bg-white right-area rounded p-4">
                    <div className="pt-4 pb-4 pr-3 pl-2">
                      <h3>Login</h3>

                      <form className="user">
                        <div className="form-group">
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
                            id="exampleInputEmail"
                            aria-describedby="emailHelp"
                            placeholder="Email Address"
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
                            className="far fa-envelope common"
                          ></i>
                         <small>
                         {validator.current.message(
                            "email",
                            formValues.email,
                            "required|email",
                            { className: "text-danger" }
                          )}
                         </small>
                        </div>
                        <div className="form-group mt-4 mb-4">
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
                            id="exampleInputPassword"
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
                            "password",
                            formValues.password,
                            "required",
                            { className: "text-danger" }
                          )} */}
                          <p className="text-danger"><small>{errPassword}</small></p>
                        </div>

                        <div className="d-flex align-items-center justify-content-end mb-3">
                         
                          <Link className="small" to="/forget-password">
                            Forgot Password?
                          </Link>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mb-0">
                          <button
                            type="button"
                            className="btn btn-custom btn-step mx-0"
                            disabled={!formValid}
                            onClick={submitHandler}
                          >
                            <i className="fas fa-sign-in-alt mx-lg-1"></i>
                            Login
                          </button>

                          <Link to="/signup" className="small">Sign up?</Link>
                        </div>
                      </form>
                    </div>
                  </div>
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

export default Login;