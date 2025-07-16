import React, { useState } from 'react';
import logo from '../assets/logo.png';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import Modal from '../components/Modal';
import '../ComponentsStyles/Home.css';

const Home = () => {
  const user = localStorage.getItem('user');
  const [modalType, setModalType] = useState(null); // 'login' or 'register'

  const closeModal = () => setModalType(null);

  return (
    <div className="home-full-page">
      <header className="hero-section">
        <img src={logo} alt="Nday Jor Élégance Logo" className="logo-image" />
        <h1>Welcome to Nday Jor Élégance</h1>
        <p className="tagline">
          A digital solution for managing your fashion business operations in Senegal with clarity and ease.
        </p>
      </header>

      <section className="description-section">
        <p>
          Nday Jor Élégance is a private platform created for the owners and team behind the brand.
          Here, you can manage <strong>daily expenses</strong>, log your <strong>sales</strong>,
          and stay organized — whether you're at the boutique or working remotely.
        </p>
        <p>
          Cette application a été conçue pour les propriétaires de la marque Nday Jor Élégance.
          Elle vous permet de gérer vos <strong>dépenses quotidiennes</strong> et vos <strong>ventes</strong>,
          en toute simplicité.
        </p>
      </section>

      <section className="cta-section">
        {!user ? (
          <>
            <button onClick={() => setModalType('login')}>🔑 Login / Connexion</button>
            <button onClick={() => setModalType('register')}>📝 Register / Inscription</button>
          </>
        ) : (
          <>
            <p className="owner-greeting">Hello, {user}! / Bonjour, {user} !</p>
            <a href="/dashboard">
              <button>📋 Go to Dashboard / Aller au Tableau</button>
            </a>
          </>
        )}
      </section>

      {modalType && (
        <Modal onClose={closeModal}>
          {modalType === 'login' ? (
            <LoginForm onLogin={closeModal} />
          ) : (
            <RegisterForm onRegister={closeModal} />
          )}
        </Modal>
      )}
    </div>
  );
};

export default Home;
