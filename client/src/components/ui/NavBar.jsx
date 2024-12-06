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
    <Navbar
    className='navbar'
      data-bs-theme="light"
    >
      {user.status === 'logged' ? user?.data.name : 'Гость'}

      <Image
        src={img}
        alt="img"
        style={{ width: '55px', marginRight: '75%' }}
      />

        <NavLink className="nav-link" to={'/'}>
          Главная
        </NavLink>
        <NavLink className="nav-link" to={'/profile'}>
          <HomeIcon color="ction" />
          Профиль
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

    </Navbar>
  );
}
