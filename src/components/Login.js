import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

  import 'react-toastify/dist/ReactToastify.css';
   
toast.configure()
//import ReactSession from 'react-client-session';
//ReactSession.setStoreType("localStorage");

const Login = () => {
  // const [email, setEmail] = useState("");
  // const [pass, setPass] = useState("");

  const navigate = useNavigate();

  const initialValues = { email: "", pass: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({email: "", pass: "" });
  const [isSubmit, setIsSubmit] = useState(false);
  
 // const [validData, setValidData] = useState({validUserName : "" , validPassword : ""})
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };

  const handleValidation = (e) => {
    const { name, value } = e.target;
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if(name === 'email'){
      if (!value) {
        setFormErrors({ ...formErrors, [name]: "email is required" });
      } else if (!regex.test(value)) {
        setFormErrors({ ...formErrors, [name]: "This is not a valid format" });
      }else{
        setFormErrors({...formErrors, [name]: "" });
       // setValidData({...validData, "validUserName" : value});
        setEmail(e.target.value);
        //this.validUserName = value;
      }
    }else if(name === 'pass'){
      if (!value) {
        setFormErrors({ ...formErrors, [name]: "password is required" });
      }else{
        setFormErrors({...formErrors, [name]: "" });
       // setValidData({...validData, "validPassword" : value});
        setPassword(e.target.value);
      }
    }
    console.log(formValues);
  };




  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      errors.email = "email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format";
    }

    if (!values.pass) {
      errors.pass = "password is required";
    } else if (values.pass.length < 4) {
      errors.pass = "Password must be more than 4 characters";
    } else if (values.pass.length > 10) {
      errors.pass = "password cannot exceeded more than 20 characters";
    } 

    return errors;
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    console.log(email);
    console.log(password);
    const response = await fetch("http://localhost:4000/api/v1/user/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const responseData = await response.json();
    if (responseData.success && responseData.statusCode === 200) {
      toast.success("Login Successfully",{position: toast.POSITION.TOP_CENTER})
      window.sessionStorage.setItem("token", responseData.result.token);
      ///ReactSession.set("token", responseData.result.token);
      window.location.href = '/';
       // navigate("/");
    }else{
      toast.error(responseData.message,{position: toast.POSITION.TOP_CENTER})
    }
  };

  return (
    <Fragment>
      <body
        style={{
          "background-image": "url(./assets/img/5n.jpg)",
          height: "100%",
        }}
      >
        <header>
        
          <div className="container">
            <nav className="navbar navbar-expand-lg">
              <div className="container-fluid">
                <a className="navbar-brand" href="index.html">
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
                    className="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll"
                    style={{ "--bs-scroll-height": "100px" }}
                  >
                    <li className="nav-item">
                      <Link
                        to="/login"
                        className="btn btn-outline-light px-4 rounded-pill active"
                      >
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/signup"
                        className="btn btn-outline-light px-4 rounded-pill"
                      >
                        Signup
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </header>
        <div className="contact">
          
<ToastContainer/>
          <section>
            <div>
              <div
                className="container h-100 "
                style={{ left: "0", right: "0", margin: "auto", top: "0" }}
              >
                {/* Outer Row */}
                <div
                  className="row justify-content-center h-100 align-items-center "
                  style={{ "margin-top": "10%" }}
                >
                  <div className="col-lg-8 col-md-9 shadow-lg rounded bg-pink">
                    <div className="row">
                      <div className="col-sm-6  text-center m-auto p-4">
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

                          {Object.keys(formErrors).length === 0 && isSubmit ? (
                            <div style={{ "text-align": "center" }}>
                              
                            </div>
                          ) : (
                            <div style={{ "text-align": "center" }}>
                              
                            </div>
                          )}

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
                                onChange={handleChange}
                                onBlur = {handleValidation}
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
                              <p style={{ color: "red" }}>{formErrors.email}</p>
                            </div>
                            <div className="form-group mt-4 mb-4">
                              <input
                                type="password"
                                name="pass"
                                style={{
                                  border: "none",
                                  "border-bottom": "2px solid #ddd",
                                  "border-radius": "0",
                                  "padding-left": "35px",
                                }}
                                className="form-control form-control-user inputclassName"
                                id="exampleInputPassword"
                                placeholder="Password"
                                value={formValues.pass}
                                onChange={handleChange}
                                onBlur = {handleValidation}
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
                              <p style={{ color: "red" }}>{formErrors.pass}</p>
                            </div>

                            <div className="d-flex align-items-center justify-content-between mb-3">
                              <div className="form-check form-check-flat form-check-primary ">
                                <label className="form-check-label">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                  />
                                  Remember
                                  <i className="input-helper"></i>
                                </label>
                              </div>
                              <a className="small" href="forgot-password.html">
                                Forgot Password?
                              </a>
                            </div>
                            <div className="d-flex align-items-center justify-content-between mb-0">
                              
                             
                              <button
                                type="button"
                                className="btn btn-custom btn-step mx-0"
                                disabled={!email || !password}
                                onClick={submitHandler}
                              >
                                <i className="fas fa-sign-in-alt mx-lg-1"></i>
                                Login
                              </button>
                              <ToastContainer />

                              <a className="small">Sign up?</a>
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
        </div>
      </body>
    </Fragment>
  );
};

export default Login;
