import { createContext, useState } from 'react';

export const ArticulosContext = createContext();

const ArticulosProvider = ({ children }) => {
	const [articulos, setArticulos] = useState([]);
	const categorias = [
		{ nombre: 'categoria 1', id_categoria: 1 },
		{ nombre: 'categoria 2', id_categoria: 2 },
	];

	const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

	const getAllArticulos = async () => {
		const endpoint = `${BASE_URL}/articulos`;
		const res = await fetch(endpoint);
		const data = await res.json();
		setArticulos(data);
		return data;
	};

	return (
		<ArticulosContext.Provider
			value={{ articulos, categorias, getAllArticulos, BASE_URL }}
		>
			{children}
		</ArticulosContext.Provider>
	);
};

export default ArticulosProvider;
