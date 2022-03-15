import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";

const AboutUs = () => {
  return (
      <main className="about">
        <section>
          <div className="container-md">
            <div className="row justify-content-center ">
              <div className="col-md-12  rounded mt-5">
                <div className="card">
                  <div className="card-header">About Us</div>
                  <div className="card-body">
                    <h5 className="card-title">Special title treatment</h5>
                    <p className="card-text">
                      With supporting text below as a natural lead-in to
                      additional content.
                    </p>
                  </div>
                </div>
                <div className="mt-4 d-flex justify-content-center ">
                  <button className="btn btn-custom btn-step next next">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
  );
};

export default AboutUs;
