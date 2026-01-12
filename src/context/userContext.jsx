import { createContext, useState } from "react";
export const UserContext = createContext();
const UserProvider = ({ children }) => {
    /* const [user, setUser] = useState(null); */
    const [user, setUser] = useState({
        email: "jperez@example.com",
        nombres: "Juan",
        apellidos: "Pérez",
        telefono: "123-456-7890",
        direccion: "Calle Falsa 123",
        comuna: "Santiago"
    });
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
export default UserProvider;