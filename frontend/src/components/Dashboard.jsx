// src/components/Dashboard.jsx
import React, { useState } from 'react';
import Header from './Header';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import SaisieVente from './SaisieVente';
import ResumeBenefices from './ResumeBenefices';
import SimulateurInvestissement from './SimulateurInvestissement';
import StatsGraphiques from './StatsGraphiques';


const Dashboard = () => {
  const [reloadProducts, setReloadProducts] = useState(false);
  const [reloadSales, setReloadSales] = useState(false);

  const handleProductAdded = () => setReloadProducts(!reloadProducts);
  const handleSaleAdded = () => {
    setReloadSales(!reloadSales);
    setReloadProducts(!reloadProducts);
  };

  return (
    <>
      <Header />
      <div style={{ padding: '20px' }}>
        <h1 className="mb-4">Tableau de bord du commerçant</h1>
        <ProductForm onProductAdded={handleProductAdded} />
        <hr />
        <ProductList key={reloadProducts} />
        <hr />
        <SaisieVente onSaleAdded={handleSaleAdded} />
        <hr />
        <ResumeBenefices key={reloadSales} />
        <hr />
        <SimulateurInvestissement />
        <hr />
        <StatsGraphiques />
      </div>
    </>
  );
};

export default Dashboard;
