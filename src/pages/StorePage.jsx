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
import { UserContext } from '../context/UserContext.jsx';
import { ArticulosContext } from '../context/ArticulosContext';
import { useState } from 'react';

const StorePage = () => {
	const { categorias, BASE_URL } = useContext(ArticulosContext);
	const { show } = useContext(CartContext);
	const { token } = useContext(UserContext);

	const [articulos, setArticulos] = useState([]);
	const [minPrice, setMinPrice] = useState(null);
	const [maxPrice, setMaxPrice] = useState(null);
	const [idCategoria, setIdCategoria] = useState(null);

	const filterArticulos = async (precio_min, precio_max, id_categoria) => {
		console.log('filterArticulos called'); //debug
		let filtros = [];
		if (precio_min) {
			filtros.push(`precio_min=${precio_min}`);
		}
		if (precio_max) {
			filtros.push(`precio_max=${precio_max}`);
		}
		if (id_categoria) {
			filtros.push(`id_categoria=${id_categoria}`);
		}
		const endpoint = `${BASE_URL}/articulos/filtros?${filtros.join('&')}`;
		console.log(endpoint); //debug
		const res = await fetch(endpoint);
		const data = await res.json();
		setArticulos(data);
	};

	useEffect(() => {
		filterArticulos(null, null, null);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	console.log('Store Page rendered'); //debug

	const alerta = token ? 'success' : 'danger';
	const mensajeAlerta = token ? '¡Producto Agregado!' : '¡Debe iniciar sesión!';

	return (
		<div>
			<Header h1Text='Tienda' pText='Todos los artículos' />
			{show && (
				<Notificacion variant={alerta} mensaje={mensajeAlerta}></Notificacion>
			)}
			<Container fluid className='bd-layout py-3'>
				<aside className='bd-sidebar sticky-top py-3 z-n1'>
					<h2>Filtros</h2>{' '}
					<Form
						gap={4}
						onSubmit={(e) => {
							e.preventDefault();
							filterArticulos(minPrice, maxPrice, idCategoria);
						}}
					>
						<Form.Group>
							<Form.Label htmlFor='minPrice'>Precio mínimo</Form.Label>
							<Stack direction='horizontal' gap={3}>
								<InputGroup>
									<InputGroup.Text>$</InputGroup.Text>
									<Form.Control
										aria-label='Precio mínimo'
										id='minPrice'
										type='number'
										min={0}
										onChange={(e) => setMinPrice(e.target.value)}
									/>
								</InputGroup>
							</Stack>
						</Form.Group>
						<Form.Group>
							<Form.Label htmlFor='minPrice'>Precio máximo</Form.Label>
							<Stack direction='horizontal' gap={3}>
								<InputGroup>
									<InputGroup.Text>$</InputGroup.Text>
									<Form.Control
										aria-label='Precio máximo'
										id='maxPrice'
										type='number'
										min={0}
										onChange={(e) => setMaxPrice(e.target.value)}
									/>
								</InputGroup>
							</Stack>
						</Form.Group>
						<Form.Group controlId='categoria'>
							<Form.Label>Categoría</Form.Label>
							<Form.Control
								as='select'
								value={idCategoria}
								onChange={(e) => setIdCategoria(e.target.value)}
							>
								<option id='option-all' value={null}>
									Todas las categorías
								</option>
								{categorias.map((cat) => (
									<option
										key={cat.id_categoria}
										id={`option-${cat.nombre}`}
										value={cat.id_categoria}
									>
										{cat.nombre}
									</option>
								))}
							</Form.Control>
						</Form.Group>
						<Button type='submit' variant='primary'>
							Filtrar
						</Button>
					</Form>
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
