import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import miLogo from './../assets/img/logoJRB.png';
import { UserContext } from '../context/UserContext';
import { CartContext } from '../context/CartContext';

function CollapsibleExample() {
  const { user, token, logout } = useContext(UserContext)
  const { cart, total } = useContext(CartContext);

  const hayProductos = cart.length > 0;

  const nombreCompleto = token && user ? `${user.nombres} ${user.apellidos}` : "";

  const setActiveClass = ({ isActive }) =>
    isActive ? "nav-link active fw-bold text-success" : "nav-link";

  const setActiveStyle = ({ isActive }) => ({
    borderBottom: isActive ? "2px solid green" : "none"
  });

  return (
    <Navbar
      expand="lg"
      bg="light"
      className="navbar-vivero shadow-sm sticky-top"
      style={{ zIndex: 1050, position: 'relative' }}
    >
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
            <NavLink
              to="/store"
              className={setActiveClass}
              style={setActiveStyle}
            >
              Tienda
            </NavLink>

            {token && user?.rol == "admin" ? (
              <NavLink
                to="/article"
                className={setActiveClass}
                style={setActiveStyle}
              >
                Artículos
              </NavLink>
            ) : (
              ""
            )}
          </Nav>

          {/* MENÚ DERECHO */}
          <Nav className="align-items-center gap-3">

            {token && (
              <span className="fw-semibold text-success me-2">
                <i className="bi bi-person-circle me-1"></i>
                {nombreCompleto}
              </span>
            )}

            {token && user?.rol !== 'admin' && (
              <NavLink
                to="/cart"
                className={`nav-link fw-semibold ${hayProductos ? "text-success" : "text-muted"
                  }`}
              >
                <i
                  className={`bi ${hayProductos ? "bi-cart-fill" : "bi-cart"
                    } me-1`}
                ></i>
                ${total.toLocaleString("es-CL")}
              </NavLink>
            )}



            {!token ? (
              <NavLink
                to="/login"
                className={setActiveClass}
                style={setActiveStyle}
              >
                Login
              </NavLink>
            ) : (
              ""
            )}

            {token ? (
              <NavDropdown title="Mi Perfil" id="collapsible-nav-dropdown">
                <NavDropdown.Item
                  as={NavLink}
                  to="/profile"
                  className={setActiveClass}
                  style={setActiveStyle}
                >
                  Mis Datos
                </NavDropdown.Item>
                {user?.rol == "cliente" ? (
                  <NavDropdown.Item
                    as={NavLink}
                    to="/favorite"
                    className={setActiveClass}
                    style={setActiveStyle}
                  >
                    {" "}
                    Mis Favoritos{" "}
                  </NavDropdown.Item>
                ) : (
                  ""
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>
                  Cerrar Sesión
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              ""
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


export default CollapsibleExample
