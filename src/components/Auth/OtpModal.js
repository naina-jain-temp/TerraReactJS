import React, { useState, useRef } from "react";
import { Modal } from "react-bootstrap";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import SimpleReactValidator from "simple-react-validator";
import authServices from "../../Services/authServices";
import Storage from "../../Storage/Storage";
import { Loader } from "../Loader";

export const OtpModal = ({ show, close, emailvalue, resendHandler }) => {
  const [valueOtp, setValueOtp] = useState();
  const [, forceUpdate] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const validator = useRef(
    new SimpleReactValidator({ autoForceUpdate: { forceUpdate: forceUpdate } })
  );
  const navigate = useNavigate();
  const handleChange = (e) => {
    setValueOtp(e);
  };

  const formValid = validator.current.allValid();
  const OtpSubmitHandler = () => {
    if (formValid) {
      let postData = {
        username: emailvalue,
        otp: valueOtp,
      };
      setIsLoading(true)
      authServices
        .verifyOTPapi(postData)
        .then((res) => {
          if (res.statusCode === 200) {
            Storage.set("otptoken", res.result);
            setIsLoading(false)
            close(false);
            navigate("/reset-password");
            toast.success("Your Otp has been Verified", {
              position: "top-center",
            });
          } else {
            setIsLoading(false)
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
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>OTP Verification</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Enter OTP</p>
        <OtpInput
          className="customOtp"
          value={valueOtp}
          onChange={(e) => handleChange(e)}
          numInputs={4}
          separator={<span>-</span>}
        />
        {validator.current.message("OTP", valueOtp, "required", {
          className: "text-danger",
        })}
        <small>Your OTP will be expired in 3 minutes</small>
      </Modal.Body>
      <Modal.Footer className="justify-content-between">
          
          <button
          className="btn text-light bg-primary"
          onClick={resendHandler}
        >
          Resend OTP
        </button>
          <button
          className="btn text-light bg-success"
          disabled={!formValid}
          onClick={() => OtpSubmitHandler()}
        >
          Verify
        </button>
          
          
          
        
      </Modal.Footer>
      <Loader show={isLoading} />
    </Modal>
  );
};
