import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { articulos } from '../assets/data/datos';
import CardArticulo from './CardArticulo';

const RowCardArticulosFiltrados = ({
	categoryId = 1,
	numberOfRows = 1,
	excludedArticleId = 1,
}) => {
	return (
		<Row className='row-gap-4'>
			{articulos
				.filter(
					(art) =>
						art.id_categoria === categoryId &&
						art.id_articulo !== excludedArticleId
				)
				.slice(0, numberOfRows * 3)
				.map((art) => (
					<Col xs={12} sm={8} md={6} lg={4} key={art.id_articulo}>
						<CardArticulo
							id={art.id_articulo}
							name={art.nombre}
							img={art.imagen_url}
							price={art.precio}
						/>
					</Col>
				))}
		</Row>
	);
};

export default RowCardArticulosFiltrados;
