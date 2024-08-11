import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import backgroundImage from '../assets/background.webp';
import Layout from '../components/Layout';
//import SmrtSelector from '../components/Map/stationSelector';

const HomePage: React.FC  = () => {
  return (
    <Layout>
      <main style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: 'calc(100vh - 56px)' }}>             
      <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(155, 187, 241, 0.6)', // Adjust opacity if needed
          }}
        ></div>
      </main>

      {/* <SmrtSelector
        // displayStations={["EW_LINE_STN","NS_LINE_STN","NE_LINE_STN","CC_LINE_STN","DTL_LINE_STN","BP_LRT_LINE_STN","NS_SK_LRT_LINE_STN","NS_PG_LRT_LINE_STN"]}
        isDisplayFutureStation={false}
        displayTagSelector
      /> */}
    </Layout>
  );
};

export default HomePage;
