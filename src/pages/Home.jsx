// import { articulos } from '../assets/data/datos.js';
// import CarruselArticulos from '../components/carruselArticulos.jsx';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import CardArticulo from '../components/CardArticulo';
import Header from '../components/Header.jsx';
import PresentacionTienda from '../components/PresentacionTienda.jsx';

import { useContext, useEffect } from 'react';
import { ArticulosContext } from '../context/ArticulosContext.jsx';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
	const { articulos, getAllArticulos } = useContext(ArticulosContext);

	const navigate = useNavigate();

	useEffect(() => {
		if (articulos.length === 0) {
			getAllArticulos();
		}
	}, [articulos, getAllArticulos]);

	return (
		<div>
			<Header />
			<main>
				<PresentacionTienda />
				<Container className='my-5 pb-5'>
					{/* <CarruselArticulos/> */}
					<h2>Últimos artículos de la tienda</h2>
					<Row className='row-gap-4 my-4'>
						{articulos
						.sort((a, b) => {
							const fechaDiff = new Date(b.fecha_creacion) - new Date(a.fecha_creacion)
							return fechaDiff !== 0 ? fechaDiff : b.id_articulo - a.id_articulo})
						.slice(0, 3)
						.map((art) => (
							<Col key={art.id_articulo} xs={12} sm={8} md={6} lg={4}>
								<CardArticulo
									key={art.id_articulo}
									id={art.id_articulo}
									name={art.nombre}
									img={art.imagen_url}
									price={art.precio}
								/>
							</Col>
						))}
					</Row>
					<div className='w-full text-center text-lg-end'>
						<Button
							variant='outline-primary'
							size='lg'
							className='fw-semibold'
							onClick={() => navigate('/store')}
						>
							Ir a la tienda <i className='bi bi-arrow-right'></i>
						</Button>
					</div>
				</Container>
			</main>
		</div>
	);
};

export default HomePage;
