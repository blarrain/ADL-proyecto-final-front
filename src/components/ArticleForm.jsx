import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';

import { useContext, useState, useEffect } from 'react';
import { ArticulosContext } from '../context/ArticulosContext';
import { UserContext } from '../context/UserContext';

const ArticleForm = (props) => {
	const { categorias, getAllArticulos, BASE_URL } =
		useContext(ArticulosContext);
	const { token } = useContext(UserContext);
	const [nombre, setNombre] = useState('');
	const [idCategoria, setIdCategoria] = useState(1);
	const [precio, setPrecio] = useState('');
	const [stock, setStock] = useState('');
	const [descripcion, setDescripcion] = useState('');
	const [imgUrl, setImgUrl] = useState('');

	const getArticulo = async (id) => {
		const response = await fetch(`${BASE_URL}/articulos/${id}`);
		if (!response.ok) {
			alert(
				`Error al obtener datos del artículo: ${response.status} ${response.statusText}`,
			);
			return;
		}
		const data = await response.json();
		setNombre(data.nombre);
		setDescripcion(data.descripcion);
		setPrecio(data.precio);
		setStock(data.stock);
		setImgUrl(data.imagen_url);
		setIdCategoria(data.id_categoria);
	};

	useEffect(() => {
		if (props.id) {
			getArticulo(props.id);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.id]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!props.id) {
			await createArticulo(
				nombre,
				descripcion,
				precio,
				stock,
				imgUrl,
				idCategoria,
			);
		} else {
			await updateArticulo(
				props.id,
				nombre,
				descripcion,
				precio,
				stock,
				imgUrl,
				idCategoria,
			);
		}
	};
	const createArticulo = async (
		nombre,
		descripcion,
		precio,
		stock,
		imagen_url,
		id_categoria,
		activo = true,
	) => {
		const response = await fetch(`${BASE_URL}/articulos`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				nombre,
				descripcion,
				precio,
				stock,
				imagen_url,
				id_categoria,
				activo,
			}),
		});
		console.log(
			JSON.stringify({
				nombre,
				descripcion,
				precio,
				stock,
				imagen_url,
				id_categoria,
				activo,
			}),
		);
		if (!response.ok) {
			alert(`Error: ${response.status} ${response.statusText}`);
			return;
		}
		const data = await response.json();
		alert(data?.message || 'Artículo creado exitosamente');
		setNombre('');
		setStock('');
		setDescripcion('');
		setPrecio('');
		setImgUrl('');
		setIdCategoria(1);
		await getAllArticulos();
	};

	const updateArticulo = async (
		id,
		nombre,
		descripcion,
		precio,
		stock,
		imagen_url,
		id_categoria,
		activo = true,
	) => {
		const response = await fetch(`${BASE_URL}/articulos/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				nombre,
				descripcion,
				precio,
				stock,
				imagen_url,
				id_categoria,
				activo,
			}),
		});
		if (!response.ok) {
			alert(`Error: ${response.status} ${response.statusText}`);
			return;
		}
		const data = await response.json();
		alert(data?.message || 'Artículo actualizado exitosamente');
		await getAllArticulos();
	};

	return (
		<Row>
			<Col
				xs={12}
				md={8}
				className='mx-auto p-5 border border-secondary-subtle'
			>
				<Stack direction='horizontal' gap={3} className='mb-4'>
					<h1>
						{props.id ? 'Editar artículo existente' : 'Crear nuevo artículo'}
					</h1>
					{props.id && (
						<Button className='ms-auto' variant='link' onClick={props.onReset}>
							Cambiar a crear artículo
						</Button>
					)}
				</Stack>
				<Form onSubmit={handleSubmit}>
					{props.id ?
						<Form.Group as={Row} controlId='article.id' className='mb-3'>
							<Form.Label column sm>
								ID:
							</Form.Label>
							<Col sm='10'>
								<Form.Control
									type='number'
									value={props.id}
									readOnly
									plaintext
								/>
							</Col>
						</Form.Group>
					:	null}
					<Row className='mb-3'>
						<Col>
							<Form.Group controlId='article.name'>
								<Form.Label>
									Nombre{' '}
									<abbr title='requerido' className='text-danger'>
										*
									</abbr>
								</Form.Label>
								<Form.Control
									type='text'
									required
									value={nombre}
									onChange={(e) => setNombre(e.target.value)}
								/>
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
								<Form.Select
									required
									value={idCategoria}
									onChange={(e) => setIdCategoria(e.target.value)}
								>
									{categorias.map((cat) => (
										<option
											key={cat.id_categoria}
											id={`option-${cat.nombre}`}
											value={cat.id_categoria}
										>
											{cat.nombre}
										</option>
									))}
								</Form.Select>
							</Form.Group>
						</Col>
					</Row>
					<Row className='mb-3'>
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
									<Form.Control
										type='number'
										min={1}
										step={1}
										required
										value={precio}
										onChange={(e) => setPrecio(e.target.value)}
									/>
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
									<Form.Control
										type='number'
										min={0}
										step={1}
										required
										value={stock}
										onChange={(e) => setStock(e.target.value)}
									/>
								</InputGroup>
							</Form.Group>
						</Col>
					</Row>
					<Form.Group className='mb-3' controlId='article.descripcion'>
						<Form.Label>
							Descripción{' '}
							<abbr title='requerido' className='text-danger'>
								*
							</abbr>
						</Form.Label>
						<Form.Control
							as='textarea'
							rows={3}
							required
							value={descripcion}
							onChange={(e) => setDescripcion(e.target.value)}
						/>
					</Form.Group>
					<Form.Group controlId='article.img' className='mb-3'>
						<Form.Label>
							URL de imagen{' '}
							<abbr title='requerido' className='text-danger'>
								*
							</abbr>
						</Form.Label>
						<Form.Control
							type='url'
							required
							value={imgUrl}
							onChange={(e) => setImgUrl(e.target.value)}
						/>
					</Form.Group>
					<Button type='submit' variant='primary'>
						{props.id ? 'Editar artículo' : 'Crear artículo'}
					</Button>
				</Form>
			</Col>
		</Row>
	);
};

export default ArticleForm;
