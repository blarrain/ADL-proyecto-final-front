import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Stack from 'react-bootstrap/Stack';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import CardArticulo from './../components/CardArticulo.jsx';
import Header from '../components/Header.jsx';
import Notificacion from '../components/Alert.jsx';
// import { articulos, categorias } from '../assets/data/datos.js';

import { useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContextTemp.jsx';
import { ArticulosContext } from '../context/ArticulosContext';

const StorePage = () => {
	const { getAllArticulos, articulos, categorias } = useContext(ArticulosContext);
	const { show } = useContext(CartContext);
	const { user } = useContext(UserContext);

	useEffect(() => {
		if (articulos.length === 0) {
			getAllArticulos();
		}
	}, [articulos, getAllArticulos]);

	const alerta = user ? 'success' : 'danger';
	const mensajeAlerta = user ? '¡Producto Agregado!' : '¡Debe iniciar sesión!';

	return (
		<div>
			<Header h1Text='Tienda' pText='Todos los artículos' />
			{show && (
				<Notificacion variant={alerta} mensaje={mensajeAlerta}></Notificacion>
			)}
			<Container fluid className='bd-layout py-3'>
				<aside className='bd-sidebar sticky-top py-3 z-n1'>
					<h2>Filtros</h2>{' '}
					<Form.Label htmlFor='minPrice'>Precio mínimo</Form.Label>
					<Stack direction='horizontal' gap={3} className='mb-3'>
						<InputGroup>
							<InputGroup.Text>$</InputGroup.Text>
							<Form.Control
								aria-label='Precio mínimo'
								id='minPrice'
								type='number'
								min={0}
								disabled
								readOnly
							/>
						</InputGroup>
						<Button variant='outline-primary disabled'>Filtrar</Button>
					</Stack>
					<Form.Label htmlFor='minPrice'>Precio máximo</Form.Label>
					<Stack direction='horizontal' gap={3} className='mb-5'>
						<InputGroup>
							<InputGroup.Text>$</InputGroup.Text>
							<Form.Control
								aria-label='Precio máximo'
								id='maxPrice'
								type='number'
								min={0}
								disabled
								readOnly
							/>
						</InputGroup>
						<Button variant='outline-primary disabled'>Filtrar</Button>
					</Stack>
					<h3>Categoría</h3>
					{categorias.map((cat) => (
						<Form.Check
							disabled
							key={cat.id_categoria}
							type={'checkbox'}
							label={cat.nombre}
							id={`cat-${cat.id_categoria}`}
						/>
					))}
				</aside>
				<main className='bd-main py-3'>
					<Row className='row-gap-4'>
						{articulos.map((art) => (
							<Col key={art.id_articulo} xs={12} sm={8} md={6} lg={4}>
								<CardArticulo
									id={art.id_articulo}
									name={art.nombre}
									img={art.imagen_url}
									price={art.precio}
								/>
							</Col>
						))}
					</Row>
				</main>
			</Container>
		</div>
	);
};

export default StorePage;
