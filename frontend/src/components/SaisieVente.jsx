// src/components/SaisieVente.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SaisieVente = ({ onSaleAdded }) => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState('');
  const [quantitySold, setQuantitySold] = useState(1);
  const [salePrice, setSalePrice] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/products');
        setProducts(res.data);
        if (res.data.length > 0) {
          setProductId(res.data[0].id);
          setSalePrice(res.data[0].price);
        }
      } catch {
        setError('Erreur chargement produits');
      }
    };
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!productId || quantitySold < 1 || !salePrice) {
      setError('Veuillez remplir tous les champs correctement.');
      return;
    }
    try {
      await axios.post('http://localhost:3001/api/sales', {
        product_id: productId,
        quantity_sold: quantitySold,
        sale_price: parseFloat(salePrice),
      });
      alert('Vente enregistrée');
      setQuantitySold(1);
      if (onSaleAdded) onSaleAdded();
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l\'enregistrement de la vente');
    }
  };

  return (
    <div>
      <h2>Saisie des ventes</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
        <div>
          <label>Produit</label><br />
          <select value={productId} onChange={e => setProductId(e.target.value)} required>
            {products.map(p => (<option key={p.id} value={p.id}>{p.name} (Stock: {p.quantity})</option>))}
          </select>
        </div>
        <div>
          <label>Quantité vendue</label><br />
          <input type="number" min="1" value={quantitySold} onChange={e => setQuantitySold(parseInt(e.target.value))} required />
        </div>
        <div>
          <label>Prix de vente unitaire (€)</label><br />
          <input
            type="number"
            step="0.01"
            value={salePrice}
            onChange={e => setSalePrice(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>Enregistrer la vente</button>
      </form>
    </div>
  );
};

export default SaisieVente;
