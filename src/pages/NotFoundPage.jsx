import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <Container fluid className="notfound-container">
      <Row className="justify-content-center align-items-center vh-100">
        <Col xs={11} md={8} lg={6} className="text-center">
          <h1 className="notfound-code">404</h1>

          <h2 className="notfound-title mb-3">
            Página no encontrada
          </h2>

          <p className="notfound-text mb-4">
            Lo sentimos, la página que estás buscando no existe o fue movida.
            Verifica la URL o regresa al inicio.
          </p>

          <Button
            as={Link}
            to="/"
            variant="success"
            size="lg"
            className="px-5"
          >
            Volver al inicio
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;
