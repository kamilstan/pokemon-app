import React, {SyntheticEvent} from "react";
import {Container, Nav, NavDropdown, Navbar, Image} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import {useDispatch, useSelector} from "react-redux";
import {StoreState} from "../../redux-toolkit/store";
import {Link, useNavigate} from "react-router-dom";
import {
    setAccessToken,
    setExpirationTime,
    setId,
    setIsLoggedIn,
    setRole, setUsername
} from "../../redux-toolkit/features/user/user-slice";

import "./PageNavbar.css";

export const PageNavbar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { accessToken, username, role} = useSelector((store: StoreState) => store.user);

    const handleLogout = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            const data = await fetch(`http://localhost:8080/api/login`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    authorization: `Bearer ${accessToken}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            if (data.status === 200) {
                dispatch(setId(''));
                dispatch(setUsername(''));
                dispatch(setAccessToken(''));
                dispatch(setExpirationTime(0));
                dispatch(setRole(''));
                dispatch(setIsLoggedIn(false));
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
            <Container>
                <Navbar.Brand href="/"><Image fluid width={"100px"} height={"50px"} src="/img.png" alt="pokemon"/></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                    </Nav>
                    <Nav>
                        <NavDropdown
                            title={username ? username : <Image style={{backgroundColor:"#FFC107", border:"none"}} fluid thumbnail width={"30px"} height={"30px"} src="/person-circle.svg" alt="pokemon"/> }
                            id="collasible-nav-dropdown">
                            {role ? <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item> : null}
                            {role ? <NavDropdown.Item href="#action/3.2" onClick={handleLogout}>Logout</NavDropdown.Item> : null}
                            {role ? null : <NavDropdown.Item href="#action/3.3" ><Link className="navbar-link" to="/login">Login</Link></NavDropdown.Item>}
                            </NavDropdown>


                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}