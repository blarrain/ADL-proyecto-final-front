import { createContext, useState } from 'react';

export const ArticulosContext = createContext();

const ArticulosProvider = ({ children }) => {
	const [articulos, setArticulos] = useState([]);

	const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

	const getAllArticulos = async () => {
		const endpoint = `${BASE_URL}/articulos`;
		const res = await fetch(endpoint);
		const data = await res.json();
		setArticulos(data);
		return data;
	};

	return (
		<ArticulosContext.Provider value={{ articulos, getAllArticulos }}>
			{children}
		</ArticulosContext.Provider>
	);
};

export default ArticulosProvider;
