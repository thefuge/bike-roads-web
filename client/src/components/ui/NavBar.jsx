import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import img from '../assets/bikeicon.png';

function HomeIcon(props) {
  return <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />;
}

export default function NavBar({ user, logoutHandler }) {
  return (
    <div>
      <Navbar
        data-bs-theme="light"
        style={{ width: '100%', backgroundColor: 'lightGray' }}
      >
        <Container>
          <span style={{fontSize: '30px'}}>{user.status === 'logged' ? user?.data.name : 'Гость'}</span>
          <Image
            src={img}
            alt="img"
            style={{ width: '55px', marginRight: '75%' }}
          />
          <Navbar.Brand className="navbar-brend"></Navbar.Brand>

          <Nav className="me-auto">
            <NavLink className="nav-link" to={'/profile'}>
              <HomeIcon color="ction" />
              Профиль⌂
            </NavLink>
            <NavLink className="nav-link" to={'/posts/new'}>
              {' '}
            </NavLink>
            {user.status === 'logged' ? (
              <Button variant="red" className="ms-auto" onClick={logoutHandler}>
                {' '}
                Выйти
              </Button>
            ) : (
              <>
                <NavLink className="nav-link" to={'/account/new'}>
                  {' '}
                  Регистрация
                </NavLink>
                <NavLink className="nav-link" to={'/account/login'}>
                  {' '}
                  Войти
                </NavLink>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
