import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const navigate = useNavigate();

  const initialValues = { fname: "", lname: "", email: "", password: "", address: "", address2: "", city: "", state: "", zip: "" , country : "",agegroup : "", gender : "", religion : ""};
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [agegroup, setAgegroup] = useState("");
  const [gender, setGender] = useState("");
  const [religion, setReligion] = useState("");

  useEffect(() => {
    console.log(formErrors);
    if(Object.keys(formErrors).length === 0 && isSubmit){
      console.log(formValues);
    }
  }, [formErrors])

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormValues({...formValues, [name]: value});
    console.log(formValues);
  };

  const handleValidation = (e) => {
    console.log('handleValidation');
    const { name, value } = e.target;
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const nameRegex = /^[A-Za-z]+$/;
    if(name === 'fname'){
      if (!value) {
        setFormErrors({ ...formErrors, [name]: "first name is required" });
      } else if (!nameRegex.test(value)) {
        setFormErrors({ ...formErrors, [name]: "This is not a valid format" });
      }else{
        setFormErrors({...formErrors, [name]: "" });
       // setValidData({...validData, "validUserName" : value});
       setFname(e.target.value);
        //this.validUserName = value;
      }
    }else if(name === 'lname'){
      if (!value) {
        setFormErrors({ ...formErrors, [name]: "last name is required" });
      }else if (!nameRegex.test(value)) {
        setFormErrors({ ...formErrors, [name]: "This is not a valid format" });
      }else{
        setFormErrors({...formErrors, [name]: "" });
       // setValidData({...validData, "validUserName" : value});
       setLname(e.target.value);
        //this.validUserName = value;
      }
    }else if(name === 'email'){
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
    }else if(name === 'password'){
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

  

  const submitHandler = async (event) => {
    alert('fire');
    event.preventDefault();
    //setFormErrors(validate(formValues));
    setIsSubmit(true);

    console.log(formValues.fname);
    console.log(formValues.lname);
    console.log(formValues.email);
    console.log(formValues.password);
        
    const response = await fetch("http://localhost:4000/api/v1/user/signup",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: formValues.fname,
        lastname: formValues.lname,
        email: formValues.email,
        password: formValues.password,
        addressone: formValues.address,
        addresstwo: formValues.address2,
        city: formValues.city,
        state: formValues.state,
        zip: formValues.zip,
        country : formValues.country
      })
    });
    const responseData = await response.json();
    if (responseData.success && responseData.statusCode === 200) {
      toast.success("Signup Successfully. Ridirecting to Login",{position: toast.POSITION.TOP_CENTER})
      setFname("");
      setLname("");
      setEmail("");
      setPassword("");
      setAddress("");
      setAddress2("");
      setCity("");
      setState("");
      setZip("");
      setCountry("");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    }else{
      toast.error(responseData.message,{position: toast.POSITION.TOP_CENTER})
    }
  };

  return (
    <Fragment>
      <body style={{ "background-image": "url(./assets/img/5n.jpg)", "height": "100%" }}>
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
                        className="btn btn-outline-light px-4 rounded-pill"
                        href="login"
                      >
                        Login
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
                style={{ "left": "0", "right": "0", "margin": "auto", "top": "0" }}
              >
                <h1
                  style={{
                    "padding-left": "16%",
                    "padding-right": "16%",
                    "padding-top": "5%",
                    "color": "#201c6f",
                    "text-align": "center",
                  }}
                >
                  <span id="default-title">Create Account</span>
                </h1>
                <div
                  style={{
                    "padding-left": "16%",
                    "padding-right": "16%",
                    "padding-bottom": "1%",
                    "color": "#201c6f",
                    "text-align": "center",
                  }}
                >
                  Already have an account? <a href="/login">Login</a>
                </div>
                <div className="row justify-content-center h-100 align-items-center ">
                  <div
                    className="col-lg-8 col-md-9 shadow-lg rounded bg-pink"
                    style={{ "margin-bottom": "10%" }}
                  >
                    <div className=" bg-white right-area rounded p-4">
                  
                    {Object.keys(formErrors).length === 0 && isSubmit ? (
                      <div style={{"text-align": "center"}}>Sign in successfully ..</div>
                    ) : (<div style={{"text-align": "center"}}></div>)}

                      <form>
                        <div className="row">
                          <div className="form-group col-md-6 mb-3">
                            <input
                              type="text"
                              name="fname"
                              value = {fname}
                              style={{
                                "border": "none",
                                "border-bottom": "2px solid #ddd",
                                "border-radius": "0",
                                "padding-left": "35px",
                              }}
                              className="form-control form-control-user inputclassName"
                              placeholder="First Name"
                              onChange={handleChange}
                              onBlur = {handleValidation}
                            />
                            <i
                              style={{
                                "position": "absolute",
                                "top": "29%",
                                "left": "5px",
                                "font-size": "17px",
                                "color": "#101d6b",
                              }}
                              className="fas fa-address-book common"
                            ></i>
                            <p style={{color: "red"}}>{formErrors.fname}</p>
                          </div>
                          
                          <div className="form-group col-md-6 mb-3">
                            <input
                              type="text"
                              name="lname"
                              style={{
                                "border": "none",
                                "border-bottom": "2px solid #ddd",
                                "border-radius": "0",
                                "padding-left": "35px",
                              }}
                              className="form-control form-control-user inputclassName"
                              placeholder="Last Name"
                              onChange={handleChange}
                              onBlur = {handleValidation}
                            />
                            <i
                              style={{
                                "position": "absolute",
                                "top": "29%",
                                "left": "5px",
                                "font-size": "17px",
                                "color": "#101d6b",
                              }}
                              className="fas fa-address-book common"
                            ></i>
                            <p style={{color: "red"}}>{formErrors.lname}</p>
                          </div>
                          
                          <div className="form-group col-md-6 mb-3">
                            <input
                              type="email"
                              name="email"
                              style={{
                                "border": "none",
                                "border-bottom": "2px solid #ddd",
                                "border-radius": "0",
                                "padding-left": "35px",
                              }}
                              className="form-control form-control-user inputclassName"
                              placeholder="Email"
                              value={formValues.email}
                              onChange={handleChange}
                              onBlur = {handleValidation}
                            />
                            <i
                              style={{
                                "position": "absolute",
                                "top": "29%",
                                "left": "5px",
                                "font-size": "17px",
                                "color": "#101d6b",
                              }}
                              className="fa fa-envelope common"
                            ></i>
                            <p style={{color: "red"}}>{formErrors.email}</p>
                          </div>
                          
                          <div className="form-group col-md-6 mb-3">
                            
                            <input
                              type="password"
                              name="password"
                              style={{
                                "border": "none",
                                "border-bottom": "2px solid #ddd",
                                "border-radius": "0",
                                "padding-left": "35px",
                              }}
                              className="form-control form-control-user inputclassName"
                              placeholder="Password"
                              value={formValues.password}
                              onChange={handleChange}
                              onBlur = {handleValidation}
                            />
                            <i
                              style={{
                                "position": "absolute",
                                "top": "29%",
                                "left": "5px",
                                "font-size": "17px",
                                "color": "#101d6b",
                              }}
                              className="fa fa-unlock-alt common"
                            ></i>
                            <p style={{color: "red"}}>{formErrors.password}</p>
                          </div>
                          
                          <div className="form-group col-md-6 mb-3">
                            
                            <select style = {{"border-top": "none",
                                                "border-right": "none",
                                                "border-bottom": "2px solid rgb(221, 221, 221)",
                                                "border-left": "none",
                                                "border-image": "initial",
                                                "border-radius": "0px",
                                                "padding-left": "35px"}}
                                          class="form-control form-control-user inputclassName" name="agegroup" id="cars">
                                      <option value="">Age Group</option>
                                      <option value="0-18">0-18</option>
                                      <option value="19-40">19-40</option>
                                      <option value="41-60">41-60</option>
                                      <option value="Above 60">Above 60</option>
                            </select>
                              
                              <i style={{
                                  "position": "absolute",
                                  "top": "29%",
                                  "left": "5px",
                                  "font-size": "17px",
                                  "color": "#101d6b",
                                }}
                                className="fa fa-child common"
                              ></i>
                              <p style={{color: "red"}}>{formErrors.agegroup}</p>
                          </div>

                          <div className="form-group col-md-6 mb-3">
                            
                            <select style = {{"border-top": "none",
                                                "border-right": "none",
                                                "border-bottom": "2px solid rgb(221, 221, 221)",
                                                "border-left": "none",
                                                "border-image": "initial",
                                                "border-radius": "0px",
                                                "padding-left": "35px"}}
                                          class="form-control form-control-user inputclassName" name="gender" id="cars">
                                      <option value="">Gender</option>
                                      <option value="Male">Male</option>
                                      <option value="Female">Female</option>
                                      <option value="Transgender">Transgender</option>
                            </select>
                              
                              <i style={{
                                  "position": "absolute",
                                  "top": "29%",
                                  "left": "5px",
                                  "font-size": "17px",
                                  "color": "#101d6b",
                                }}
                                className="fa fa-user common"
                              ></i>
                              <p style={{color: "red"}}>{formErrors.gender}</p>
                          </div>

                          <div className="form-group col-md-6 mb-3">
                            
                            <select style = {{"border-top": "none",
                                                "border-right": "none",
                                                "border-bottom": "2px solid rgb(221, 221, 221)",
                                                "border-left": "none",
                                                "border-image": "initial",
                                                "border-radius": "0px",
                                                "padding-left": "35px"}}
                                          class="form-control form-control-user inputclassName" name="religion" id="cars">
                                      <option value="">Religion</option>
                                      <option value="Male">Male</option>
                                      <option value="Female">Female</option>
                                      <option value="Transgender">Transgender</option>
                            </select>
                              
                              <i style={{
                                  "position": "absolute",
                                  "top": "29%",
                                  "left": "5px",
                                  "font-size": "17px",
                                  "color": "#101d6b",
                                }}
                                className="fa fa-child common"
                              ></i>
                              <p style={{color: "red"}}>{formErrors.religion}</p>
                          </div>
                          <div className="form-group col-md-6 mb-3">
                            <input
                              type="text"
                              name="city"
                              style={{
                                "border": "none",
                                "border-bottom": "2px solid #ddd",
                                "border-radius": "0",
                                "padding-left": "35px",
                              }}
                              className="form-control form-control-user inputclassName"
                              placeholder="City"
                              value={formValues.city}
                              onChange={handleChange}
                            />
                            <i
                              style={{
                                "position": "absolute",
                                "top": "29%",
                                "left": "5px",
                                "font-size": "17px",
                                "color": "#101d6b",
                              }}
                              className="fas fa-city common"
                            ></i>
                            <p style={{color: "red"}}>{formErrors.city}</p>
                          </div>
                          
                          
                          <div className="form-group col-md-4 mb-3">
                            <input
                              type="text"
                              name="state"
                              style={{
                                "border": "none",
                                "border-bottom": "2px solid #ddd",
                                "border-radius": "0",
                                "padding-left": "35px",
                              }}
                              className="form-control form-control-user inputclassName"
                              placeholder="State"
                              value={formValues.state}
                              onChange={handleChange}
                            />
                            <i
                              style={{
                                "position": "absolute",
                                "top": "29%",
                                "left": "5px",
                                "font-size": "17px",
                                "color": "#101d6b",
                              }}
                              className="fas fa-city common"
                            ></i>
                            <p style={{color: "red"}}>{formErrors.state}</p>
                          </div>

                          <div className="form-group col-md-4 mb-3">
                            <input
                              type="text"
                              name="country"
                              style={{
                                "border": "none",
                                "border-bottom": "2px solid #ddd",
                                "border-radius": "0",
                                "padding-left": "35px",
                              }}
                              className="form-control form-control-user inputclassName"
                              placeholder="Country"
                              onChange={handleChange}
                            />
                            <i
                              style={{
                                "position": "absolute",
                                "top": "29%",
                                "left": "5px",
                                "font-size": "17px",
                                "color": "#101d6b",
                              }}
                              className="fas fa-globe common"
                            ></i>
                            <p style={{color: "red"}}>{formErrors.state}</p>
                          </div>
                          
                          <div className="form-group col-md-4 mb-3">
                            <input
                              type="number"
                              name="zip"
                              style={{
                                "border": "none",
                                "border-bottom": "2px solid #ddd",
                                "border-radius": "0",
                                "padding-left": "35px",
                              }}
                              className="form-control form-control-user inputclassName"
                              placeholder="Zip"
                              value={formValues.zip}
                              onChange={handleChange}
                            />
                            <i
                              style={{
                                "position": "absolute",
                                "top": "29%",
                                "left": "5px",
                                "font-size": "17px",
                                "color": "#101d6b",
                              }}
                              className="fas fa-map-pin common"
                            ></i>
                            <p style={{color: "red"}}>{formErrors.zip}</p>
                          </div>
                          
                        </div>
                        <div className="form-group">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="gridCheck"
                            />
                            <label className="form-check-label" for="gridCheck">
                              I agree to terms and services.
                            </label>
                          </div>
                        </div>
                        <div className="form-group" style={{"text-align": "center"}}>
                          <button
                            type="button"
                            className="btn btn-custom btn-step mx-0"
                            onClick={submitHandler}
                            disabled={ !email || !password || !fname || !lname}
                          >
                            <i className="fas fa-save mx-lg-1"></i> Save
                          </button>
                          <ToastContainer />
                        </div>
                      </form>
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

export default Signup;