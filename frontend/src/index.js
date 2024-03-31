import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx'; // Đảm bảo rằng App được nhập từ file App.jsx

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
