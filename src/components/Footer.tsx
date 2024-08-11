import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer mt-auto py-3 bg-light" style={{ left: 0, bottom: 0, width: '100%', backgroundColor: '#f8f9fa', textAlign: 'center', padding: '15px 0' }}>
      <div className="container">
        <span className="text-muted">Copyright &copy; 2024 Seamless QR Ticketing System</span>
      </div>
    </footer>
  );
};

export default Footer;
