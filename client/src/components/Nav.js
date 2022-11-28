import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Tab } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";
import logo from "../assets/images/6ix_auto_whitespace_removed-removebg-preview.png";

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar className="navBar" bg="light" variant="light" expand="lg">
        <Container fluid className="d-flex">
          <Navbar.Brand className="logo-container" as={Link} to="/">
            <img src={logo} alt="logo"></img>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar">
            <Nav className="ms-auto">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Nav.Link as={Link} to="/">
                    Home
                  </Nav.Link>
                </li>
                {/* if user is logged in show DreamList and logout */}
                {Auth.loggedIn() ? (
                  <>
                    <li className="nav-item">
                      <Nav.Link as={Link} to="/post">
                        Create Post
                      </Nav.Link>
                    </li>
                    <li className="nav-item">
                      <Nav.Link as={Link} to="/dreamlist">
                        DreamList
                      </Nav.Link>
                    </li>
                    <li className="nav-item">
                      <Nav.Link as={Link} to="/mylistings">
                        My Listings
                      </Nav.Link>
                    </li>
                    <li className="nav-item">
                      <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                    </li>
                  </>
                ) : (
                  <Nav.Link onClick={() => setShowModal(true)}>
                    Login/Sign Up
                  </Nav.Link>
                )}
              </ul>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* set modal data up */}
      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="signup-modal"
      >
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey="login">
          <Modal.Header closeButton>
            <Modal.Title id="signup-modal">
              <Nav variant="pills">
                <Nav.Item>
                  <Nav.Link eventKey="login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="signup">Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey="login">
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey="signup">
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;
