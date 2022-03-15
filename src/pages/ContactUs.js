import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";

const ContactUs = () => {
  return (
      <main className="about contact">
        <section>
          <div className="container-md">
            <div className="row justify-content-center ">
              <div className="col-md-12  rounded mt-5">
                <div className="card">
                  <div className="card-header">Contact Us</div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-12">
                        <div className="head-001">
                          <h2>Get In Touch</h2>
                          <p>
                            You can also fill up this form with your
                            queries/comments and we will get back to you.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                        <div className="form-group">
                          <input
                            type="name"
                            name="name"
                            placeholder="Enter Your Name"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                        <div className="form-group">
                          <input
                            type="email"
                            name="email"
                            placeholder="Enter Your Email"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                        <div className="form-group">
                          <input
                            type="phone"
                            name="phone"
                            placeholder="Phone Number"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-group">
                          <textarea
                            name="message"
                            cols="30"
                            rows="4"
                            required=""
                            data-error="Write your message"
                            placeholder="QUERIES"
                            className="form-control"
                          ></textarea>
                        </div>
                      </div>

                      <div className="col-12 text-center">
                        <div className="btn-001">
                          <button
                            type="submit"
                            className="btn btn-custom btn-step mx-0"
                          >
                            <i className="fas fa-sign-in-alt mx-lg-1"></i>{" "}
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
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

export default ContactUs;
