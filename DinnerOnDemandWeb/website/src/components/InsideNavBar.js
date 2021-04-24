import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import logo from '../images/logo.png';

function InsideNavBar() {
    return (
        <Navbar sticky="top" fixed="top" bg="dark" variant="dark" expand="lg">
            <div>
                <Navbar.Brand>
                    <img style={{ width: 50, height: 50 }} src={logo} alt="" />
                </Navbar.Brand>
            </div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="../pages/HomePage">Dashboard</Nav.Link>
                    <Nav.Link href="../pages/search">Recipe Lookup</Nav.Link>
                    <Nav.Link href="../pages/favorites">Favorites</Nav.Link>
                    <Nav.Link href="../pages/WelcomePage">Log Off</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default InsideNavBar;