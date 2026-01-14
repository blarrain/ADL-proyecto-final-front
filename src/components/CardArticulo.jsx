import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { useNavigate } from 'react-router-dom';

import { useContext } from "react";
import { CartContext } from "../context/CartContext";


const CardArticulo = (props) => {
  const { addToCart } = useContext(CartContext);

  const price = props.price ?? 0;

  const navigate = useNavigate()
  const verDetalle = (id) => {
    console.log(id)
    navigate(`/detail/${id}`)
  }

    const handleAddToCart = () => {
    addToCart({
      id_articulo: props.id,
      nombre: props.name,
      precio: price,
      imagen_url: props.img,
    });
  };

  return (
   
    <Card className="mt-0 h-100 shadow-sm border-0">
      <Card.Img variant="top" src={props.img} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>${price.toLocaleString("es-CL")}</Card.Text>
        <Card.Link onClick={() => verDetalle(props.id)}>Ver detalles </Card.Link>
        <Stack direction="horizontal" className="justify-content-between mt-4">
          <Button variant="outline-primary">
            <i className="bi bi-heart" title="Agregar a favoritos"></i>
          </Button>
          <Button variant="primary" onClick={handleAddToCart}>
            Agregar al carrito <i className="bi bi-cart-plus"></i>
          </Button>
        </Stack>
      </Card.Body>
    </Card>
  );
}

export default CardArticulo;
