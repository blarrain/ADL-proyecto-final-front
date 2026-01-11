import React from 'react'

import CardArticulo from "../components/CardArticulo";
import {articulos} from "../assets/data/datos.js";
import Header from '../components/Header.jsx';

const HomePage = () => {
    return (
      <div>
        <main class="container">
          <Header/>
          <section class="row">
            {articulos.map((art) => (
              <article
                key={art.id}
                class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 my-4"
              >
                <CardArticulo
                  id={art.id}
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
