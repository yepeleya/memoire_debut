// src/components/StatsGraphiques.jsx
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const StatsGraphiques = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/stats') // Assure-toi d’avoir une route côté backend
      .then(res => setData(res.data))
      .catch(err => console.error('Erreur récupération stats :', err));
  }, []);

  return (
    <div className="mt-5">
      <h4 className="text-center mb-3">Statistiques des ventes et bénéfices</h4>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="ventes" stroke="#007bff" name="Ventes" />
          <Line type="monotone" dataKey="benefices" stroke="#28a745" name="Bénéfices" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatsGraphiques;
