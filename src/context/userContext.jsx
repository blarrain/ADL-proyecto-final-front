import { createContext, useState } from "react";
export const UserContext = createContext();
const UserProvider = ({ children }) => {
    /* const [user, setUser] = useState(null); */
    const [user, setUser] = useState({
        email: "user@user.com",
        displayName: "Usuario"
    });
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
export default UserProvider;