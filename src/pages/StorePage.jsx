import React from 'react'
import Col from 'react-bootstrap/esm/Col'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import CardArticulo from './../components/CardArticulo.jsx';
import Header from '../components/Header.jsx';

const StorePage = () => {
    return (
        <div>
            <Header h1Text='Tienda' pText='Todos los artículos' />
            <Container>
                <Row>
                    <Col xs={12} sm={8} md={4} lg={3}>
                        <CardArticulo />
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default StorePage
