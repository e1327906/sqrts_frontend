// Navbar.tsx
import React from 'react';
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

interface NavbarProps {
  pageTitle: string;
  isAuthenticated: boolean;
}

const CustomNavbar: React.FC<NavbarProps> = ({ pageTitle, isAuthenticated }) => {

  const navigate = useNavigate();
  const location = useLocation();
  const userAuthenticated = location.state?.isAuthenticated || isAuthenticated || false;

  const handleLogoutClick = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const handleRegisterClick = () => navigate('/register');
  const handleLoginClick = () => navigate('/login');
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Home Page</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {userAuthenticated === true &&
            (
              <Nav className="mr-auto">
                <NavDropdown title="QR Management" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/purchaseTicket">Purchase Tickets</NavDropdown.Item>
                  <NavDropdown.Item href="/viewQRTickets">View Tickets</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="User Management" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/user">User</NavDropdown.Item>
                  <NavDropdown.Item href="/role">Role</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Fare Management" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/viewTrainFare">Train Fare</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )
          }
          <Nav className="ms-auto">
            {userAuthenticated ? (
              <Button onClick={handleLogoutClick} variant="outline-primary" className="ml-auto">Logout</Button>
            ) : (
              <>
                <Button onClick={handleRegisterClick} variant="outline-primary" className="me-2">Register</Button>
                <Button onClick={handleLoginClick} variant="outline-primary">Login</Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
