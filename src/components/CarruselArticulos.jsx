import Carousel from "react-bootstrap/Carousel";
import { articulos } from "../assets/data/datos";

const CarruselArticulos = () => {
  return (
    <Carousel className="mb-5">
      {articulos
        .filter((a) => a.activo)
        .slice(0, 5) // solo 5
        .map((articulo) => (
          <Carousel.Item key={articulo.id_articulo}>
            <img
              className="d-block w-100"
              src={articulo.imagen_url}
              alt={articulo.nombre}
              style={{
                height: "400px",
                objectFit: "cover",
              }}
            />

            <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-3">
              <h5>{articulo.nombre}</h5>
              <p>{articulo.descripcion}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
    </Carousel>
  );
};

export default CarruselArticulos;
