import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const TopNavbar = ({ profile }) => {
  const navigate = useNavigate()

  const handleSignOut = () => {
    localStorage.removeItem("accessToken");
    navigate('/')
  };
  
  return (
    <Navbar collapseOnSelect expand="lg" data-bs-theme="dark" className="bg-transparent">
      <Container>
        <Navbar.Brand>
          <Link to="/" className='font-bold text-light'>GAME</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            {
              !profile?.student_name &&
                <>
                  <Link to="/login">LOGIN</Link>
                  <Link to="/sign-up">SIGN-UP</Link>
                </>
            }
            {
              profile?.student_name &&
              <>
                <Link to="/games-list">GAMES</Link>            
                <Link to="/game-booking">GAME BOOKING</Link>            
                <span onClick={handleSignOut} className='text-info cursor-pointer'>LOGOUT</span>
                <span className='text-info'>{profile?.student_name}</span>
              </>
            }            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
};

export default TopNavbar;