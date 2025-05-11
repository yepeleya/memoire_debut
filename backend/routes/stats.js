// routes/stats.js
const { Router } = require('express');
const db = require('../config/db');

const router = Router();

// Retourne les ventes et bénéfices par jour
router.get('/', (req, res) => {
  const query = `
    SELECT 
      DATE(s.date) AS date,
      COUNT(*) AS ventes,
      SUM(s.quantity * p.price) AS benefices
    FROM sales s
    JOIN products p ON s.product_id = p.id
    GROUP BY DATE(s.date)
    ORDER BY DATE(s.date) ASC;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des statistiques :', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }

    res.json(results);
  });
});

module.exports = router;
