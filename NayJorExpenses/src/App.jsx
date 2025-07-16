import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Modal from './components/Modal';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

// Pages
import Dashboard from './pages/Dashboard';
import ExpensePage from './pages/ExpensePage';
import SalePage from './pages/SalePage';
import CategoriesPage from './pages/CategoriesPage';
import Home from './pages/Home'; // ✅ NEW Home page

// Context
import { AuthProvider, AuthContext } from './context/AuthProvider';

// ✅ Protect routes that require login
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/" replace />;
};

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <Navbar
          onLoginClick={() => setShowLogin(true)}
          onRegisterClick={() => setShowRegister(true)}
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/expenses" element={<ProtectedRoute><ExpensePage /></ProtectedRoute>} />
          <Route path="/sales" element={<ProtectedRoute><SalePage /></ProtectedRoute>} />
          <Route path="/categories" element={<ProtectedRoute><CategoriesPage /></ProtectedRoute>} />
        </Routes>

        {showLogin && (
          <Modal onClose={() => setShowLogin(false)}>
            <LoginForm onLogin={() => setShowLogin(false)} />
          </Modal>
        )}

        {showRegister && (
          <Modal onClose={() => setShowRegister(false)}>
            <RegisterForm onRegister={() => setShowRegister(false)} />
          </Modal>
        )}
      </Router>
    </AuthProvider>
  );
}

export default App;
