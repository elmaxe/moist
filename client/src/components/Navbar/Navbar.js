import React from 'react';
import './Navbar.css';
import { Nav, Navbar, NavItem } from "react-bootstrap";
import * as ROUTES from '../../routes';
import { Link } from 'react-router-dom';
import { LinkContainer } from "react-router-bootstrap";


const NavBar = () => {
    return(

        <Navbar fluid collapseOnSelect>
                <Navbar.Brand>
                    <Link to="/">Home</Link>
                </Navbar.Brand>
                <Navbar.Toggle />
            <Navbar.Collapse>
                <Nav pullRight>
                    <NavItem onClick={console.log("handleLogout")}>Logout</NavItem>
                    <LinkContainer to={ROUTES.REGISTER}>
                        <NavItem>Register</NavItem>
                    </LinkContainer>
                    <LinkContainer to={ROUTES.LOGIN}>
                        <NavItem>Login</NavItem>
                    </LinkContainer>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
};

export default NavBar;
