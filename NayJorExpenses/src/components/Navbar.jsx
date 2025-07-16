import React from 'react';
import '../ComponentsStyles/Navbar.css'; 

const Navbar = ({ onLoginClick, onRegisterClick }) => {
  return (
    <nav className="navbar">
      <h1 className="logo">Nday Jor</h1>
      <div className="actions">
        <button onClick={onLoginClick}>Login</button>
        <button onClick={onRegisterClick}>Register</button>
      </div>
    </nav>
  );
};

export default Navbar;