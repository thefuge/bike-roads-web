import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './ui/NavBar'
import Loader from '../HOC/Loader'

export default function Layout({ user, logoutHandler }) {
  return (
    <Loader showSpinner={user.status === 'fetching'}>
    <NavBar user={user} logoutHandler={logoutHandler} />
    <Outlet />
  </Loader>
  )
}
