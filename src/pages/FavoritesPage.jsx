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

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

const FavoritesPage = () => {
  const { addToCart, setMostrar } = useContext(CartContext);
  const { perfil } = useContext(UserContext);

  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");


  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    fetch(`${BASE_URL}/favoritos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error cargando favoritos");
        return res.json();
      })
      .then((data) => setFavoritos(data))
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "No se pudieron cargar los favoritos", "error");
      })
      .finally(() => setLoading(false));
  }, [token]);


  const eliminarFavorito = async (id_articulo) => {
    try {
      const res = await fetch(
        `${BASE_URL}/favoritos/${id_articulo}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setFavoritos((prev) =>
        prev.filter((f) => f.id_articulo !== id_articulo),
      );

      Swal.fire("Eliminado", "Favorito eliminado", "success");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };


  const agregarAlCarrito = (item) => {
    setMostrar(true);
    addToCart({
      id_articulo: item.id_articulo,
      nombre: item.nombre,
      precio: item.precio,
      imagen_url: item.imagen_url,
      stock: item.stock
    });
    Swal.fire("Agregado", "Articulo agregado al carrito", "success");
  };

  return (
    <Container className="py-5">
      <h2 className="mb-4 text-danger">
        <i className="bi bi-heart-fill me-2"></i>
        Mis favoritos
      </h2>

      {!perfil ? (
        <h5 className="text-muted">
          Debes iniciar sesión para ver tus favoritos ❤️
        </h5>
      ) : loading ? (
        <h5 className="text-muted">Cargando favoritos...</h5>
      ) : favoritos.length === 0 ? (
        <h5 className="text-muted">💔 No tienes favoritos aún</h5>
      ) : (
        <Row>
          <Col md={10}>
            <ListGroup variant="flush">
              {favoritos.map((item) => (
                <ListGroup.Item key={item.id_articulo} className="py-3">
                  <Row className="align-items-center">
                    <Col md={2}>
                      <Image
                        src={item.imagen_url}
                        fluid
                        rounded
                        style={{ height: "80px", objectFit: "cover" }}
                      />
                    </Col>

                    <Col md={4}>
                      <h6 className="mb-1">{item.nombre}</h6>
                      <small className="text-muted">
                        ID: {item.id_articulo}
                      </small>
                    </Col>

                    <Col md={2} className="text-end">
                      <strong>
                        ${item.precio.toLocaleString("es-CL")}
                      </strong>
                    </Col>

                    <Col md={4} className="text-end">
                      <Button
                        variant="outline-success"
                        size="sm"
                        className="me-2"
                        onClick={() => agregarAlCarrito(item)}
                      >
                        <i className="bi bi-cart-plus"></i>
                      </Button>

                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => eliminarFavorito(item.id_articulo)}
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default FavoritesPage;
