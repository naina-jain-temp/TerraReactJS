import React from "react";
import { Link } from "react-router-dom";
import Storage from "../../Storage/Storage";

const Header = () => {
  const isLoggedIn = Storage.get("token");
//console.log("isLoggedIn", isLoggedIn)
  const logoutHandler = () => {
      Storage.remove("token");
  }

  return (
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
                  <Link to="/" className="nav-link active" aria-current="page">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/about-us" className="nav-link">
                    About Us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/contact-us" className="nav-link">
                    Contact Us
                  </Link>
                </li>
                {!isLoggedIn ? (
                  <>
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
                  </>
                ) : (
                  <li className="nav-item">
                    <a
                    onClick={()=>logoutHandler()}
                      href="javascript:void(0)"
                      className="btn btn-outline-light px-4 rounded-pill"
                    >
                      Logout
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
