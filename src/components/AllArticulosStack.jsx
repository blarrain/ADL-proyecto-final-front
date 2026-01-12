import React from 'react';
import { articulos } from '../assets/data/datos';
import SingleArticuloRow from './SingleArticuloRow';

const AllArticulosStack = () => {
	return (
		<div>
			<h2>Todos los artículos</h2>
			{articulos.map((art) => (
				<SingleArticuloRow
					key={art.id_articulo}
					id_articulo={art.id_articulo}
					nombre={art.nombre}
				/>
			))}
		</div>
	);
};

export default AllArticulosStack;
