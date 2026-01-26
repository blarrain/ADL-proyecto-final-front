import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Header from "../components/Header";
import Stack from "react-bootstrap/Stack";
import Swal from "sweetalert2";
import { useComunas } from "../hooks/UseComunas.js";
import { Row } from "react-bootstrap";
import InputForm from "../components/Input.jsx";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

const ProfilePage = () => {
  const { perfil, updatePerfil, logout } = useContext(UserContext);
  const comunas = useComunas();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    comuna: "",
    direccion: "",
    telefono: "",
  });

  useEffect(() => {
    if (perfil) {
      setFormData({
        nombres: perfil.nombres || "",
        apellidos: perfil.apellidos || "",
        comuna: perfil.comuna || "",
        direccion: perfil.direccion || "",
        telefono: perfil.telefono || "",
      });
    }
  }, [perfil]);


  const handleChange = ({ target }) => {
    setFormData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const handleSave = async () => {
    if (!perfil?.id_usuario) return;

    try {
      const res = await fetch(
        `${BASE_URL}/usuarios/${perfil.id_usuario}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Error al actualizar perfil");
      }

      // sincronizar contexto con backend
      updatePerfil(data.usuario);

      Swal.fire("Perfil actualizado", "", "success");
      setEditMode(false);

    } catch (error) {
      console.error("ERROR UPDATE PERFIL:", error);
      Swal.fire("Error", error.message, "error");
    }
  };

  if (!perfil) {
    return <p className="text-center mt-5">Cargando perfil...</p>;
  }

  return (
    <div>
      <Header h1Text="Mi perfil" pText={`Hola, ${perfil.nombres}`} />

      <Container>
        <Col xs={12} sm={10} md={8} lg={8} className="px-1 py-3 mx-auto">
          <Form>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group className="mb-4">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombres"
                    value={formData.nombres}
                    onChange={handleChange}
                    disabled={!editMode}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-4">
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control
                    type="text"
                    name="apellidos"
                    value={formData.apellidos}
                    onChange={handleChange}
                    disabled={!editMode}
                  />
                </Form.Group>
              </Col>



              <Col md={6}>
                <Form.Group className="mb-4">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={perfil.email}
                    disabled
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-4">
                  <Form.Label>Comuna</Form.Label>

                  <Form.Select
                    name="comuna"
                    value={formData.comuna}
                    onChange={handleChange}
                    disabled={!editMode || comunas.length === 0}
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
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-4">
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control
                    type="text"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                    disabled={!editMode}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-4">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    type="text"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    disabled={!editMode}
                  />
                </Form.Group>

              </Col>
              <Col md={12} className="d-flex justify-content-center">
                <Stack direction="horizontal" gap={3}>
                  {!editMode ? (
                    <Button
                      variant="outline-primary"
                      onClick={() => setEditMode(true)}
                    >
                      Editar perfil
                    </Button>
                  ) : (
                    <Button variant="success" onClick={handleSave}>
                      Guardar cambios
                    </Button>
                  )}

                  <Button variant="danger" onClick={logout}>
                    Cerrar sesión
                  </Button>
                </Stack>
              </Col>
            </Row>











          </Form>
        </Col>
      </Container>
    </div>
  );
};

export default ProfilePage;

