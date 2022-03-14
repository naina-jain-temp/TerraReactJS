import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";

const Step4 = () => {
    const navigate = useNavigate();
  return (
    <Fragment>
        <Navigation />
      {/* <header>
        <div className="container">
          <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
              <a className="navbar-brand" href="/index.html">
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
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarScroll">
                <ul
                  className="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll"
                  style={{ "--bs-scroll-height": "100px" }}
                >
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      About Us
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </header> */}
      <main>
        <section className="pt-5">
          <div className="container-md">
            <div className="row justify-content-center ">
              <div className="col-md-8">
                <div className="step step-1" style={{ display: "block" }}>
                  <div className="mb-5 text-center title">
                    <h3>Thank You..</h3>
                  </div>
                </div>
                <div className="mt-5 d-flex justify-content-center ">
                    <button className="btn btn-custom btn-step prev" onClick={() => {navigate("/step3")}}>
                      Previous
                    </button>
                  <button className="btn btn-custom btn-step next">Next</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Fragment>
  );
};

export default Step4;