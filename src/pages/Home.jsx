import React from 'react'

import CardArticulo from "../components/CardArticulo";
import { articulos } from "../assets/data/datos.js";
import Header from '../components/Header.jsx';

const HomePage = () => {
  return (
    <div>
      <main className="container p-0">
        <Header />
        <section className="row">
          {articulos.map((art) => (
            <article
              key={art.id_articulo}
              className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 my-3"
            >
              <CardArticulo
                id={art.id_articulo}
                name={art.nombre}
                img={art.imagen_url}
                price={art.precio}
              />
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

export default HomePage
