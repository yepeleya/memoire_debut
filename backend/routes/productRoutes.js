const { Router } = require('express');
const db = require('../config/db'); // Correction ici

const router = Router();

// Get all products
router.get('/', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) return res.status(500).json({ message: 'Erreur serveur' });
        res.json(results);
    });
});

// Add a new product
router.post('/', (req, res) => {
    const { name, quantity, price } = req.body;

    // Vérification des champs requis
    if (!name || !quantity || !price) {
        return res.status(400).json({ message: 'Champs manquants' });
    }

    // Insertion dans la base de données
    db.query(
        'INSERT INTO products (name, quantity, price) VALUES (?, ?, ?)',
        [name, quantity, price],
        (err, result) => {
            if (err) {
                console.error('Erreur lors de l\'insertion du produit :', err);
                return res.status(500).json({ message: 'Erreur serveur' });
            }
            res.status(201).json({ message: 'Produit ajouté', productId: result.insertId });
        }
    );
});

module.exports = router;
