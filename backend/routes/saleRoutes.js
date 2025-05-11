const { Router } = require('express');
const { query } = require('../config/db');

const router = Router();

// Enregistrer une vente
router.post('/', (req, res) => {
    const { product_id, quantity_sold, sale_price } = req.body;

    if (!product_id || !quantity_sold || !sale_price) return res.status(400).json({ message: 'Champs manquants' });

    // Vérifier stock disponible
    query('SELECT quantity, price FROM products WHERE id = ?', [product_id], (err, results) => {
        if (err) return res.status(500).json({ message: 'Erreur serveur' });
        if (results.length === 0) return res.status(404).json({ message: 'Produit non trouvé' });

        const product = results[0];
        if (product.quantity < quantity_sold) return res.status(400).json({ message: 'Stock insuffisant' });

        const profit = (sale_price - product.price) * quantity_sold;

        // Enregistrer la vente
        query(
            'INSERT INTO sales (product_id, quantity_sold, sale_price, profit, sale_date) VALUES (?, ?, ?, ?, NOW())',
            [product_id, quantity_sold, sale_price, profit],
            (err2) => {
                if (err2) return res.status(500).json({ message: 'Erreur lors de l\'enregistrement de la vente' });

                // Mettre à jour le stock du produit
                const newQuantity = product.quantity - quantity_sold;
                query('UPDATE products SET quantity = ? WHERE id = ?', [newQuantity, product_id], (err3) => {
                    if (err3) return res.status(500).json({ message: 'Erreur lors de la mise à jour du stock' });
                    res.json({ message: 'Vente enregistrée', profit });
                });
            }
        );
    });
});

// Résumé quotidien des bénéfices
router.get('/summary/daily', (req, res) => {
    query(
        `SELECT DATE(sale_date) as day, SUM(quantity_sold) as total_quantity, SUM(profit) as total_profit
         FROM sales
         GROUP BY day
         ORDER BY day DESC`,
        (err, results) => {
            if (err) return res.status(500).json({ message: 'Erreur serveur' });
            res.json(results);
        }
    );
});

module.exports = router; // Utilisation de CommonJS

const newProduct = {
    "name": "Ordinateur HP",
    "quantity": 10,
    "price": 250000
};