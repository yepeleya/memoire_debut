const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const saleRoutes = require('./routes/saleRoutes');
const statsRoutes = require('./routes/stats'); // Ajout de la route stats

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/stats', statsRoutes); // Utilisation de la route stats

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});