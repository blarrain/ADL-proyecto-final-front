import React from 'react'
import { NavLink } from 'react-router-dom'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import miLogo from './../assets/img/logoJRB.png';


function CollapsibleExample() {

  const setActiveClass = ({ isActive }) =>
    isActive ? "nav-link active fw-bold text-success" : "nav-link";

  const setActiveStyle = ({ isActive }) => ({
    borderBottom: isActive ? "2px solid green" : "none"
  });

  return (
    <Navbar expand="lg" bg="light" className="navbar-vivero shadow-sm sticky-top">
      <Container>

        {/* LOGO */}
        <Navbar.Brand as={NavLink} to="/" className="fw-bold text-success">
          <img
            src={miLogo}
            width="50"
            height="50"
            className="me-2"
            alt="Logo"
          />
          Vivero JRB
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>

          {/* MENÚ IZQUIERDO */}
          <Nav className="me-auto gap-3">
            <NavLink to="/store" className={setActiveClass} style={setActiveStyle}>
              Tienda
            </NavLink>

            <NavLink to="/article" className={setActiveClass} style={setActiveStyle}>
              Artículos
            </NavLink>
          </Nav>

          {/* MENÚ DERECHO */}
          <Nav className="align-items-center gap-3">

            <NavLink to="/cart" className={setActiveClass} style={setActiveStyle}>
              <i className="bi bi-cart"></i> Carrito
            </NavLink>

            <NavLink to="/login" className={setActiveClass} style={setActiveStyle}>
              Login
            </NavLink>

            <NavDropdown title="Mi Perfil" id="collapsible-nav-dropdown">
              <NavDropdown.Item as={NavLink} to="/profile" className={setActiveClass} style={setActiveStyle}>Mis Datos</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/favorite" className={setActiveClass} style={setActiveStyle}> Mis Favoritos  </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Cerrar Sesión
              </NavDropdown.Item>
            </NavDropdown>

          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


export default CollapsibleExample
