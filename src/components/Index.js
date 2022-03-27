import React from "react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
   <>
    <main >
      <section>
        <div className="container" >
          <div className="start-button" >
            <div className="mb-5 text-center title" >
              <h2>Welcome to <span>TerraGrok</span></h2>
              <p>Hey! let us know you feel about stuff on your mind while you are here</p>
            </div>
            <Link to="/step1" className="custom-btn Homebtn btn-2">
               
                  Let's Start <br /> Now
            </Link>
          </div>
        </div>
      </section>
    </main>
    </>
  );
};

export default Index;
