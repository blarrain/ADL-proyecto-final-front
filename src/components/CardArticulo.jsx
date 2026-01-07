import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
// import { useContext } from 'react';
// import { CartContext } from '../context/CartContext';

function CardArticulo({
	id = '0',
	img = 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg',
	name = 'Error',
	price = 0,
}) {

	// const { addToCart } = useContext(CartContext);

	return (
		<Card key={id} className='mb-4'>
			<Card.Img variant='top' src={img} />
			<Card.Body>
				<Card.Title>{name}</Card.Title>
				<Card.Text>${price.toLocaleString('es-CL')}</Card.Text>
				<Card.Link href={'/articulo/' + id}>Ver detalles</Card.Link>
				<Stack direction='horizontal' className='justify-content-between mt-4'>
					<Button variant='outline-primary' >
						<i className='bi bi-heart' title='Agregar a favoritos'></i>
					</Button>
					<Button
						variant='primary'
						// onClick={() => addToCart({ id, img, name, price })}
					>
						Agregar al carrito <i className='bi bi-cart-plus'></i>
					</Button>
				</Stack>
			</Card.Body>
		</Card>
	);
}

export default CardArticulo;
