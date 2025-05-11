// src/components/Header.jsx
import React, { useState } from 'react';
import logo from '../assets/logo.png'; // Assure-toi d’avoir un logo ici

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode'); // Ajout de la classe 'dark-mode' au body
  };

  return (
    <header className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img src={logo} alt="Logo" width="40" height="40" className="me-2" />
          Gestion Commerciale
        </a>
        <button className="btn btn-outline-secondary" onClick={toggleTheme}>
          {darkMode ? 'Mode clair' : 'Mode sombre'}
        </button>
      </div>
    </header>
  );
};

export default Header;
