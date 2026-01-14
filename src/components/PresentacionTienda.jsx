import { Container, Row, Col, Card } from "react-bootstrap";

const PresentacionTienda = () => {
  return (
    <section className="py-5" style={{ backgroundColor: "#f6fbf7" }}>
      <Container>
        {/* TÍTULO */}
        <div className="text-center mb-5">
          <h2 className="text-success fw-bold">
            Bienvenidos a JRB Vivero
          </h2>
          <p className="text-muted mt-3 mx-auto" style={{ maxWidth: "700px" }}>
            Conectamos naturaleza y tecnología para acercar plantas, flores y
            árboles a tu hogar de forma simple y consciente.
          </p>
        </div>

        <Row className="g-4">
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm text-center p-3">
              <Card.Body>
                <div className="fs-1 mb-3 text-success">
                  <i className="bi bi-flower1"></i>
                </div>
                <Card.Title>Nuestra propuesta</Card.Title>
                <Card.Text className="text-muted">
                  Ofrecemos una cuidada selección de plantas ornamentales,
                  aromáticas y árboles frutales, adaptadas a distintos espacios
                  y niveles de experiencia.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm text-center p-3">
              <Card.Body>
                <div className="fs-1 mb-3 text-success">
                  <i className="bi bi-leaf"></i>
                </div>
                <Card.Title>Para todos</Card.Title>
                <Card.Text className="text-muted">
                  Pensado tanto para quienes recién comienzan en la jardinería
                  como para quienes ya disfrutan del cultivo y el cuidado
                  consciente de las plantas.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm text-center p-3">
              <Card.Body>
                <div className="fs-1 mb-3 text-success">
                  <i className="bi bi-shop"></i>
                </div>
                <Card.Title>Nuestra visión</Card.Title>
                <Card.Text className="text-muted">
                  Convertirnos en un vivero digital de referencia, donde la
                  experiencia de compra sea simple, clara y confiable,
                  combinando tecnología y naturaleza.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PresentacionTienda;
