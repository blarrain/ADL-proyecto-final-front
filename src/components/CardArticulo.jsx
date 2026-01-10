import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
// import { useContext } from 'react';
// import { CartContext } from '../context/CartContext';

const CardArticulo = (props) => {
	// const { addToCart } = useContext(CartContext);
	const price = props.price ?? 0;

	return (
    // <Card key={props.id} className='mb-4'>
    // 	<Card.Img variant='top' src={props.img} />
    // 	<Card.Body>
    // 		<Card.Title>{props.name}</Card.Title>
    // 		<Card.Text>${props.price.toLocaleString('es-CL')}</Card.Text>
    // 		<Card.Link href={'/articulo/' + props.id}>Ver detalles</Card.Link>
    // 		<Stack direction='horizontal' className='justify-content-between mt-4'>
    // 			<Button variant='outline-primary' >
    // 				<i className='bi bi-heart' title='Agregar a favoritos'></i>
    // 			</Button>
    // 			<Button
    // 				variant='primary'
    // 				// onClick={() => addToCart({ id, img, name, price })}
    // 			>
    // 				Agregar al carrito <i className='bi bi-cart-plus'></i>
    // 			</Button>
    // 		</Stack>
    // 	</Card.Body>
    // </Card>
    <Card className="mb-4">
      <Card.Img variant="top" src={props.img} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>${price.toLocaleString("es-CL")}</Card.Text>
        <Card.Link href={"/articulo/" + props.id}>Ver detalles</Card.Link>

        <Stack direction="horizontal" className="justify-content-between mt-4">
          <Button variant="outline-primary">
            <i className="bi bi-heart" title="Agregar a favoritos"></i>
          </Button>
          <Button variant="primary">
            Agregar al carrito <i className="bi bi-cart-plus"></i>
          </Button>
        </Stack>
      </Card.Body>
    </Card>
  );
}

export default CardArticulo;
