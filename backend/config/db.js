const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',          // Remplace par ton utilisateur MySQL
  password: '',          // Remplace par ton mot de passe MySQL
  database: 'gestion_articles'
});

db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
  } else {
    console.log('Connecté à la base de données MySQL');
  }
});

module.exports = db;
