// src/components/SimulateurInvestissement.jsx
import React, { useState } from 'react';

const SimulateurInvestissement = () => {
  const [capital, setCapital] = useState('');
  const [taux, setTaux] = useState('');
  const [duree, setDuree] = useState('');
  const [resultat, setResultat] = useState(null);

  const calculerInvestissement = () => {
    const capitalNum = parseFloat(capital);
    const tauxNum = parseFloat(taux);
    const dureeNum = parseInt(duree);

    if (!capitalNum || !tauxNum || !dureeNum) return;

    const gain = capitalNum * Math.pow(1 + tauxNum / 100, dureeNum) - capitalNum;

    setResultat({
      gain: gain.toFixed(2),
      total: (capitalNum + gain).toFixed(2),
    });
  };

  return (
    <div className="card p-4 my-4">
      <h4>Simulateur d’investissement</h4>
      <div className="mb-3">
        <label>Capital investi (en FCFA)</label>
        <input
          type="number"
          className="form-control"
          value={capital}
          onChange={(e) => setCapital(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>Rentabilité estimée (en %)</label>
        <input
          type="number"
          className="form-control"
          value={taux}
          onChange={(e) => setTaux(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>Durée (en mois)</label>
        <input
          type="number"
          className="form-control"
          value={duree}
          onChange={(e) => setDuree(e.target.value)}
        />
      </div>
      <button className="btn btn-success" onClick={calculerInvestissement}>
        Simuler
      </button>

      {resultat && (
        <div className="mt-4 alert alert-info">
          <p><strong>Gain estimé :</strong> {resultat.gain} FCFA</p>
          <p><strong>Montant total après investissement :</strong> {resultat.total} FCFA</p>
        </div>
      )}
    </div>
  );
};

export default SimulateurInvestissement;
