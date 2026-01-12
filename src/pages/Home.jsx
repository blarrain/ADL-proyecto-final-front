import CardArticulo from '../components/CardArticulo';
import { articulos } from '../assets/data/datos.js';
import Header from '../components/Header.jsx';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const HomePage = () => {
	return (
		<div>
			<Header />
			<main className='my-5'>
				<Container>
          <h2>Artículos destacados</h2>
					<Row className='row-gap-4 my-4'>
						{articulos.map((art) => (
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
