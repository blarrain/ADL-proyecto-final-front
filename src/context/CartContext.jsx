import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./userContext";


export const CartContext = createContext();

const CartProvider = ({ children }) => {
   const { user } = useContext(UserContext);
   const cartKey = user?.id_usuario
    ? `cart_${user.id_usuario}`
    : "cart_guest";

  // crea el carrito por usuario  
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem(cartKey)) || [];
  });

  const [mostrar, setMostrar] = useState(false);

  // Cuando cambia de usuario cara su carro  
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem(cartKey)) || [];
    setCart(storedCart);
  }, [cartKey]);

  // persite el carro usuario
  useEffect(() => {
    localStorage.setItem(cartKey, JSON.stringify(cart));
  }, [cart, cartKey]);


  // Agregar producto JSON
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
    setCart((prev) =>
      prev.map((item) =>
        item.id_articulo === id_articulo
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const restaCart = (id_articulo) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id_articulo === id_articulo
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (id_articulo) => {
    setCart((prev) => prev.filter((item) => item.id_articulo !== id_articulo));
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
        mostrar,
        setMostrar
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
