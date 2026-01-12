import React, { useContext } from 'react';
import { UserContext } from '../context/userContext';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Header from '../components/Header';

const ProfilePage = () => {
	const { user } = useContext(UserContext);
	return (
		<div>
			<Header h1Text='Mi perfil' pText={`Hola, ${user.displayName}`} />
			<Container>
				<Col xs={12} sm={10} md={8} lg={6} className='px-1 py-3 mx-auto'>
					{user ?
						<Form>
							<Form.Group controlId='profile.ControlEmail' className='mb-4'>
								<Form.Label>Email</Form.Label>
								<Form.Control
									type='email'
									value={user.email}
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
							<Form.Group controlId='profile.ControlEmail' className='mb-4'>
								<Form.Label>Email</Form.Label>
								<Form.Control
									type='email'
									value={user.email}
									disabled
									readOnly
								/>
							</Form.Group>
							<Button
								variant='outline-primary'
								// onClick={() => allowEditUser()}
							>
								Editar <i class='bi bi-pencil-square'></i>
							</Button>
							<Button
								variant='danger'
								// onClick={() => logOut()}
							>
								Cerrar sesión <i class='bi bi-door-open'></i>
							</Button>
						</Form>
					:	<p>Inicia sesión para ver tu perfil</p>}
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
