// src/components/ResumeBenefices.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ResumeBenefices = () => {
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/sales/summary/daily');
        setSummary(res.data);
      } catch {
        // gestion simple erreur
      }
    };
    fetchSummary();
  }, []);

  return (
    <div>
      <h2>Résumé quotidien des bénéfices</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #ccc' }}>
            <th>Date</th>
            <th>Quantité vendue</th>
            <th>Bénéfice total (€)</th>
          </tr>
        </thead>
        <tbody>
          {summary.length === 0 && <tr><td colSpan="3">Aucune donnée</td></tr>}
          {summary.map(item => (
            <tr key={item.day} style={{ borderBottom: '1px solid #eee' }}>
              <td>{new Date(item.day).toLocaleDateString()}</td>
              <td>{item.total_quantity}</td>
              <td>{item.total_profit.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResumeBenefices;
