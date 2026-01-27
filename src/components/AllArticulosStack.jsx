import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Ratio from 'react-bootstrap/Ratio';
import Image from 'react-bootstrap/Image';

import { useContext, useEffect } from 'react';
import { ArticulosContext } from '../context/ArticulosContext';
import { UserContext } from '../context/UserContext';

const AllArticulosStack = ({ onEdit }) => {
	const { articulos,categorias, getAllArticulos, BASE_URL } = useContext(ArticulosContext);
	const { token } = useContext(UserContext);

	const removeArticulo = async (id) => {
		const response = await fetch(`${BASE_URL}/articulos/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		if (!response.ok) {
			alert(`Error: ${response.status} ${response.statusText}`);
			return;
		}
		const data = await response.json();
		alert(data?.message || 'Artículo eliminado');
		await getAllArticulos();
	};

	useEffect(() => {
		getAllArticulos();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className='my-5'>
			<h2 className='mb-4'>Todos los artículos</h2>
			<ListGroup variant='flush'>
				{articulos.map((art) => (
					<ListGroup.Item key={art.id_articulo}>
						<Row>
							{/* <Col lg={1}>{art.id_articulo}</Col> */}
							<Col sm={6} md={2} lg={1}>
								<Ratio aspectRatio='4x3'>
									<Image
										src={art.imagen_url}
										className='object-fit-cover rounded'
									/>
								</Ratio>
							</Col>
							<Col className='me-auto'>
								<h5 className='fw-normal'>{art.nombre}</h5>
								<p className='fw-light mb-2 text-body-secondary'>Categoria: {categorias.find((c)=> c.id_categoria === art.id_categoria)?.nombre}</p>
							</Col>
							<Col md={2} lg={1}>
								<p className='mb-2'>
									${Number(art.precio).toLocaleString('es-CL')}
								</p>
								<p className='fw-light mb-2'>Stock: {art.stock}</p>
							</Col>
							<Col
								md='auto'
								className='d-flex flex-wrap gap-3 align-items-center'
							>
								<Button
									variant='outline-primary'
									onClick={() => onEdit(art.id_articulo)}
								>
									Editar <i className='bi bi-pencil-square'></i>
								</Button>
								<Button
									variant='danger'
									onClick={() => removeArticulo(art.id_articulo)}
								>
									Eliminar <i className='bi bi-trash'></i>
								</Button>
							</Col>
						</Row>
					</ListGroup.Item>
				))}
			</ListGroup>
		</div>
	);
};
export default AllArticulosStack;
