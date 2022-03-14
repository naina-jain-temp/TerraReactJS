import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';

const Step3 = () => {

    const navigate = useNavigate();
  return(
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
                style={{"--bs-scroll-height": "100px"}}
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
              <div className="step step-2" style={{display: "block"}}>
                <div className="mb-5 text-center title">
                  <h3>
                    On a scale of 1-10 with 10 being the most favorable, where
                    will you place (x) right now?
                  </h3>
                </div>
                <div className="d-flex justify-content-center">
                  <div className="check-box">
                    <input type="radio" name="rate" />
                    <span> 1</span>
                  </div>
                  <div className="check-box">
                    <input type="radio" name="rate" />
                    <span> 2</span>
                  </div>
                  <div className="check-box">
                    <input type="radio" name="rate" />
                    <span> 3</span>
                  </div>
                  <div className="check-box">
                    <input type="radio" name="rate" />
                    <span> 4</span>
                  </div>
                  <div className="check-box">
                    <input type="radio" name="rate" />
                    <span> 5</span>
                  </div>
                  <div className="check-box">
                    <input type="radio" name="rate" />
                    <span> 6</span>
                  </div>
                  <div className="check-box">
                    <input type="radio" name="rate" />
                    <span> 7</span>
                  </div>
                  <div className="check-box">
                    <input type="radio" name="rate" />
                    <span> 8</span>
                  </div>
                  <div className="check-box">
                    <input type="radio" name="rate" />
                    <span> 9</span>
                  </div>
                  <div className="check-box">
                    <input type="radio" name="rate" />
                    <span> 10</span>
                  </div>
                </div>
              </div>
              <div className="mt-5 d-flex justify-content-center ">
                <button className="btn btn-custom btn-step prev" onClick={() => {navigate("/step2");}}>
                  Previous
                </button>
                <button className="btn btn-custom btn-step next" onClick={() => {navigate("/step4");}}>Next</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </Fragment>
  );
};

export default Step3;