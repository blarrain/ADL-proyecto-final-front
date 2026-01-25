
import { useEffect, useState } from "react";

export const useComunas = () => {
  const [comunas, setComunas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/comunas")
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
