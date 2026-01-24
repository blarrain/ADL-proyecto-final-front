import { createContext, useEffect, useState } from 'react';
// import { users } from '../assets/data/users';
import { useNavigate } from 'react-router-dom';
export const UserContext = createContext();

const UserProvider = ({ children }) => {
	const [token, setToken] = useState(localStorage.getItem('token'));
	// const [email, setEmail] = useState('');
	// const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);
	const [cargaUser, setCargaUser] = useState(true);
	// const [msgError, setMsgError] = useState('');

	const navigate = useNavigate();
	const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

	// Persistencia
	useEffect(() => {
		if (token) {
			localStorage.setItem('token', token);
		} else {
			localStorage.removeItem('token');
			setUser(null);
		}
	}, [token]);

	// User
	useEffect(() => {
    const cargarUsuario = async () => {
      if (!token) {
        setCargaUser(false);
        return;
      }

      try {
        const res = await fetch(`${BASE_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Token inválido");

        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error("❌ Error cargando usuario:", error);
        setToken(null);
        // setUser(null);
      } finally {
        setCargaUser(false);
      }
    };

    cargarUsuario();
  }, [token, BASE_URL]);



	// Login
	const login = async (email, password) => {
		try {
			const response = await fetch(`${BASE_URL}/auth/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password }),
			});
	
			const data = await response.json();
			
			if(!response.ok){
				return{
					ok:false,
					message: data.message || data.message || 'Error al inicio de sesion'
				}
			}
			
			setToken(data.token)
			setUser(data.usuario)
			navigate(`/store`);

			return{
				ok:true,
				message:data.message,
			}
		} catch (error) {
			console.error('❌ Error login:', error);
      return {
        ok: false,
        message: 'No se pudo conectar con el servidor',
		}
	 }
	}

	const logout = () => {
		setToken(null);
		setUser(null);
		navigate('/login');
	};

	return (
		<UserContext.Provider
			value={{
				token,
				user,
				cargaUser,
				login,
				logout,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;
