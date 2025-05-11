import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { BrowserRouter } from 'react-router-dom'; // <-- AJOUT ICI

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* <-- AJOUT ICI */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
