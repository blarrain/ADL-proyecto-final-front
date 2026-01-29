import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { useNavigate } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import Swal from "sweetalert2";

const CardArticulo = (props) => {
  const { cart, sumaCart, restaCart, addToCart, setMostrar } = useContext(CartContext);
  const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const price = Number(props.price);

  const cantEnCarro =
    cart.find((e) => e.id_articulo === Number(props.id))?.quantity || 0;

  // revisar si ya es favorito
  const [esFavorito, setEsFavorito] = useState(false);

  useEffect(() => {
    if (!token) return;

    fetch(`${BASE_URL}/favoritos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("No autorizado");
        return res.json();
      })
      .then((data) => {
        const existe = data.some((f) => f.id_articulo === Number(props.id));
        setEsFavorito(existe);
      })
      .catch((err) => {
        console.error("Error cargando favoritos:", err);
        setEsFavorito(false);
      });
  }, [token, props.id, BASE_URL]);

  const verDetalle = (id) => {
    navigate(`./detail/${id}`);
  };

  // agregar favorito
  const agregarFavorito = async () => {
    try {
      const res = await fetch(`${BASE_URL}/favoritos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_articulo: props.id,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setEsFavorito(true);
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  // eliminar favorito
  const eliminarFavorito = async () => {
    try {
      const res = await fetch(`${BASE_URL}/favoritos/${props.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setEsFavorito(false);
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  const handleFavorito = () => {
    console.log("Token:", localStorage.getItem("token"));
    console.log("Artículo:", props.id);

    if (!localStorage.getItem("token")) {
      Swal.fire("Atención", "Debes iniciar sesión", "warning");
      return;
    }

    esFavorito ? eliminarFavorito() : agregarFavorito();
  };

  const handleAddToCart = () => {
    if (!token) {
      Swal.fire(
        "Atención",
        "Debes iniciar sesión para agregar al carrito",
        "warning",
      );
      return;
    }

    setMostrar(true);
    addToCart({
      id_articulo: props.id,
      nombre: props.name,
      precio: price,
      imagen_url: props.img,
      stock: props.stock
    });

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Producto agregado al carrito",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
  };

  return (
    <Card className="mt-0 h-100 shadow-sm border-0">
      <Card.Img
        variant="top"
        src={props.img}
        onClick={() => verDetalle(props.id)}
      />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text className="my-2 text-center fs-5">${price.toLocaleString("es-CL")}</Card.Text>
        <Card.Text className='text-secondary fw-light'>Stock: {props.stock} unidades</Card.Text>							
        <Card.Link className="py-3" onClick={() => verDetalle(props.id)}>
          Ver detalles{" "}
        </Card.Link>
        <Stack direction="horizontal" className="justify-content-between mt-4">
          <Button
            variant={esFavorito ? "danger" : "outline-pink"}
            onClick={handleFavorito}
            title={esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
          >
            <i
              className={`bi ${esFavorito ? "bi-heart-fill" : "bi-heart"}`}
            ></i>
          </Button>

          {cantEnCarro === 0 && (
            <Button variant="primary" onClick={handleAddToCart}>
              Agregar al carrito <i className="bi bi-cart-plus"></i>
            </Button>
          )}
          {cantEnCarro > 0 && (
            <div>
              <Button
                title="Quitar 1 del carrito"
                variant="outline-danger"
                onClick={() => restaCart(props.id)}
              >
                <i className="bi bi-dash"></i>
              </Button>
              <span className="fs-5 px-2">{cantEnCarro}</span>
              <Button
                title="Agregar 1 al carrito"
                variant="outline-primary"
                onClick={() => sumaCart(props.id)}
              >
                <i className="bi bi-plus"></i>
              </Button>
            </div>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default CardArticulo;
