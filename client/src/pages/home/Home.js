import React from "react";
import bg3 from "../../img/chartimg3.jpg";
import "./home.css";
const Home = () => {
  return (
    <>
  
  <section className="home-content">
        <img className="home-img"
          style={{ objectFit: "cover" }}
          src={bg3}
          alt=""
        />
        <div className="position-relative">
          <div className="container">
            <div className="row pt-5">
              <div className="col-12 col-lg-5 ms-auto">
                <div className="mb-">
                  <h2 className="display-4 fw-bold mb-5">
                    Keep Track of Your Income & Expenses
                  </h2>
                  <p className="lead text-muted">
                    View all your income and expenses flow from your team in one
                    dashboard
                  </p>
                  
                </div>
                <h1 className="text-danger">Admin Login </h1>
                <p>User name: adminad@gmail.com</p>
                <p>password: 12345</p>
          
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
