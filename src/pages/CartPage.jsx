import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Image,
  ListGroup,
  Badge,
} from "react-bootstrap";
import Swal from "sweetalert2";
import { artCart } from "../assets/data/datos";

const CartPage = () => {
  const total = artCart.reduce((acc, item) => acc + item.price * item.count, 0);
  const [comunas, setComunas] = useState([]);

  const handleCheckout = () => {
    Swal.fire({
      icon: "success",
      title: "Pedido generado",
      text: "Esta es una vista aun no es funcional 🛒",
      confirmButtonColor: "#198754",
    });
  };

  useEffect(() => {
    fetch(
      "https://api.allorigins.win/raw?url=https://apis.digital.gob.cl/dpa/comunas"
    )
      .then((res) => res.json())
      .then((data) => {
        const nombres = data.map((c) => c.nombre);
        setComunas(nombres);
      })
      .catch((err) => {
        console.error("Error al cargar comunas:", err);
      });
  }, []);

  return (
    <Container className="py-5">
      <h2 className="mb-4 text-success">
        <i className="bi bi-cart me-2"></i>
        Carrito de compras
      </h2>

      <Row>
        {/* LISTA DE PRODUCTOS */}
        <Col md={8}>
          <ListGroup variant="flush">
            {artCart.map((item) => (
              <ListGroup.Item key={item.id_articulo} className="py-3">
                <Row className="align-items-center">
                  <Col md={2}>
                    <Image
                      src={item.img}
                      fluid
                      rounded
                      style={{ height: "80px", objectFit: "cover" }}
                    />
                  </Col>

                  <Col md={3}>
                    <h6 className="mb-1">{item.nombre}</h6>
                    <small className="text-muted">ID: {item.id_articulo}</small>
                  </Col>

                  <Col md={3} className="text-center">
                    <div className="d-flex justify-content-center align-items-center gap-2">
                      <Button
                        variant="outline-danger"
                        size="sm"
                        disabled
                      >
                        −
                      </Button>

                      <span className="fw-bold fs-5">{item.count}</span>

                      <Button
                        variant="outline-primary"
                        size="sm"
                        disabled
                      >
                        +
                      </Button>
                    </div>
                  </Col>

                  <Col md={2} className="text-end">
                    <strong>
                      ${(item.price * item.count).toLocaleString("es-CL")}
                    </strong>
                  </Col>

                  <Col md={2} className="text-end">
                    <Button variant="outline-danger" size="sm" disabled>
                      <i className="bi bi-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        {/* RESUMEN */}
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              {/* IDENTIFICACIÓN */}
              <Card.Title className="text-success mb-3">
                Identificación
              </Card.Title>

              <div className="mb-2">
                <small className="text-muted">Cliente</small>
                <div className="fw-semibold">Nombre Apellido</div>
              </div>

              <div className="mb-3">
                <small className="text-muted">Comuna</small>
                <select className="form-select">
                  <option value="">Selecciona tu comuna</option>
                  {comunas.map((c, idx) => (
                    <option key={idx} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <small className="text-muted">Dirección</small>
                <div className="fw-semibold">Héroe de la Concepción 999</div>
              </div>

              <hr />

              {/* RESUMEN */}
              <Card.Title className="text-success mb-3">
                Resumen del pedido
              </Card.Title>

              <div className="d-flex justify-content-between mb-2">
                <span>Productos</span>
                <strong>{artCart.length}</strong>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span>Total</span>
                <strong className="fs-5 text-success">
                  ${total.toLocaleString("es-CL")}
                </strong>
              </div>

              <Button
                variant="success"
                className="w-100"
                size="lg"
                onClick={handleCheckout}
              >
                Finalizar compra
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
