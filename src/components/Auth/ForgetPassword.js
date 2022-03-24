import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Loader } from "../Loader";
import SimpleReactValidator from "simple-react-validator";
import { OtpModal } from "./OtpModal";
import authServices from "../../Services/authServices";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const [, forceUpdate] = useState("");
  const validator = useRef(
    new SimpleReactValidator({ autoForceUpdate: { forceUpdate: forceUpdate } })
  );

  const formValid = validator.current.allValid();
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formValid) {
      let data = {
        username: email,
      };
      setIsLoading(true);
      authServices
        .sendMailapi(data)
        .then((res) => {
          if (res.statusCode === 200) {
            setOpenModal(true);
            setIsLoading(false);
            toast.success(res.result, { position: "top-center" });
          } else {
            setIsLoading(false);
            toast.error(res.message, { position: "top-center" });
          }
        })
        .catch((err) => {
          console.log(err);
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
                      <h3>Forgot Password ?</h3>
                      <small className="text-center">
                        Enter your email address and we'll send you an OTP on
                        mail for reset password
                      </small>
                      <form
                        className="user"
                        onSubmit={(e) => handleFormSubmit(e)}
                      >
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
                            //value={formValues.email}
                            onChange={(e) => setEmail(e.target.value)}
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
                              email,
                              "required|email",
                              { className: "text-danger" }
                            )}
                          </small>
                        </div>

                        <div className="d-flex align-items-center justify-content-end mb-3">
                          <Link className="small" to="/login">
                            Back to login?
                          </Link>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mb-0">
                          <button
                            type="submit"
                            className="btn btn-custom btn-step mx-0"
                            disabled={!formValid}
                            // onClick={submitHandler}
                          >
                            <i className="fas fa-sign-in-alt mx-lg-1"></i>
                            Send Mail
                          </button>

                          <Link to="/signup" className="small">
                            Sign up?
                          </Link>
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
      <OtpModal show={openModal} close={setOpenModal} emailvalue={email} resendHandler={handleFormSubmit} />
      <Loader show={isLoading} />
    </div>
  );
};

export default ForgetPassword;
