import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Header from '../components/Header';
import Stack from 'react-bootstrap/Stack';

const ProfilePage = () => {
	const { user } = useContext(UserContext);
	return (
		<div>
			<Header h1Text='Mi perfil' pText={`Hola, ${user.nombres}`} />
			<Container>
				<Col xs={12} sm={10} md={8} lg={4} className='px-1 py-3 mx-auto'>
					{user ?
						<Form>
							<Form.Group controlId='profile.ControlFirstName' className='mb-4'>
								<Form.Label>Nombre</Form.Label>
								<Form.Control
									type='text'
									value={user.nombres}
									disabled
									readOnly
								/>
							</Form.Group>
							<Form.Group controlId='profile.ControlLastName' className='mb-4'>
								<Form.Label>Apellido</Form.Label>
								<Form.Control
									type='text'
									value={user.apellidos}
									disabled
									readOnly
								/>
							</Form.Group>
							<Form.Group controlId='profile.ControlEmail' className='mb-4'>
								<Form.Label>Email</Form.Label>
								<Form.Control
									type='email'
									value={user.email}
									disabled
									readOnly
								/>
							</Form.Group>
							<Form.Group controlId='profile.ControlComuna' className='mb-4'>
								<Form.Label>Comuna</Form.Label>
								<Form.Control
									type='text'
									value={user.comuna}
									disabled
									readOnly
								/>
							</Form.Group>
							<Form.Group controlId='profile.ControlAddress' className='mb-4'>
								<Form.Label>Dirección</Form.Label>
								<Form.Control
									type='text'
									value={user.direccion}
									disabled
									readOnly
								/>
							</Form.Group>
							<Form.Group controlId='profile.ControlPhone' className='mb-4'>
								<Form.Label>Teléfono</Form.Label>
								<Form.Control
									type='text'
									value={user.telefono}
									disabled
									readOnly
								/>
							</Form.Group>
							<Stack direction='horizontal' gap={3}>
								<Button
									disabled
									variant='outline-primary'
								// onClick={() => allowProfileEdit()}
								>
									Editar perfil <i className='bi bi-pencil-square'></i>
								</Button>
								<Button
									variant='danger'
								// onClick={() => logOut()}
								>
									Cerrar sesión
								</Button>
							</Stack>
						</Form>
						: <p>Inicia sesión para ver tu perfil</p>}
					{/* <p className='fs-5'><strong>Nombre:</strong></p>
					<p className='fs-5'><strong>Fecha de nacimiento:</strong></p>
					<p className='fs-5'><strong>Teléfono:</strong></p>
					<p className='fs-5'><strong>Dirección:</strong></p>
					<p className='fs-5'><strong>Email:</strong> nombre@ejemplo.com</p>
					 */}
				</Col>
			</Container>
		</div>
	);
};

export default ProfilePage;
