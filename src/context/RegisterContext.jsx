import { createContext, useState } from "react";

export const RegisterContext = createContext();

const RegisterProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

  const registerUser = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${BASE_URL}/usuarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          rol: "cliente", //rol para asegurar 
        }),
      });

      const contentType = res.headers.get("content-type");

      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("El servidor no respondió con JSON");
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Error al registrar usuario");
      }

      if (!res.ok) {
        throw new Error(data?.message || "Error al registrar usuario");
      }

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
    <RegisterContext.Provider
      value={{
        registerUser,
        loading,
        error,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
};

export default RegisterProvider;