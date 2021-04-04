import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import logo from '../images/logo.png';

function NavBar(){
    return(
        <Navbar sticky="top" fixed="top" bg="dark" variant="dark" expand="lg">
            <div>
                <Navbar.Brand>
                    <img style={{ width:50, height:50 }} src={logo} alt=""/>
                </Navbar.Brand>
            </div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="../pages/WelcomePage">Home</Nav.Link>
                    <Nav.Link href="../pages/RegisterPage">Register</Nav.Link>
                    <Nav.Link href="../pages/LoginPage">Login</Nav.Link>
                    <Nav.Link href="../pages/AboutUs">About</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;