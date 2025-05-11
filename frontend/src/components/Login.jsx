// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    // Exemple basique, à remplacer par une vraie API
    if (email === 'admin@commerce.com' && password === 'admin123') {
      localStorage.setItem('auth', true);
      navigate('/dashboard');
    } else {
      setError('Identifiants incorrects');
    }
  };

  return (
    <div className="container mt-5 login-container">
      <div className="card p-4 shadow">
        <h2 className="mb-4 text-center">Connexion</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email :</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="ex: admin@commerce.com"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Mot de passe :</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="ex: admin123"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Se connecter</button>
        </form>
        <p className="mt-3 text-center">
          Vous n’avez pas de compte ? <a href="/register">Créer un compte</a>
        </p>
      </div>
    </div>
  );
};

export default Login;