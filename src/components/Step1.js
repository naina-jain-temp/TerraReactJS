import React from "react";
import Plutchik from "@psychological-components/plutchik";
import "@psychological-components/plutchik/lib/theme-core.css";
import $ from "jquery";
import { Link } from "react-router-dom";
import "./Step1.css";

class Step1 extends React.Component {
  
  constructor(props) {
    super(props);
    this.token = window.sessionStorage.getItem("token") !== '' && window.sessionStorage.getItem("token") !== undefined && window.sessionStorage.getItem("token") !== null ? true : false;

    // Initializing the state
    this.state = { color: "yellow" };
  }
  componentDidMount() {

    $(window).on("load", function () {
      setTimeout(function(){ $('body').removeClass('load');}, 3000);
      setTimeout(function(){$('.btn-step.prev').removeAttr("disabled"); }, 1000);
    });
    if($("#drawer").length > 0){
  
      Plutchik({
        element: "#drawer",
        labels: [
          ["Acceptance", "Serinity", "Interest", "Annoyance", "Boredom", "Pensiveness", "Distraction", "Apprehension"],
          ["Trust", "Joy", "Anticipation", "Anger", "Disgust", "Sadness", "Surprise", "Fear"],
          ["Admiration", "Ecstasy", "Vigilance", "Rage", "Loathing", "Grief", "Amazement", "Terror"],
          ["Submission", "Love", "Optimism", "Aggressiveness", "Contempt", "Emorse", "Disapproval", "Awe"]
        ]
      });
    }
  
    $("#drawer a").on("click",function(){
      if($(this)[0].className.baseVal.split('-')[1] != '3'){
        var clickValue = $(this).attr('title') 
        window.location.href='/step2?emotion=' + clickValue;
      }else{
        $(this)[0].classList.remove('active');
      }
      
    })
  
    $(".btn-step.prev").on('click',function(){
      var currantStep = $(this).attr('tabindex')
      if(currantStep == -1){
        window.location.href='steps.html';
      }
      setTimeout(function(){$('.btn-step.prev').removeAttr("disabled"); }, 1000);
    
    });
    $(".btn-step.next").on('click',function(){
      setTimeout(function(){$('.btn-step.prev').removeAttr("disabled"); }, 1000);
      
    
    });
  


    

    var wheel = $("#drawer");
    var border = parseInt(wheel.css("border-width"));
    var radius = (Math.min(window.innerWidth, window.innerHeight) * 0.7) / 2;
    var center = radius - border / 2;
    var total = 12;
    var slice = (2 * Math.PI) / total;
    

    const Draggable = window.Draggable;
    Draggable.create(wheel, {
      type: "rotation",
      throwProps: true,
      minimumMovement: 10,
      onClick: function(e) {    
          var num = e.target.dataset.num;    
          console.log('@@@');
        // if (num) { info.text("Clicked Box " + num); }
      }
      });    

    // Changing the state after 2 sec
    // from the time when the component
    // is rendered
    setTimeout(() => {
      this.setState({ color: "red" });
    }, 2000);
  }
  render() {
    return (
      <div>
        <header>
          <div className="container">
            <nav className="navbar navbar-expand-lg">
              <div className="container-fluid">
                <a className="navbar-brand" href="#">
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
                    className="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll align-items-baseline"
                    style={{ "--bs-scroll-height": "100px" }}
                  >
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
                      <Link to="/about-us" className="nav-link">
                        About Us
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/contact-us" className="nav-link">
                        Contact Us
                      </Link>
                    </li>
                    
                    {this.token ? (
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
        <main className="about">
          <section>
            <div className="container-md">
              <div className="row justify-content-center ">
                <div className="col-md-12  rounded mt-5">
                  <div>
                    <div id="drawer" className="text-center m-auto"></div>
                    <div className="mt-1 text-center title">
                      <h3
                        style={{ "font-size": "31px", color: "#201c6f" }}
                        className="mb-0"
                      >
                        Please click free to open up
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Link to="/step2">
        <div
          id="drawer"
          class="text-center m-auto"
        ></div>
        </Link>
      </div>
    );
  }
}
export default Step1;






// import React from "react";
// import Plutchik from "@psychological-components/plutchik";
// import "@psychological-components/plutchik/lib/theme-core.css";
// import $ from "jquery";
// import { Link } from "react-router-dom";
// import "./Step1.css";


// const Step1 = () => {

//   $(window).on("load", function () {
//     setTimeout(function(){ $('body').removeClass('load');}, 3000);
//     setTimeout(function(){$('.btn-step.prev').removeAttr("disabled"); }, 1000);
//   });
//   if($("#drawer").length > 0){

//     Plutchik({
//       element: "#drawer",
//       labels: [
//         ["okkk", "5", "9", "13", "17", "21", "25", "29"],
//         ["2", "6", "10", "14", "18", "22", "26", "30"],
//         ["3", "7", "Mohit", "15", "19", "23", "27", "31"],
//         ["4", "8", "12", "16", "20", "24", "28", "gcghccfcf"]
//       ]
//     });
//   }

//   $("#drawer a").on("click",function(){
//     if($(this)[0].className.baseVal.split('-')[1] != '3'){
//       var clickValue = $(this).attr('title')  
//       alert(clickValue);
//       window.location.href='step-2.html';
//     }else{
//       $(this)[0].classList.remove('active');
//     }
    
//   })

//   $(".btn-step.prev").on('click',function(){
//     var currantStep = $(this).attr('tabindex')
//     if(currantStep == -1){
//       window.location.href='steps.html';
//     }
//     setTimeout(function(){$('.btn-step.prev').removeAttr("disabled"); }, 1000);
  
//   });
//   $(".btn-step.next").on('click',function(){
//     setTimeout(function(){$('.btn-step.prev').removeAttr("disabled"); }, 1000);
    
  
//   });



  

//   var wheel = $("#drawer");
//   var border = parseInt(wheel.css("border-width"));
//   var radius = (Math.min(window.innerWidth, window.innerHeight) * 0.7) / 2;
//   var center = radius - border / 2;
//   var total = 12;
//   var slice = (2 * Math.PI) / total;

//   const Draggable = window.Draggable;
//   Draggable.create(wheel, {
//     type: "rotation",
//     throwProps: true,
//     minimumMovement: 10,
//     onClick: function(e) {    
//         var num = e.target.dataset.num;    
//         console.log('@@@');
//       // if (num) { info.text("Clicked Box " + num); }
//     }
//     });    

//   // Changing the state after 2 sec
//   // from the time when the component
//   // is rendered
//   setTimeout(() => {
//     this.setState({ color: "red" });
//   }, 2000);

//   return(
//     <div>
//         <header>
//           <div className="container">
//             <nav className="navbar navbar-expand-lg">
//               <div className="container-fluid">
//                 <a className="navbar-brand" href="#">
//                   <img src="assets/img/logo.png" className="logo" alt="Logo" />
//                 </a>
//                 <button
//                   className="navbar-toggler"
//                   type="button"
//                   data-bs-toggle="collapse"
//                   data-bs-target="#navbarScroll"
//                   aria-controls="navbarScroll"
//                   aria-expanded="false"
//                   aria-label="Toggle navigation"
//                 >
//                   <span className="navbar-toggler-icon">
//                     <i className="fas fa-bars"></i>
//                   </span>
//                 </button>
//                 <div className="collapse navbar-collapse" id="navbarScroll">
//                   <ul
//                     className="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll align-items-baseline"
//                     style={{ "--bs-scroll-height": "100px" }}
//                   >
//                     <li className="nav-item">
//                       <Link
//                         to="/"
//                         className="nav-link active"
//                         aria-current="page"
//                       >
//                         Home
//                       </Link>
//                     </li>
//                     <li className="nav-item">
//                       <Link to="/about-us" className="nav-link">
//                         About Us
//                       </Link>
//                     </li>
//                     <li className="nav-item">
//                       <Link to="/contact-us" className="nav-link">
//                         Contact Us
//                       </Link>
//                     </li>
//                     <li className="nav-item">
//                       <Link
//                         to="/login"
//                         className="btn btn-outline-light px-4 rounded-pill"
//                       >
//                         Login
//                       </Link>
//                       {/* <a className="btn btn-outline-light px-4 rounded-pill">Login</a> */}
//                     </li>
//                     <li className="nav-item">
//                       <Link to="/signup">
//                         <svg
//                           aria-hidden="true"
//                           focusable="false"
//                           height="25px"
//                           data-prefix="far"
//                           data-icon="user"
//                           role="img"
//                           xmlns="http://www.w3.org/2000/svg"
//                           viewBox="0 0 448 512"
//                           className="svg-inline--fa fa-user fa-w-14 fa-2x"
//                         >
//                           <path
//                             fill="#fff"
//                             d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z"
//                             className=""
//                           ></path>
//                         </svg>
//                       </Link>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </nav>
//           </div>
//         </header>
//         <main className="about">
//           <section>
//             <div className="container-md">
//               <div className="row justify-content-center ">
//                 <div className="col-md-12  rounded mt-5">
//                   <div>
//                     <div id="drawer" className="text-center m-auto"></div>
//                     <div className="mt-1 text-center title">
//                       <h3
//                         style={{ "font-size": "31px", color: "#201c6f" }}
//                         className="mb-0"
//                       >
//                         Please click free to open up
//                       </h3>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>
//         </main>
//         <div
//           id="drawer"
//           class="text-center m-auto"
//         ></div>
//       </div>
//   );
// };

// export default Step1;