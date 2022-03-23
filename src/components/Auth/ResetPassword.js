import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "../Loader";
import SimpleReactValidator from "simple-react-validator";
import authServices from "../../Services/authServices";
import { toast } from "react-toastify";
import Storage from "../../Storage/Storage";

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState();
  const [errPassword, SetErrPassword] = useState();
  const Navigate = useNavigate();

  const [, forceUpdate] = useState("");
  const validator = useRef(
    new SimpleReactValidator({ autoForceUpdate: { forceUpdate: forceUpdate } })
  );

  const handleChange = (value) => {
    var reg = new RegExp("^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$");
    var test = reg.test(value);

    if (value.trim === "") {
      SetErrPassword("The Password is required");
    } else if (!test) {
      SetErrPassword(
        "Password must contain at least 8 characters with number, capital, small and special character"
      );
    } else {
      SetErrPassword(true);
    }
    setPassword(value);
  };

  const formValid = validator.current.allValid();
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formValid && errPassword) {
      let data = {
        password: password,
      };
      setIsLoading(true)
      authServices
        .resetPasswordApi(data)
        .then((res) => {
          if (res.statusCode === 200) {
            setIsLoading(false)
            Storage.remove("otptoken");
            toast.success(res.result, { position: "top-center" });
          } else {
            setIsLoading(false)
            toast.error(res.result, { position: "top-center" });
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
                      <h3>Reset Password ?</h3>
                      <form
                        className="user"
                        onSubmit={(e) => handleFormSubmit(e)}
                      >
                        <div className="form-group">
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
                            //value={formValues.email}
                            onChange={(e) => handleChange(e.target.value)}
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
                          <small className="text-danger">{errPassword}</small>
                        </div>

                        <div className="form-group">
                          <input
                            type="password"
                            name="cofirmpassword"
                            style={{
                              border: "none",
                              "border-bottom": "2px solid #ddd",
                              "border-radius": "0",
                              "padding-left": "35px",
                            }}
                            className="form-control form-control-user inputclassName"
                            placeholder="Confirm Password"
                            //value={formValues.email}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                          <small>
                            {validator.current.message(
                              "Confirm Password",
                              confirmPassword,
                              `required|in:${password}`,
                              { className: "text-danger" }
                            )}
                          </small>
                        </div>

                        <div className="d-flex align-items-center justify-content-between mb-0">
                          <button
                            type="submit"
                            className="btn btn-custom btn-step mx-0"
                            disabled={!formValid}
                            // onClick={submitHandler}
                          >
                            <i className="fas fa-sign-in-alt mx-lg-1"></i>
                            Reset
                          </button>
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

export default ResetPassword;
