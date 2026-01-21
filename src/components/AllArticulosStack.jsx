import { useContext } from 'react';
import { ArticulosContext } from '../context/ArticulosContext';
import SingleArticuloRow from './SingleArticuloRow';

const AllArticulosStack = () => {
	const { articulos } = useContext(ArticulosContext);


	return (
		<div>
			<h2>Todos los artículos</h2>
            <div className='fw-bold'>ID - Nombre</div>
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
