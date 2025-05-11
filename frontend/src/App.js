import React from 'react';
import ProductList from './components/ProductList';


function App() {
  return (
    <div className="App">
      <header style={{ padding: '20px', backgroundColor: '#9E1B32', color: '#fff' }}>
        <h1>Gestion des Articles</h1>
      </header>
      <main style={{ padding: '20px' }}>
        <ProductList />
      </main>
    </div>
  );
}

export default App;
