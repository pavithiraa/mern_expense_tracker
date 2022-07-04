import React from "react";
import { Link } from "react-router-dom";
import './PublicNavbar.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
const PublicNavbar = () => {
  return (
    <>
    <Navbar className="navbar-container" collapseOnSelect expand="lg"  variant="dark">
      <Container>
        <Navbar.Brand>  <Link to="/" className="navbar-brand">
            <i className="bi bi-currency-exchange fs-1"></i>
          </Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link> <Link to="/" className="nav-link active" aria-current="page">
                  Home
                </Link></Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/add-expense"><Link
                  to="/add-expense"
                  className="btn  btn-danger me-2"
                >
                  New Expense
                </Link></Nav.Link>
            <Nav.Link>
            <Link
                  to="/add-income"
                  className="btn  btn-primary me-2"
                >
                  New Income
                </Link>
            </Nav.Link>
          </Nav>
          <form className="d-flex">
              <Link to="/login" className="btn btn-warning me-2">
                Sign In
              </Link>
              <Link to="/register" className="btn btn-success">
                Sign Up
              </Link>
            </form>
        </Navbar.Collapse>
        
      </Container>
    </Navbar>
      {/* <nav className="navbar navbar-expand-sm navbar-dark  py-0">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <i className="bi bi-currency-exchange fs-1 text "></i>
          </Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link active" aria-current="page">
                  Home
                </Link>
              </li>

              <li className="nav-item mb-2">
                <Link
                  to="/add-expense"
                  className="btn  btn-danger me-2"
                >
                  New Expense
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/add-income"
                  className="btn  btn-primary me-2"
                >
                  New Income
                </Link>
              </li>
            </ul>
            <form className="d-flex">
              <Link to="/login" className="btn btn-warning me-2">
                Sign In
              </Link>
              <Link to="/register" className="btn btn-success">
                Sign Up
              </Link>
            </form>
          </div>
        </div>
      </nav> */}
    </>
  );
};

export default PublicNavbar;