import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './ui/NavBar';
import Loader from '../HOC/Loader';
import { Container } from 'react-bootstrap';

export default function Layout({ user, logoutHandler }) {
  return (
    <Loader showSpinner={user.status === 'fetching'}>
    <NavBar user={user} logoutHandler={logoutHandler} />
    <Container>
    <Outlet />
  </Container>
  </Loader>
  )
}
