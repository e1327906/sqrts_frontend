import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/routes';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
 
  return (
    <>
      <Router>
        <AppRoutes />
      </Router>
    </>
  );
}

export default App;
