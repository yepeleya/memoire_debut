import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Appel API pour récupérer les produits
    axios.get('http://localhost:3001/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Erreur lors du chargement des produits :', error));
  }, []);

  return (
    <div>
      <h2>Liste des produits</h2>
      {products.length === 0 ? (
        <p>Aucun produit disponible.</p>
      ) : (
        <ul>
          {products.map(product => (
            <li key={product.id}>
              {product.name} - {product.quantity} unités - {product.price} FCFA
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
