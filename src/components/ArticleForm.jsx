import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useContext } from 'react';
import { ArticulosContext } from '../context/ArticulosContext';

const ArticleForm = (props) => {
	const { categorias } = useContext(ArticulosContext);

	/* useEffect(() => {
		if (articulos.length === 0) {
			getAllArticulos();
		}
	}, [articulos, getAllArticulos]); */

	return (
		<Form>
			<h1 className='mb-4'>
				{props.id ? 'Editar artículo existente' : 'Crear nuevo artículo'}
			</h1>
			{props.id ?
				<Form.Group controlId='article.id' className='mb-4'>
					<Form.Label>ID</Form.Label>
					<Form.Control type='number' value={props.id} readOnly plaintext />
				</Form.Group>
			:	null}
			<Row className='mb-4'>
				<Col>
					<Form.Group controlId='article.name'>
						<Form.Label>
							Nombre{' '}
							<abbr title='requerido' className='text-danger'>
								*
							</abbr>
						</Form.Label>
						<Form.Control type='text' required />
					</Form.Group>
				</Col>
				<Col>
					<Form.Group controlId='article.categoria'>
						<Form.Label>
							Categoría{' '}
							<abbr title='requerido' className='text-danger'>
								*
							</abbr>
						</Form.Label>
						<Form.Control as='select' required>
							{categorias.map((cat) => (
								<option key={cat.id} id={`option-${cat.nombre}`} value={cat.id}>
									{cat.nombre}
								</option>
							))}
						</Form.Control>
					</Form.Group>
				</Col>
			</Row>
			<Row className='mb-4'>
				<Col>
					<Form.Group controlId='article.precio'>
						<Form.Label>
							Precio{' '}
							<abbr title='requerido' className='text-danger'>
								*
							</abbr>
						</Form.Label>
						<InputGroup>
							<InputGroup.Text>$</InputGroup.Text>
							<Form.Control type='number' min={1} step={1} required />
						</InputGroup>
					</Form.Group>
				</Col>
				<Col>
					<Form.Group controlId='article.stock'>
						<Form.Label>
							Stock inicial{' '}
							<abbr title='requerido' className='text-danger'>
								*
							</abbr>
						</Form.Label>
						<InputGroup>
							<Form.Control type='number' min={0} step={1} required />
						</InputGroup>
					</Form.Group>
				</Col>
			</Row>
			<Form.Group className='mb-4' controlId='article.descripcion'>
				<Form.Label>
					Descripción{' '}
					<abbr title='requerido' className='text-danger'>
						*
					</abbr>
				</Form.Label>
				<Form.Control as='textarea' rows={3} required />
			</Form.Group>
<Form.Group controlId='article.img' className='mb-4'>
						<Form.Label>
							URL de imagen{' '}
							<abbr title='requerido' className='text-danger'>
								*
							</abbr>
						</Form.Label>
						<Form.Control type='text' required />
					</Form.Group>
			<Button disabled variant='primary'>
				{props.id ? 'Editar artículo' : 'Crear artículo'}
			</Button>
		</Form>
	);
};

export default ArticleForm;
