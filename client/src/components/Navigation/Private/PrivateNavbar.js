import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/users/usersSlices";
import './PrivateNavbar.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const PrivateNavbar = () => {
  const dispatch = useDispatch();

  return (
    <>
     <Navbar className="navbar-container" collapseOnSelect expand="lg" variant="dark">
      <Container>
        <Navbar.Brand> <Link to="/" className="navbar-brand">
            <i className="bi bi-currency-exchange fs-1 text-white "></i>
          </Link></Navbar.Brand>
        <Navbar.Toggle  aria-controls="responsive-navbar-nav" />
         <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link> <Link to="/dashboard" className="btn  btn-success me-2">
                  Dashboard
                </Link></Nav.Link>
            <Nav.Link><Link to="/profile" className="btn  btn-info me-2">
                  Profile
                </Link></Nav.Link>
          </Nav>
          <Nav>
          <form className="d-flex">
              <Link to="/add-expense" className="btn btn-danger me-2">
                New Expense
              </Link>
              <Link to="/add-income" className="btn btn-primary me-2">
                New Income
              </Link>
              <button
                onClick={() => dispatch(logout())}
                className="btn btn-warning me-2"
              >
                Logout
              </button>
            </form>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
      {/* <nav className="navbar navbar-expand-lg navbar-dark  py-0">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <i className="bi bi-currency-exchange fs-1 text-white "></i>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
        
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbar">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item mb-2">
                <Link to="/dashboard" className="btn  btn-success me-2">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/profile" className="btn  btn-info me-2">
                  Profile
                </Link>
              </li>
            </ul>
            <form className="d-flex">
              <Link to="/add-expense" className="btn btn-danger me-2">
                New Expense
              </Link>
              <Link to="/add-income" className="btn btn-primary me-2">
                New Income
              </Link>
              <button
                onClick={() => dispatch(logout())}
                className="btn btn-warning me-2"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </nav> */}
    </>
  );
};

export default PrivateNavbar;