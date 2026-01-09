import React from 'react'
import { NavLink } from 'react-router-dom'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import miLogo from './../assets/img/logoJRB.png';


function CollapsibleExample() {

    const setActiveClass = ({ isActive }) => (isActive ? "active" : undefined);
    const setActiveStyle = ({ isActive }) => ({
        color: isActive ? 'green' : '',
        borderBottom: isActive ? '2px solid green' : 'none',
        fontWeight: isActive ? 'bold' : ''
    })
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={NavLink} to="/" className={setActiveClass} style={setActiveStyle}>
                    <img src={miLogo} width="30" height="30" className="d-inline-block align-top" alt="Logo de Inicio" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} className={setActiveClass} to="/store" style={setActiveStyle}>Tienda</Nav.Link>
                        <Nav.Link as={NavLink} className={setActiveClass} to="/article" style={setActiveStyle}>Artículos</Nav.Link>
                        {/* <Nav.Link href="#pricing">Pricing</Nav.Link>
                        <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                    <Nav>
                        <Nav.Link as={NavLink} to="/login" className={setActiveClass} style={setActiveStyle}>Login</Nav.Link>
                        <Nav.Link as={NavLink} to="/register" className={setActiveClass} style={setActiveStyle}>Registro</Nav.Link>
                        <Nav.Link as={NavLink} to="/cart" className={setActiveClass} style={setActiveStyle}>Carrito</Nav.Link>
                        <Nav.Link as={NavLink} to="/profile" className={setActiveClass} style={setActiveStyle}> Mi Perfil </Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CollapsibleExample
