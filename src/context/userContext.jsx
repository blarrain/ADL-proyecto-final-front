import { createContext, useEffect, useState } from 'react';
// import { users } from '../assets/data/users';
import { useNavigate } from 'react-router-dom';
export const UserContext = createContext();

const UserProvider = ({ children }) => {
	const [token, setToken] = useState(localStorage.getItem('token'));
	// const [email, setEmail] = useState('');
	// const [password, setPassword] = useState('');
	const [user, setUser] = useState([]);
	// const [msgError, setMsgError] = useState('');
	const navigate = useNavigate();

	const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

	useEffect(() => {
		if (token) {
			localStorage.setItem('token', token);
		} else {
			localStorage.removeItem('token');
		}
	}, [token]);

	const login = async (email, password) => {
		const response = await fetch(`${BASE_URL}/auth/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
		});

		const data = await response.json();
		setToken(data.token || null)
		console.log(token)
		setUser(data.usuario || null);
		console.log(user)
		navigate(`/store`);

		return data;
	};

	const logout = () => {
		setToken(null);
		setUser(null);
	};

	return (
		<UserContext.Provider
			value={{
				token,
				user,
				login,
				logout,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
export default UserProvider;
