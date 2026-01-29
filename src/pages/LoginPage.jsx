import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

import miLogo from './../assets/img/logoJRB.png';

import Swal from 'sweetalert2';
import { UserContext } from '../context/UserContext';
// import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { login } = useContext(UserContext);

	/* 	const navigate = useNavigate();
	 */
	// const verificaDatos = async (e) => {
	// 	e.preventDefault();
	// 	const response = await login(email, password);
	// 	alert(response?.message || 'Algo salió mal');
	// };

	const iniciarSesion = async (e) => {
		e.preventDefault();

		if (!email.trim() || !password.trim()) {
			Swal.fire('Error', 'Debe ingresar email y contraseña', 'error');
			return;
		}

		if (password.length < 6) {
			Swal.fire(
				'Error',
				'La contraseña debe tener al menos 6 caracteres',
				'error',
			);
			return;
		}

		const result = await login(email, password);

		if (!result.ok) {
			Swal.fire('Error', result.message, 'error');
			return;
		}

		Swal.fire('Bienvenido', result.message, 'success');
	};

	return (
		<Container className='my-5'>
			<Row className='justify-content-center'>
				<Col>
					<Card className='shadow'>
						<Row className='g-0'>
							{/* Imagen */}
							<Col md={6}>
								<Image src={miLogo} fluid className='h-100' />
							</Col>

							{/* Formulario */}
							<Col md={6} className='p-4'>
								<h3 className='text-center mb-4'>Ingreso de clientes</h3>

								<Form onSubmit={iniciarSesion} autoComplete='off'>
									<Form.Group className='mb-3'>
										<Form.Label>Email</Form.Label>
										<Form.Control
											type='email'
											name='email'
											placeholder='name@example.com'
											autoComplete='new-email'
											value={email}
											onChange={(e) => setEmail(e.target.value)}
										/>
									</Form.Group>

									<Form.Group className='mb-4'>
										<Form.Label>Contraseña</Form.Label>
										<Form.Control
											type='password'
											name='password'
											placeholder='Ingrese contraseña'
											autoComplete='new-password'
											value={password}
											onChange={(e) => setPassword(e.target.value)}
										/>
									</Form.Group>

									<Button type='submit' variant='primary' className='w-100'>
										Iniciar sesión
									</Button>
									<label className='text-center mt-3 w-100'>
										Si no tienes cuenta,{' '}
										<Card.Link as={Link} to='/register'>
											{' '}
											Regístrate
										</Card.Link>
									</label>
								</Form>
							</Col>
						</Row>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default LoginPage;
