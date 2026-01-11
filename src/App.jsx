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


import Container from 'react-bootstrap/Container';
import DetailArticle from './pages/DetailArticle';

function App() {
  const { user } = useContext(UserContext)
  return (
    <>
      <div className="page-wrapper">
        <Container>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/profile"
              element={user ? <ProfilePage /> : <Navigate to="/login" />}
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/store" element={<StorePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/article" element={<ArticlePage />} />
            <Route path="/detail/:id" element={<DetailArticle />} />
          </Routes>

          <Footer />
        </Container>
      </div>
    </>
  );
}

export default App;
