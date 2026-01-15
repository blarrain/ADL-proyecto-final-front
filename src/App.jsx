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

function App() {
  const { user } = useContext(UserContext)

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/store" element={user ? <StorePage /> : <Navigate to="/login" />} />
        <Route path="/cart" element={user ? <CartPage /> : <Navigate to="/login" />} />
        <Route path="/article" element={user ? <ArticlePage /> : <Navigate to="/login" />} />
        <Route path="/favorite" element={user ? <FavoritesPages /> : <Navigate to="/login" />} />
        <Route path="/detail/:id" element={user ? <DetailArticle /> : <Navigate to="/login" />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
