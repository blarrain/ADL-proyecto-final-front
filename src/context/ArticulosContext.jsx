import { createContext, useEffect, useState } from 'react';
/* eslint-disable-next-line react-refresh/only-export-components */
export const ArticulosContext = createContext();

const ArticulosProvider = ({ children }) => {
	const [articulos, setArticulos] = useState([]);
	const [categorias, setCategorias] = useState([]);

	const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

	const getAllArticulos = async () => {
		const endpoint = `${BASE_URL}/articulos`;
		const res = await fetch(endpoint);
		const data = await res.json();
		setArticulos(data);
	};

	const getAllCategorias = async () => {
		const endpoint = `${BASE_URL}/categorias`;
		const res = await fetch(endpoint);
		const data = await res.json();
		setCategorias(data);
	};

	useEffect(() => {
		getAllArticulos()
		getAllCategorias();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [articulos, getAllArticulos]);

	return (
		<ArticulosContext.Provider
			value={{ articulos, categorias, getAllArticulos, BASE_URL }}
		>
			{children}
		</ArticulosContext.Provider>
	);
};

export default ArticulosProvider;
