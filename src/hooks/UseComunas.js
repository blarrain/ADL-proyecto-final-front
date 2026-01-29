
import { useEffect, useState } from "react";

export const useComunas = () => {
  const [comunas, setComunas] = useState([]);
  const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    fetch(`${BASE_URL}/comunas`)
      .then((res) => {
        if (!res.ok) throw new Error("Error cargando comunas");
        return res.json();
      })
      .then((data) => setComunas(data))
      .catch((err) => {
        console.error("Error useComunas:", err.message);
        setComunas([]);
      });
  }, []);

  return comunas;
};
