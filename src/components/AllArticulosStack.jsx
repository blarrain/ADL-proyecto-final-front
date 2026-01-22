import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

import { useContext, useEffect } from 'react';
import { ArticulosContext } from '../context/ArticulosContext';

import SingleArticuloRow from './SingleArticuloRow';

const AllArticulosStack = ({ onEdit }) => {
	const { articulos, getAllArticulos } = useContext(ArticulosContext);

	useEffect(() => {
		if (articulos.length === 0) {
			getAllArticulos();
		}
	}, [articulos, getAllArticulos]);

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
							<Button variant='danger' disabled>
								Eliminar <i class='bi bi-trash'></i>
							</Button>
						</Stack>
					</ListGroup.Item>
				))}
			</ListGroup>
		</div>
	);
};
/* 

function DefaultExample() {
  return (
    <ListGroup>
      <ListGroup.Item>Cras justo odio</ListGroup.Item>
      <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
      <ListGroup.Item>Morbi leo risus</ListGroup.Item>
      <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
      <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
    </ListGroup>
  );
}

export default DefaultExample;
*/
export default AllArticulosStack;
