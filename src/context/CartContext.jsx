import { createContext, useState } from 'react';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([]);

	const addToCart = (articulo) => {
		setCart((oldCart) => {
			const existe = oldCart.find((item) => item.id === articulo.id);
			if (existe) {
				return oldCart.map((item) =>
					item.id === articulo.id ? { ...item, qty: item.qty + 1 } : item
				);
			} else {
				return [...oldCart, { ...articulo, qty: 1 }];
			}
		});
	};

	return (
		<CartContext.Provider value={{ cart, setCart, addToCart }}>
			{children}
		</CartContext.Provider>
	);
};

export default CartProvider;
