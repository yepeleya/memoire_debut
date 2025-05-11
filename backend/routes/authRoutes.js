const { Router } = require('express');
const { hash, compare } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { query } = require('../config/db');

const router = Router();
const JWT_SECRET = 'votre_clef_secrete_pour_jwt';

// Enregistrement utilisateur
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email et mot de passe requis' });

    query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).json({ message: 'Erreur serveur' });
        if (results.length > 0) return res.status(400).json({ message: 'Email déjà utilisé' });

        const hashedPassword = await hash(password, 10);

        query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], (err2) => {
            if (err2) return res.status(500).json({ message: 'Erreur lors de l\'inscription' });
            res.status(201).json({ message: 'Utilisateur créé' });
        });
    });
});

// Connexion utilisateur
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email et mot de passe requis' });

    query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).json({ message: 'Erreur serveur' });
        if (results.length === 0) return res.status(400).json({ message: 'Utilisateur non trouvé' });

        const user = results[0];
        const validPassword = await compare(password, user.password);

        if (!validPassword) return res.status(401).json({ message: 'Mot de passe incorrect' });

        const token = sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
        res.json({ token });
    });
});

module.exports = router; // Utilisation de CommonJS