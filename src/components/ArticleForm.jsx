import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const ArticleForm = (props) => {
	return (
		<Form>
            <h1 className='mb-4'>{props.id ? 'Editar artículo existente' : 'Crear nuevo artículo'}</h1>
			{props.id ?
				<Form.Group controlId='article.id' className='mb-4'>
					<Form.Label>ID</Form.Label>
					<Form.Control type='number' value={props.id} readOnly />
				</Form.Group>
			:	null}
			<Form.Group controlId='article.name' className='mb-4'>
				<Form.Label>
					Nombre{' '}
					<abbr title='requerido' className='text-danger'>
						*
					</abbr>
				</Form.Label>
				<Form.Control type='text' required />
			</Form.Group>
			<Form.Group controlId='article.precio' className='mb-4'>
				<Form.Label>
					Precio{' '}
					<abbr title='requerido' className='text-danger'>
						*
					</abbr>
				</Form.Label>
				<Form.Control type='number' min={1} required />
			</Form.Group>
			<Button disabled variant='primary'>
				{props.id ? 'Editar artículo' : 'Crear artículo'}
			</Button>
		</Form>
	);
};

export default ArticleForm;
