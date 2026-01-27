import { useContext } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import CardArticulo from './CardArticulo';

import { ArticulosContext } from '../context/ArticulosContext';

const RowCardArticulosFiltrados = (props) => {
	const { articulos } = useContext(ArticulosContext);

	return (
		<Row className='row-gap-4'>
			{articulos
				.filter(
					(art) =>
						art.id_categoria === props.categoryId &&
						art.id_articulo !== props.excludedArticleId,
				)
				.sort(() => Math.random() - 0.5)
				.slice(0, props.numberOfArticles)
				.map((art) => (
					<Col xs={12} sm={8} md={6} lg={4} key={art.id_articulo}>
						<CardArticulo
							id={art.id_articulo}
							name={art.nombre}
							img={art.imagen_url}
							price={art.precio}
							stock={art.stock}
						/>
					</Col>
				))}
		</Row>
	);
};

export default RowCardArticulosFiltrados;
