import { Fragment } from "react";

const Signup2 = () => {
  return (
    <Fragment>
      <body>
        <section id="login-page">
          <div
            id="carouselExampleSlidesOnly"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  className="d-block w-100"
                  src="assets/img/12.jpg"
                  alt="First slide"
                />
              </div>
              <div className="carousel-item">
                <img
                  className="d-block w-100"
                  src="assets/img/5.jpg"
                  alt="Second slide"
                />
              </div>
              <div className="carousel-item">
                <img
                  className="d-block w-100"
                  src="assets/img/11.jpg"
                  alt="Third slide"
                />
              </div>
              <div className="carousel-item">
                <img
                  className="d-block w-100"
                  src="assets/img/10.jpg"
                  alt="Third slide"
                />
              </div>
              <div className="carousel-item">
                <img
                  className="d-block w-100"
                  src="assets/img/6.jpg"
                  alt="Third slide"
                />
              </div>
            </div>
          </div>
          <div className="container h-100 login-section">
            {/* Outer Row  */}
            <div className="row justify-content-center h-100 align-items-center ">
              <div className="col-lg-8 col-md-9 shadow-lg rounded bg-pink">
                <div className="row">
                  <div className="col-sm-6  text-center m-auto p-4">
                    <div className="p-3">
                      <a className="navbar-brand" href="#">
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
                            className="form-control form-control-user"
                            id="exampleInputEmail"
                            aria-describedby="emailHelp"
                            placeholder="Email Address"
                          />
                          <i className="far fa-envelope common"></i>
                        </div>
                        <div className="form-group mt-4 mb-4">
                          <input
                            type="password"
                            className="form-control form-control-user"
                            id="exampleInputPassword"
                            placeholder="Password"
                          />
                          <i className="fa fa-unlock-alt common"></i>
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
                          <a className="small" href="#">
                            Forgot Password?
                          </a>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mb-0">
                          <button
                            type="submit"
                            className="btn btn-custom btn-step mx-0"
                          >
                            <i className="fas fa-sign-in-alt mx-lg-1"></i> Login
                          </button>

                          <button
                            type="button"
                            className="btn btn-transparent"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            Signup?
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Button trigger modal */}

        {/* Modal */}
        <div
          className="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModal"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Signup
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="row">
                    <div className="form-group col-md-6 mb-3">
                      <label for="inputEmail4">First name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="First name"
                      />
                    </div>
                    <div className="form-group col-md-6 mb-3">
                      <label for="inputEmail4">Last name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Last name"
                      />
                    </div>
                    <div className="form-group col-md-6 mb-3">
                      <label for="inputEmail4">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="inputEmail4"
                        placeholder="Email"
                      />
                    </div>
                    <div className="form-group col-md-6 mb-3">
                      <label for="inputPassword4">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="inputPassword4"
                        placeholder="Password"
                      />
                    </div>

                    <div className="form-group col-md-6 mb-3">
                      <label for="inputAddress">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputAddress"
                        placeholder="1234 Main St"
                      />
                    </div>
                    <div className="form-group col-md-6 mb-3">
                      <label for="inputAddress2">Address 2</label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputAddress2"
                        placeholder="Apartment, studio, or floor"
                      />
                    </div>

                    <div className="form-group col-md-6 mb-3">
                      <label for="inputCity">City</label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputCity"
                      />
                    </div>
                    <div className="form-group col-md-4 mb-3">
                      <label for="inputState">State</label>
                      <select id="inputState" className="form-control">
                        <option selected>Choose...</option>
                        <option>...</option>
                      </select>
                    </div>
                    <div className="form-group col-md-2 mb-3">
                      <label for="inputZip">Zip</label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputZip"
                      />
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
                        Check me out
                      </label>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-custom btn-step mx-0">
                  <i className="fas fa-save mx-lg-1"></i> Save{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </body>
    </Fragment>
  );
};

export default Signup2;