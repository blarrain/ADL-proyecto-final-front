import { createContext, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Agregar producto desde JSON
  const addToCart = (articulo) => {
    setCart((prev) => {
      const existe = prev.find(
        (item) => item.id_articulo === articulo.id_articulo
      );

      if (existe) {
        return prev.map((item) =>
          item.id_articulo === articulo.id_articulo
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...prev,
        {
          id_articulo: articulo.id_articulo,
          nombre: articulo.nombre,
          precio: articulo.precio,
          imagen_url: articulo.imagen_url,
          quantity: 1,
        },
      ];
    });
  };

  const sumaCart = (id_articulo) => {
    setCart(
      cart.map((item) =>
        item.id_articulo === id_articulo
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const restaCart = (id_articulo) => {
    setCart(
      cart
        .map((item) =>
          item.id_articulo === id_articulo
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id_articulo) => {
    setCart(cart.filter((item) => item.id_articulo !== id_articulo));
  };

  const total = cart.reduce(
    (acc, item) => acc + item.precio * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        sumaCart,
        restaCart,
        removeItem,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
