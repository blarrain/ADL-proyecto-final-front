import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Ratio from 'react-bootstrap/Ratio';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

import RowCardArticulosFiltrados from '../components/RowCardArticulosFiltrados';
import CardArticulo from '../components/CardArticulo';

// import { articulos, categorias } from '../assets/data/datos';
import { CartContext } from '../context/CartContext';
import { ArticulosContext } from '../context/ArticulosContext';
import { arrow } from '@popperjs/core';

const DetailArticle = () => {
	const { addToCart } = useContext(CartContext);
	const [article, setArticle] = useState(null);
	// const [category, setCategory] = useState(null);
	const { BASE_URL } = useContext(ArticulosContext);
	const { id } = useParams();

	const getArticulo = async (id) => {
		const response = await fetch(`${BASE_URL}/articulos/${id}`);
		const articleData = await response.json();
		setArticle(articleData);
	};
	useEffect(() => {
		getArticulo(id);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	if (!article) {
		return <div>Cargando...</div>;
	}

	return (
		<div>
			<Container className='my-5 p-0' as={'main'}>
				<Breadcrumb>
					<Breadcrumb.Item href='/' title='Inicio'>
						<i className='bi bi-house'></i>
					</Breadcrumb.Item>
					<Breadcrumb.Item href='/store'>Tienda</Breadcrumb.Item>
					{/* <Breadcrumb.Item href='/store'>{category.nombre}</Breadcrumb.Item> */}
					<Breadcrumb.Item active>{article.nombre}</Breadcrumb.Item>
				</Breadcrumb>
				<Row className='row-gap-5'>
					<Col
						xs={12}
						md={6}
						className='d-flex align-items-center justify-content-center'
					>
						<Ratio aspectRatio='16x9'>
							<Image
								src={article.imagen_url}
								className='object-fit-cover rounded-1'
							/>
						</Ratio>
					</Col>
					<Col xs={12} md={6} className='p-5'>
						<h1 className='text-center mb-4'>{article.nombre}</h1>
						<p className='fw-light fs-5'>{article.descripcion}</p>
						<p className='text-secondary fw-light'>
							<strong>Stock: </strong>
							{article.stock} unidades
						</p>
						<p className='text-center h4 my-4'>
							${Number(article.precio).toLocaleString('es-CL')}
						</p>
						<div className='w-full text-center'>
							<Button
								variant='primary'
								size='lg'
								onClick={() =>
									addToCart({
										id_articulo: article.id_articulo,
										nombre: article.nombre,
										precio: Number(article.precio),
										imagen_url: article.imagen_url,
									})
								}
							>
								Agregar al carrito <i className='bi bi-cart-plus'></i>
							</Button>
						</div>
					</Col>
				</Row>
			</Container>
			<Container className='border-top border-secondary-subtle py-5'>
				<h2 className='mb-4'>Otros artículos de la misma categoría</h2>
				<RowCardArticulosFiltrados
					key={article.id_articulo}
					categoryId={article.id_categoria}
					numberOfArticles={3}
					excludedArticleId={article.id_articulo}
				/>
			</Container>
		</div>
	);
};

export default DetailArticle;
