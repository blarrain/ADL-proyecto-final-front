import { useContext, useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Image,
  ListGroup,
} from "react-bootstrap";
import Swal from "sweetalert2";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import { useComunas } from "../hooks/UseComunas.js";



const CartPage = () => {
  const { cart, sumaCart, restaCart, removeItem, total, clearCart } = useContext(CartContext);
  const { perfil } = useContext(UserContext);

  const nombreCompleto = perfil
    ? `${perfil.nombres} ${perfil.apellidos}`
    : "Invitado";

  const comunas = useComunas();
  const [comunaSeleccionada, setComunaSeleccionada] = useState("");

  useEffect(() => {
    if (perfil?.comuna) {
      setComunaSeleccionada(perfil.comuna);
    }
  }, [perfil]);


  const handleCheckout = () => {
    if (!perfil) {
      Swal.fire("Debes iniciar sesión", "", "warning");
      return;
    }

    if (!comunaSeleccionada || !direccionLocal) {
      Swal.fire(
        "Datos incompletos",
        "Debes confirmar tu dirección y comuna",
        "warning",
      );
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Pedido generado",
      text: "Gracias por tu compra 🛒 🌱 ",
      confirmButtonColor: "#198754",
    }).then(() => {
      clearCart();
    });
  };


  const [direccionLocal, setDireccionLocal] = useState("");

  useEffect(() => {
    if (perfil?.direccion) {
      setDireccionLocal(perfil.direccion);
    }
  }, [perfil]);


  return (
    <Container className="py-5">
      <h2 className="mb-4 text-success">
        <i className="bi bi-cart me-2"></i>
        Carrito de compras
      </h2>

      {cart.length === 0 ? (
        <h5 className="text-muted">🛒 Tu carrito está vacío</h5>
      ) : (
        <Row>
          {/* LISTA DE PRODUCTOS */}
          <Col md={8}>
            <ListGroup variant="flush">
              {cart.map((item) => (
                <ListGroup.Item key={item.id_articulo} className="py-3">
                  <Row className="align-items-center">
                    <Col md={2}>
                      <Image
                        src={item.imagen_url}
                        fluid
                        rounded
                        style={{
                          height: "80px",
                          objectFit: "cover",
                        }}
                      />
                    </Col>

                    <Col md={3}>
                      <h6 className="mb-1">{item.nombre}</h6>
                      <small className="text-muted">
                        ID: {item.id_articulo}
                      </small>
                    </Col>

                    <Col md={3} className="text-center">
                      <div className="d-flex justify-content-center align-items-center gap-2">
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => restaCart(item.id_articulo)}
                        >
                          −
                        </Button>

                        <span className="fw-bold fs-5">{item.quantity}</span>

                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => sumaCart(item.id_articulo)}
                        >
                          +
                        </Button>
                      </div>
                    </Col>

                    <Col md={2} className="text-end">
                      <strong>
                        ${(item.precio * item.quantity).toLocaleString("es-CL")}
                      </strong>
                    </Col>

                    <Col md={2} className="text-end">
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => removeItem(item.id_articulo)}
                      >
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
                <Card.Title className="text-success mb-3">
                  Identificación
                </Card.Title>

                <div className="mb-2">
                  <small className="text-muted">Cliente</small>
                  <div className="fw-semibold">{nombreCompleto}</div>
                </div>

                <div className="mb-3">
                  <small className="text-muted">Comuna</small>

                  <select
                    className="form-select"
                    value={comunaSeleccionada}
                    onChange={(e) => setComunaSeleccionada(e.target.value)}
                    disabled={comunas.length === 0}
                  >
                    <option value="">
                      {comunas.length === 0
                        ? "Cargando comunas..."
                        : "Selecciona tu comuna"}
                    </option>

                    {comunas.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <small className="text-muted">Dirección</small>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ej: Av. Providencia 1234, Depto 56"
                    value={direccionLocal}
                    onChange={(e) => setDireccionLocal(e.target.value)}
                  />
                </div>

                <hr />

                <Card.Title className="text-success mb-3">
                  Resumen del pedido
                </Card.Title>

                <div className="d-flex justify-content-between mb-2">
                  <span>Productos</span>
                  <strong>{cart.length}</strong>
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
      )}
    </Container>
  );
};

export default CartPage;
