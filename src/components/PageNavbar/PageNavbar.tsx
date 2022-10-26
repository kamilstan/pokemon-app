import React from "react";
import {Container, Nav, NavDropdown, Navbar, Image} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'

import "./PageNavbar.css";

export const PageNavbar = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
            <Container>
                <Navbar.Brand href="/"><Image fluid width={"100px"} height={"50px"} src="img.png" alt="pokemon"/></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                    </Nav>
                    <Nav>
                        <NavDropdown title={<Image style={{backgroundColor:"#FFC107", border:"none"}} fluid thumbnail width={"30px"} height={"30px"} src="person-circle.svg" alt="pokemon"/> } id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Logout</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/login">Login</Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}