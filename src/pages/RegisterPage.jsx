import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Image } from "react-bootstrap";
import Swal from "sweetalert2";
import InputForm from "../components/Input";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nombres, setNombres] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [fecha_nacimiento, setFechaNacimiento] = useState("");
    const [telefono, setTelefono] = useState("");
    const [comuna, setComuna] = useState("");
    const [direccion, setDireccion] = useState("");

    const validarDatos = (e) => {
        e.preventDefault();

        /* if (!email.trim() || !pass.trim()) {
            Swal.fire("Error", "Debe ingresar todos los campos", "error");
            return;
        } */

        /*  if (pass.length < 6) {
             Swal.fire("Error", "Contraseña mínimo 6 caracteres", "error");
             return;
         } */



        Swal.fire("Éxito", "Ingreso correcto ", "success");


        setEmail("")
        setPassword("")
        setNombres("")
        setApellidos("")
        setFechaNacimiento("")
        setTelefono("")
        setComuna("")
        setDireccion("")
    };


    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col>
                    <Card className="shadow">
                        <Row className="g-0">

                            {/* Imagen */}
                            <Col md={4} className="d-flex align-items-center">
                                <Image
                                    src="/src/assets/img/logoJRB.png"
                                    fluid
                                />

                            </Col>

                            {/* Formulario */}
                            <Col md={8} className="p-4">
                                <h3 className="text-center mb-4">
                                    Crear Cuenta
                                </h3>

                                <Form onSubmit={validarDatos}>
                                    <Row className="mb-3">
                                        <Col md={6}>
                                            <InputForm id="nombres" name="Nombre(s)" onChange={(e) => setNombres(e.target.value)} ></InputForm>
                                        </Col>
                                        <Col md={6}>
                                            <InputForm id="apellidos" name="Apellido(s)" onChange={(e) => setApellidos(e.target.value)} ></InputForm>
                                        </Col>

                                        <Col md={6}>
                                            <InputForm id="email" name="Email" type="email" onChange={(e) => setEmail(e.target.value)} ></InputForm>
                                        </Col>
                                        <Col md={6}>
                                            <InputForm id="password" name="Contraseña" type="password" onChange={(e) => setPassword(e.target.value)} ></InputForm>
                                        </Col>

                                        <Col md={6}>
                                            <InputForm id="fecha_nacimiento" name="Fecha de Nacimiento" type="date" onChange={(e) => setFechaNacimiento(e.target.value)} ></InputForm>
                                        </Col>
                                        <Col md={6}>
                                            <InputForm id="telefono" name="Teléfono" type="number" onChange={(e) => setTelefono(e.target.value)}></InputForm>
                                        </Col>

                                        <Col md={6}>
                                            <InputForm id="comuna" name="Comuna" onChange={(e) => setComuna(e.target.value)}></InputForm>
                                        </Col>
                                        <Col md={6}>
                                            <InputForm id="direccion" name="Dirección" onChange={(e) => setDireccion(e.target.value)}></InputForm>
                                        </Col>
                                    </Row>

                                    <Button type="submit" variant="primary" className="w-100">
                                        Crear Cuenta
                                    </Button>


                                    <label className="text-center mt-3 w-100">
                                        ¿Tienes cuenta?, <Card.Link href="/login"> Inicia Sesión</Card.Link>
                                    </label>

                                </Form>

                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Container >
    );
};

export default LoginPage
