import CardArticulo from '../components/CardArticulo';
// import { articulos } from '../assets/data/datos.js';
import Header from '../components/Header.jsx';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import CarruselArticulos from '../components/carruselArticulos.jsx';
import PresentacionTienda from '../components/PresentacionTienda.jsx';
import { useContext } from 'react';
import { ArticulosContext } from '../context/ArticulosContext.jsx';

const HomePage = () => {
	const { articulos } = useContext(ArticulosContext);

	return (
		<div>
			<Header />
			<main>
				<PresentacionTienda />
				<Container className='my-5'>
					{/* <CarruselArticulos/> */}
					<h2>Últimos artículos de la tienda</h2>
					<Row className='row-gap-4 my-4'>
						{articulos.slice(0, 3).map((art) => (
							<Col xs={12} sm={8} md={6} lg={4}>
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
				</Container>
			</main>
		</div>
	);
};

export default HomePage;
