import React from 'react'
import { Button, Card, Col, Container, Form, Image, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { articulos } from "../assets/data/datos";

const DetailArticle = () => {
    const { id } = useParams()

    /* Mientras se usa la ID y se le resta 1 para buscar en el arreglo, cuando se habilite el backend se buscará directo por ID */
    const detalleArticulo = articulos[id - 1];

    return (
        <Container className="my-5 p-0 min">

            <Card className="shadow">
                <Row className="g-0">

                    {/* Imagen */}
                    <Col md={4} className="d-flex align-items-center justify-content-center">
                        <Image
                            src={detalleArticulo.imagen_url}
                            className='m-4'
                            style={{
                                maxWidth: '300px',
                                maxHeight: '300px',
                                objectFit: 'cover',

                            }}
                        />
                    </Col>

                    {/* Formulario */}
                    <Col md={8} className="p-5">
                        <h3 className="text-center mb-4">
                            {detalleArticulo.nombre}
                        </h3>


                        <Form.Group className="mb-3">
                            <Form.Label>{detalleArticulo.descripcion}</Form.Label>
                        </Form.Group>

                        <Form.Group className="mb-3 text-center mt-5">
                            <h4>${detalleArticulo.precio.toLocaleString("es-CL")}</h4>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Button variant="primary" className="w-100">
                                Agregar al carrito <i className="bi bi-cart-plus"></i>
                            </Button>
                        </Form.Group>


                    </Col>
                </Row>
            </Card>

        </Container>
    )
}

export default DetailArticle
