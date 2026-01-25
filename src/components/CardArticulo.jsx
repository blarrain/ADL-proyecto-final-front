import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { useNavigate } from 'react-router-dom';

import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Swal from "sweetalert2";

const CardArticulo = (props) => {
  const { cart, sumaCart, restaCart, addToCart, setMostrar } = useContext(CartContext);

  const price = Number(props.price);
  const cantEnCarro =
		cart.find((e) => e.id_articulo === Number(props.id))?.quantity || 0;

  const navigate = useNavigate()
  const verDetalle = (id) => {
    navigate(`/detail/${id}`)
  }

  const handleAddToCart = () => {
    setMostrar(true)
    addToCart({
      id_articulo: props.id,
      nombre: props.name,
      precio: price,
      imagen_url: props.img,
    });
  };

  const handleFavorito = () => {
    Swal.fire({
      icon: "info",
      title: "Funcionalidad no disponible",
      text: "La opción de favoritos aún no se encuentra operativa.",
      confirmButtonText: "Entendido",
      confirmButtonColor: "#198754", // verde bootstrap
    });
  };


  return (

    <Card className="mt-0 h-100 shadow-sm border-0">
      <Card.Img variant="top" src={props.img} onClick={() => verDetalle(props.id)}/>
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>${price.toLocaleString("es-CL")}</Card.Text>
        <Card.Link className="py-3" onClick={() => verDetalle(props.id)}>Ver detalles </Card.Link>
        <Stack direction="horizontal" className="justify-content-between mt-4">
          <Button variant="outline-pink" onClick={handleFavorito} title='Agregar a favoritos'>
            <i className="bi bi-heart" title="Agregar a favoritos"></i>
          </Button>
          {cantEnCarro === 0 && (
								<Button
									variant='primary'
									onClick={handleAddToCart}
								>
									Agregar al carrito <i className='bi bi-cart-plus'></i>
								</Button>
							)}
							{cantEnCarro > 0 && (
								<div>
									<Button
									title='Quitar 1 del carrito'
										variant='outline-danger'
										onClick={() => restaCart(props.id)}
									>
										<i class="bi bi-dash"></i>
									</Button>
									<span className='fs-5 px-2'>{cantEnCarro}</span>
									<Button
									title='Agregar 1 al carrito'
										variant='outline-primary'
										onClick={() => sumaCart(props.id)}
									>
										<i class="bi bi-plus"></i>
									</Button>
								</div>
							)}
        </Stack>
      </Card.Body>
    </Card>
  );
}

export default CardArticulo;
