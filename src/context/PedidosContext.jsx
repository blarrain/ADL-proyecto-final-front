import { createContext, useContext, useState } from "react";
import { UserContext } from "./UserContext";

export const PedidosContext = createContext();

const PedidosProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { token } = useContext(UserContext);

    const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

    const crearPedido = async (formData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${BASE_URL}/pedidos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ...formData,
                    rol: "cliente", //rol para asegurar 
                }),
            });

            if (!response.ok) {
                alert(`Error: ${response.status} ${response.statusText}`);
                return;
            }
            const data = await response.json();

            return {
                ok: true,
                data,
            };

        } catch (err) {
            setError(err.message);
            return {
                ok: false,
                message: err.message,
            };
        } finally {
            setLoading(false);
        }
    };

    return (
        <PedidosContext.Provider
            value={{
                crearPedido,
                loading,
                error,
            }}
        >
            {children}
        </PedidosContext.Provider>
    );
};

export default PedidosProvider;