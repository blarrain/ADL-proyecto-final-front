import { createContext, useState } from "react";
import { users } from "../assets/data/users";
import { useNavigate } from "react-router-dom";
export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [token, setToken] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState(null)
    const [msgError, setMsgError] = useState("");
    const navigate = useNavigate()

    const logout = () => {
        setToken(false)
        setUser(null)
    }

    const login = async (e) => {

        let userValid = false

        for (let element of users) {
            if (element.email == email && element.password == password) {
                userValid = true
                setUser(element)
                break
            }
        };

        if (!userValid) {
            setMsgError("Error en las credenciales")
            setToken(false)
        } else {
            setMsgError("")
            setToken(true)
            navigate(`/store`)
        }

    }

    return (
        <UserContext.Provider value={{ token, email, password, user, setToken, setEmail, setPassword, logout, login, msgError, setMsgError }}>
            {children}
        </UserContext.Provider>
    );
};
export default UserProvider;