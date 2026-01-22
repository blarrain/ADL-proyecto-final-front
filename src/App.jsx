import './App.css';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/Home';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './context/userContext';
import RegisterPage from './pages/RegisterPage';
import StorePage from './pages/StorePage';
import CartPage from './pages/CartPage';
import ArticlePage from './pages/ArticlePage';
import Footer from './components/Footer';

import DetailArticle from './pages/DetailArticle';
import FavoritesPages from './pages/FavoritesPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
	const { user } = useContext(UserContext);
	const { token } = useContext(UserContext);

	return (
		<>
			<Navbar />
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route
					path='/profile'
					element={token ? <ProfilePage /> : <Navigate to='/login' />}
				/>
				<Route
					path='/login'
					element={token ? <Navigate to='/profile' /> : <LoginPage />}
				/>
				<Route path='/register' element={<RegisterPage />} />
				<Route path='/store' element={<StorePage />} />
				<Route
					path='/cart'
					element={token ? <CartPage /> : <Navigate to='/login' />}
				/>
				<Route
					path='/article'
					element={token && user?.rol === 'admin' ? <ArticlePage /> : <Navigate to='/store' />}
				/>
				<Route
					path='/favorite'
					element={token ? <NotFoundPage /> : <Navigate to='/login' />}
				/>
				<Route
					path='/detail/:id'
					element={<DetailArticle />}
				/>
				<Route path='*' element={<NotFoundPage />} /> {/* /404 */}
			</Routes>

			<Footer />
		</>
	);
}

export default App;
