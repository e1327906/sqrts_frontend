import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SessionUserData } from '../services/types';
import Utils, { getSessionUserData } from './Utils';
import { Button, Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import logo from '../assets/SQRT.png';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {

  const navigate = useNavigate();
  //Get session user data
  const sessionUserData = getSessionUserData();
  const isGuestToken = localStorage.getItem('isGuest') || 'false';

  const handleLogoutClick = () => {
    localStorage.removeItem('sessionUserData');
    navigate('/');
    // Use `Link` for navigation
  };

  return (
    <Navbar expand="lg" className='navbar navbar-expand-lg navbar-dark justify-content-end fixed-top' style={{ backgroundColor:'#00285a'}}>
      <Container>
        <Navbar.Brand href="/"> <img
            src={logo} // Use your logo image source
            height="30"
            className="d-inline-block align-top"
            alt="Logo"
          /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {(sessionUserData?.isAuthenticated === true || JSON.parse(isGuestToken) === true) &&
            (
              <Nav className="mr-auto">
                <NavDropdown title="QR Management" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/purchaseTicket">Purchase Tickets</NavDropdown.Item>
                  <NavDropdown.Item href="/viewQRTickets">View Tickets</NavDropdown.Item>
                  <NavDropdown.Item href="/refundTickets">Refund Tickets</NavDropdown.Item>
                </NavDropdown>
                {sessionUserData?.role === Utils.Role.ROLE_ADMIN &&
                  (
                    <NavDropdown title="User Management" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/viewUser">User</NavDropdown.Item>
                    <NavDropdown.Item href="/viewRole">Role</NavDropdown.Item>
                  </NavDropdown>
                  )
                }                
                <NavDropdown title="Fare Management" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/viewTrainFare">Train Fare</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )
          }
          <Nav className="ms-auto">
            {sessionUserData?.isAuthenticated === true &&(
              <NavDropdown title={
              <>
              <span style={{ marginRight: '0.5rem' }}>{sessionUserData.userName}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
              </svg>
              </>
              } id="basic-nav-dropdown">
                <NavDropdown.Item onClick={handleLogoutClick}>Logout</NavDropdown.Item>
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="/changePassword">Change Password</NavDropdown.Item>
              </NavDropdown>
            ) }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
