import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Image } from "react-bootstrap";
import Swal from "sweetalert2";

const LoginPage = () => {
      const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const validarDatos = (e) => {
    e.preventDefault();

    if (!email.trim() || !pass.trim()) {
      Swal.fire("Error", "Debe ingresar todos los campos", "error");
      return;
    }

    if (pass.length < 6) {
      Swal.fire("Error", "Contraseña mínimo 6 caracteres", "error");
      return;
    }

    Swal.fire("Éxito", "Ingreso correcto 🍕", "success");
    setEmail("");
    setPass("");
  };


    return (
         <Container className="my-5">
      <Row className="justify-content-center">
        <Col lg={10}>
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

                <Form onSubmit={validarDatos}>
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
                      onChange={(e) => setPass(e.target.value)}
                    />
                  </Form.Group>

                  <Button type="submit" variant="primary" className="w-100">
                    Iniciar sesión
                  </Button>
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
