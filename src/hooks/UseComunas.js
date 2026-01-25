import { useEffect, useState } from "react";

export const useComunas = () => {
  const [comunas, setComunas] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.allorigins.win/raw?url=https://apis.digital.gob.cl/dpa/comunas"
    )
      .then((res) => res.json())
      .then((data) => setComunas(data.map((c) => c.nombre)))
      .catch(console.error);
  }, []);

  return comunas;
};
