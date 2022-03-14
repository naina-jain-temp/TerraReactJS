import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const token = window.sessionStorage.getItem("token") !== '' && window.sessionStorage.getItem("token") !== undefined && window.sessionStorage.getItem("token") !== null ? true : false;
 
  return (
    <body className="load">
    <header>
      <div className="container">
        <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src="assets/img/logo.png" className="logo" alt="Logo" />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"><i className="fas fa-bars"></i></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll align-items-baseline" style={{ "--bs-scroll-height": "100px" }}>
                <li className="nav-item">
                <Link
                      to="/"
                      className="nav-link active"
                      aria-current="page"
                    >
                      Home
                </Link>
                </li>
                <li className="nav-item">
                <Link
                      to="/about-us"
                      className="nav-link"
                    >
                      About Us
                </Link>
                  
                </li>
                 <li className="nav-item">
                 <Link
                      to="/contact-us"
                      className="nav-link"
                    >
                      Contact Us
                </Link>
                </li>
                {token ? (
                  <React.Fragment>
                    <li className="nav-item">
                        <Link
                                to="/logout"
                                className="btn btn-outline-light px-4 rounded-pill"
                            >
                                Logout
                        </Link>
                            {/* <a className="btn btn-outline-light px-4 rounded-pill">Login</a> */}
                        </li>
                    </React.Fragment>
                ) : (
                  <React.Fragment>
                                <li className="nav-item">
                        <Link
                                to="/login"
                                className="btn btn-outline-light px-4 rounded-pill"
                            >
                                Login
                        </Link>
                            {/* <a className="btn btn-outline-light px-4 rounded-pill">Login</a> */}
                        </li>
                        <li className="nav-item">
                            <Link to="/signup">
                            
                            <svg aria-hidden="true" focusable="false" height="25px" data-prefix="far" data-icon="user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="svg-inline--fa fa-user fa-w-14 fa-2x"><path fill="#fff" d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z" className=""></path></svg>
                            
                            </Link>
                    </li>
                  </React.Fragment>
                  
                )}
                
                
              </ul>
            </div>
          </div>
        </nav>
        
      </div>
    </header>
    <main>
      <section>
        <div className="container" >
          <div className="start-button" >
            <div className="mb-5 text-center title" >
              <h2>Welcome to <span>TerraGrok</span></h2>
              <p>Hey! let us know you feel about stuff on your mind while you are here</p>
            </div>
            <Link to="/step1">
                <a style={{ "margin-left": "77%" }} className="custom-btn btn-2">
                  Let's Start <br /> Now
                </a>
            </Link>
          </div>
        </div>
      </section>
    </main>
</body>
  );
};

export default Index;
