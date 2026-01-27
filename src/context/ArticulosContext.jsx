import { createContext, useEffect, useState } from 'react';
/* eslint-disable-next-line react-refresh/only-export-components */
export const ArticulosContext = createContext();

const ArticulosProvider = ({ children }) => {
	const [articulos, setArticulos] = useState([]);
	const [categorias, setCategorias] = useState([]);

	const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

	const getAllArticulos = async () => {
		try {
			const res = await fetch(`${BASE_URL}/articulos`);
			const data = await res.json();
			setArticulos(data);
		} catch (error) {
			console.error('ERROR ARTICULOS:', error);
		}
	};

	const getAllCategorias = async () => {
		try {
			const res = await fetch(`${BASE_URL}/categorias`);
			const data = await res.json();
			setCategorias(data);
		} catch (error) {
			console.error('ERROR CATEGORIAS:', error);
		}
	};

	useEffect(() => {
		getAllArticulos()
		getAllCategorias();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<ArticulosContext.Provider
			value={{ articulos, categorias, getAllArticulos, BASE_URL }}
		>
			{children}
		</ArticulosContext.Provider>
	);
};

export default ArticulosProvider;
