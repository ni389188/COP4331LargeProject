import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import logo from '../images/logo.png';
import Button from 'react-bootstrap/Button'


function InsideNavBar() {
    const doLogOff = async event => {
        event.preventDefault();
        localStorage.clear();
        redirect();     
    }

    function redirect () {
        window.location.href = "../pages/WelcomePage";
    }
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
                    <Nav.Link href="../pages/search">Search Recipes</Nav.Link>
                    <Nav.Link href="../pages/customs"> Create Your Own</Nav.Link>
                    <Nav.Link href="../pages/favorites">Favorites</Nav.Link>
                </Nav>
                <Nav class="nav justify-content-end">
                    <Button variant="light" type="submit" controlId="logOffButton" onClick={doLogOff}>Log Off</Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default InsideNavBar;