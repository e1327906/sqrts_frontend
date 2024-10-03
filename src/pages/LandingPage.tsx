import React from 'react';
import Layout from '../components/Layout';
import backgroundImage from '../assets/background.webp';
import { Container, Row, Col, Tab, Nav, Button } from 'react-bootstrap';
import LoginForm from '../components/Auth/LoginForm';
import RegisterForm from '../components/Auth/RegisterForm';


const LandingPage: React.FC = () => {

  return (
    <Layout>
      <main
        style={{
          position: 'relative',
          background: `url(${backgroundImage}) no-repeat center center fixed`,
          backgroundSize: 'cover',
          minHeight: 'calc(100vh - 56px)',
          padding: '20px', // Added padding for better spacing
          marginTop: '-50px'
        }}
      >
        <style>
          {`
            .text-animation h2 {
              display: block;
              opacity: 0;
              animation: fadeInOut 5s infinite;
            }

            @keyframes fadeInOut {
              0% {
                opacity: 0;
              }
              50% {
                opacity: 1;
              }
              100% {
                opacity: 0;
              }
            }
          `}
        </style>
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

        <Container style={{ position: 'relative', zIndex: 1 }}>
          <Tab.Container id="login-register-tabs" defaultActiveKey="login">
            <Row>
              <Col sm={8}>
                {/* Content on the left side */}
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div className="text-animation">
                    <h2 style={{ fontSize: '5em', color: '#00285a', marginTop: '40px', marginLeft: '10px' }}>SQRT </h2>
                    <h2 style={{ fontSize: 'em', color: '#b65515', marginLeft: '10px' }}>for Seamless QR Ticketing System</h2>
                  </div>
                  {/* Three column boxes with divs */}

                  <Col sm={12} className="mb-4">
                    <div className="p-3 text-black" style={{ height: '100%' }}>
                      <h5 className="mb-3">Purchase Tickets</h5>
                      <p style={{ fontWeight: '700' }}>
                        Our website offers a user-friendly platform where you can easily purchase tickets for your journey. With a simple interface, simply log in to your account, secure payment options, navigate to your purchase history, and instantly retrieve your tickets!"

                      </p>
                      {/*   <h5 className="mb-3">View Tickets</h5>
            Purchasing tickets involves obtaining passes for transportation through platforms. Customers select ticket type, date, and payment method, receiving confirmation for entry upon purchase.
          <p style={{  fontWeight: '700'  }}>
            Viewing purchased tickets is a seamless process where customers access their digital passes via our platform. Simply log in to your account, navigate to your purchase history, and instantly retrieve your tickets.
          </p>
          <h5 className="mb-3">Train Fare</h5>
          <p style={{  fontWeight: '700'  }}>
          Viewing train fares is quick and easy on our platform.  With transparent pricing and real-time updates, you can plan your journey efficiently and make informed decisions about your train travel.
          </p>*/}
                      <a href="/purchaseTicket">
                        <Button variant="primary">Buy Tickets</Button>
                      </a>
                    </div>
                  </Col>

                </div>

              </Col>

              <Col sm={4}>
                <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '5px' }}>
                  <Row>
                    <Col>
                      <h5 className='text-center mb-3'>Login/Signup</h5>
                      <Nav variant="pills" className="av nav-pills mb-3" id="pills-tab" role="tablist">
                        <Nav.Item className="flex-grow-1 text-center">
                          <Nav.Link eventKey="login" id="pills-login-tab" role="tab" aria-controls="pills-login" aria-selected="true">Login</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="flex-grow-1 text-center">
                          <Nav.Link eventKey="register" id="pills-register-tab" role="tab" aria-controls="pills-register" aria-selected="false">Signup</Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </Col>
                  </Row>
                  <Tab.Content className="tab-content" id="pills-tabContent">
                    <Tab.Pane eventKey="login" role="tabpanel" aria-labelledby="pills-login-tab"><LoginForm /></Tab.Pane>
                    <Tab.Pane eventKey="register" role="tabpanel" aria-labelledby="pills-register-tab"><RegisterForm /></Tab.Pane>
                  </Tab.Content>
                </div>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      </main>
    </Layout>
  );
};

export default LandingPage;
