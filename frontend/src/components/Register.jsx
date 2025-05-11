import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!nom || !email || !password) {
      setError('Tous les champs sont obligatoires.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        nom,
        email,
        password,
      });

      if (response.data.success) {
        alert('Inscription réussie !');
        navigate('/login');
      } else {
        setError(response.data.message || 'Erreur lors de l’inscription.');
      }
    } catch (err) {
      console.error(err);
      setError('Erreur serveur. Veuillez réessayer.');
    }
  };

  return (
    <div className="container mt-5 login-container">
      <div className="card p-4 shadow">
        <h2 className="mb-4 text-center">Créer un compte</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Nom :</label>
            <input
              type="text"
              className="form-control"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
              placeholder="Votre nom complet"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email :</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="ex: user@example.com"
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
              placeholder="Choisissez un mot de passe"
            />
          </div>
          <button type="submit" className="btn btn-success w-100">Créer le compte</button>
        </form>
        <p className="mt-3 text-center">
          Déjà inscrit ? <a href="/login">Se connecter</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
