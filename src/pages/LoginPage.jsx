import React, { useContext, useState } from "react";
import { Container, Row, Col, Card, Form, Button, Image } from "react-bootstrap";
import Swal from "sweetalert2";
import { UserContext } from "../context/userContext";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

  const { login, email, password, setEmail, setPassword, user, msgError } = useContext(UserContext);

  function verificaDatos(e) {
    e.preventDefault();
    login()
  }

  /*  const validarDatos = (e) => {
     e.preventDefault();
 
     if (!email.trim() || !password.trim()) {
       Swal.fire("Error", "Debe ingresar todos los campos", "error");
       return;
     }
 
     if (password.length < 6) {
       Swal.fire("Error", "Contraseña mínimo 6 caracteres", "error");
       return;
     }
 
     Swal.fire("Éxito", "Ingreso correcto 🍕", "success");
     setEmail("");
     setPass("");
   }; */


  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col>
          <Card className="shadow">
            <Row className="g-0">

              {/* Imagen */}
              <Col md={6}>
                <Image
                  src="/src/assets/img/logoJRB.png"
                  fluid
                  className="h-100"
                />
              </Col>

              {/* Formulario */}
              <Col md={6} className="p-4">
                <h3 className="text-center mb-4">
                  Ingreso de clientes
                </h3>

                <Form onSubmit={verificaDatos}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="name@example.com"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Ingrese contraseña"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>

                  <Button type="submit" variant="primary" className="w-100">
                    Iniciar sesión
                  </Button>
                  {msgError != "" && (
                    <div style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>
                      {msgError}
                    </div>
                  )}
                  <label className="text-center mt-3 w-100">
                    Si no tienes cuenta puedes <Card.Link href="/register"> Registrarte</Card.Link>
                  </label>
                </Form>

              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage
