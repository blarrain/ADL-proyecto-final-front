import React, { useContext, useState } from 'react';
import {
	Container,
	Row,
	Col,
	Card,
	Form,
	Button,
	Image,
} from 'react-bootstrap';
import Swal from 'sweetalert2';
import { UserContext } from '../context/userContext';
// import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { login } = useContext(UserContext);

	// const verificaDatos = async (e) => {
	// 	e.preventDefault();
	// 	const response = await login(email, password);
	// 	alert(response?.message || 'Algo salió mal');
	// };


	const iniciarSesion = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      Swal.fire("Error", "Debe ingresar email y contraseña", "error");
      return;
    }

    if (password.length < 6) {
      Swal.fire(
        "Error",
        "La contraseña debe tener al menos 6 caracteres",
        "error",
      );
      return;
    }

    const result = await login(email, password);

    if (!result.ok) {
      Swal.fire("Error", result.message, "error");
      return;
    }

    Swal.fire("Bienvenido", result.message, "success");
  };

	return (
		<Container className='my-5'>
			<Row className='justify-content-center'>
				<Col>
					<Card className='shadow'>
						<Row className='g-0'>
							{/* Imagen */}
							<Col md={6}>
								<Image
									src='/src/assets/img/logoJRB.png'
									fluid
									className='h-100'
								/>
							</Col>

							{/* Formulario */}
							<Col md={6} className='p-4'>
								<h3 className='text-center mb-4'>Ingreso de clientes</h3>

								<Form onSubmit={iniciarSesion}>
									<Form.Group className='mb-3'>
										<Form.Label>Email</Form.Label>
										<Form.Control
											type='email'
											placeholder='name@example.com'
											onChange={(e) => setEmail(e.target.value)}
										/>
									</Form.Group>

									<Form.Group className='mb-4'>
										<Form.Label>Contraseña</Form.Label>
										<Form.Control
											type='password'
											placeholder='Ingrese contraseña'
											onChange={(e) => setPassword(e.target.value)}
										/>
									</Form.Group>

									<Button type='submit' variant='primary' className='w-100'>
										Iniciar sesión
									</Button>
									<label className='text-center mt-3 w-100'>
										Si no tienes cuenta puedes{' '}
										<Card.Link href='/register'> Registrarte</Card.Link>
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
