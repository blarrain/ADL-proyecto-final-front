import React, { useState, useContext } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import miLogo from './../assets/img/logoJRB.png';

import Swal from "sweetalert2";
import InputForm from "../components/Input";

import { RegisterContext } from "../context/RegisterContext";
import { useNavigate } from "react-router-dom";

import { useComunas } from "../hooks/UseComunas.js";


const RegisterPage = () => {
  const navigate = useNavigate();
  const { registerUser, loading:loadingRegister  } = useContext(RegisterContext);
  const comunas = useComunas();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [fecha_nacimiento, setFechaNacimiento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [comuna, setComuna] = useState("");
  const [direccion, setDireccion] = useState("");

  const cargarDatos = async (e) => {
    e.preventDefault();

    if (!email || !password || !nombres || !apellidos) {
      Swal.fire("Error", "Completa los campos obligatorios", "error");
      return;
    }

    if (!comuna) {
      Swal.fire("Error", "Selecciona una comuna", "error");
      return;
    }


    const payload = {
      email,
      password,
      nombres,
      apellidos,
      fecha_nacimiento,
      telefono,
      comuna,
      direccion,
      imagen_url: null, // o default
    };

    const result = await registerUser(payload);

    if (!result.ok) {
      Swal.fire("Error", result.message, "error");
      return;
    }

    Swal.fire("Registro exitoso", "Ahora puedes iniciar sesión", "success");

    navigate("/login");
  };


  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col>
          <Card className="shadow">
            <Row className="g-0">
              {/* Imagen */}
              <Col md={4} className="d-flex align-items-center">
                <Image src={miLogo} fluid />
              </Col>

              {/* Formulario */}
              <Col md={8} className="p-4">
                <h3 className="text-center mb-4">Crear Cuenta</h3>

                <Form onSubmit={cargarDatos} autoComplete="off">
                  <Row className="mb-3">
                    <Col md={6}>
                      <InputForm
                        id="nombres"
                        name="Nombre(s)"
                        onChange={(e) => setNombres(e.target.value)}
                      ></InputForm>
                    </Col>
                    <Col md={6}>
                      <InputForm
                        id="apellidos"
                        name="Apellido(s)"
                        onChange={(e) => setApellidos(e.target.value)}
                      ></InputForm>
                    </Col>

                    <Col md={6}>
                      <InputForm
                        id="email"
                        name="Email"
                        type="email"
                        autoComplete="new-email"
                        onChange={(e) => setEmail(e.target.value)}
                      ></InputForm>
                    </Col>
                    <Col md={6}>
                      <InputForm
                        id="password"
                        name="Contraseña"
                        type="password"
                        autoComplete="new-password"
                        onChange={(e) => setPassword(e.target.value)}
                      ></InputForm>
                    </Col>

                    <Col md={6}>
                      <InputForm
                        id="fecha_nacimiento"
                        name="Fecha de Nacimiento"
                        type="date"
                        onChange={(e) => setFechaNacimiento(e.target.value)}
                      ></InputForm>
                    </Col>
                    <Col md={6}>
                      <InputForm
                        id="telefono"
                        name="Teléfono"
                        type="number"
                        onChange={(e) => setTelefono(e.target.value)}
                      ></InputForm>
                    </Col>

                    <Col md={6}>
                      <InputForm
                        id="comuna"
                        name="Comuna"
                        as="select"
                        value={comuna}
                        onChange={(e) => setComuna(e.target.value)}
                        disabled={comunas.length === 0}
                      >
                        <option value="">
                          {comunas.length === 0
                            ? "Cargando comunas..."
                            : "Selecciona tu comuna"}
                        </option>

                        {comunas.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </InputForm>
                    </Col>

                    <Col md={6}>
                      <InputForm
                        id="direccion"
                        name="Dirección"
                        onChange={(e) => setDireccion(e.target.value)}
                      ></InputForm>
                    </Col>
                  </Row>

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-100"
                    disabled={loadingRegister}
                  >
                    {loadingRegister ? "Creando cuenta..." : "Crear Cuenta"}
                  </Button>

                  <label className="text-center mt-3 w-100">
                    ¿Tienes cuenta?,{" "}
                    <Card.Link href="/login"> Inicia Sesión</Card.Link>
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

export default RegisterPage 
