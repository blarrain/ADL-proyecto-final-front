import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

import { useContext, useEffect } from 'react';
import { ArticulosContext } from '../context/ArticulosContext';
import { UserContext } from '../context/userContext';

const AllArticulosStack = ({ onEdit }) => {
	const { articulos, getAllArticulos, BASE_URL } = useContext(ArticulosContext);
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
	}, [getAllArticulos]);

	return (
		<div className='my-5'>
			<h2>Todos los artículos</h2>
			<ListGroup variant='flush'>
				<ListGroup.Item className='fw-bold'>
					<Stack direction='horizontal' gap={3}>
						<span style={{ minWidth: '4ch' }}>ID</span>
						<span className='me-auto'>Nombre</span>
					</Stack>
				</ListGroup.Item>
				{articulos.map((art) => (
					<ListGroup.Item key={art.id_articulo}>
						<Stack direction='horizontal' gap={3}>
							<span style={{ minWidth: '4ch' }}>{art.id_articulo}</span>{' '}
							<span className='me-auto'>{art.nombre}</span>
							<Button
								variant='outline-primary'
								onClick={() => onEdit(art.id_articulo)}
							>
								Editar <i class='bi bi-pencil-square'></i>
							</Button>
							<Button
								variant='danger'
								onClick={() => removeArticulo(art.id_articulo)}
							>
								Eliminar <i class='bi bi-trash'></i>
							</Button>
						</Stack>
					</ListGroup.Item>
				))}
			</ListGroup>
		</div>
	);
};
export default AllArticulosStack;
