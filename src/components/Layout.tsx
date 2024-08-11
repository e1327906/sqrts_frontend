import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FeedbackForm from '../pages/FeedbackForm';
import { LayoutProps } from '../services/types';

const Layout: React.FC<LayoutProps> = ({children}) => {
  return (
    <div className="App">
      <Header title='AFC QR Ticketing System'/>
      <div style={{marginTop: '100px'}}></div>
      {children}
      <FeedbackForm />
      <Footer />
    </div>
  );
};
export default Layout;
