import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    name: '',
    quantity: '',
    price: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3001/api/products', form)
      .then(response => {
        alert('Produit ajouté avec succès !');
        setForm({ name: '', quantity: '', price: '' });
        if (onAdd) onAdd(); // Pour recharger la liste
      })
      .catch(error => {
        console.error('Erreur lors de l\'ajout du produit :', error);
        alert('Erreur lors de l\'ajout');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Ajouter un produit</h2>
      <input
        type="text"
        name="name"
        placeholder="Nom"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="quantity"
        placeholder="Quantité"
        value={form.quantity}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Prix"
        value={form.price}
        onChange={handleChange}
        required
      />
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default ProductForm;
