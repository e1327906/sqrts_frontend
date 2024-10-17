import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/routes';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
 
  useEffect(() => {
    document.title = "Seamless QR Ticketing System"; // Change the title here
  }, []);
  
  return (
    <>
      <Router>
        <AppRoutes />
      </Router>
    </>
  );
}

export default App;
