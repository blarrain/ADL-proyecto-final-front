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

	const sumaCart = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const restaCart = (id) => {
    setCart(cart
      .map(item =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter(item => item.quantity > 0)
    );
  };

    const total = cart.reduce((sumAcum, item) => sumAcum + item.price * item.quantity, 0);
	return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        sumaCart,
        restaCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
