import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";



function HomeIcon(props) {
    return (
  
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      
    );
  }

export default function NavBar({ user, logoutHandler }) {
  return (
    <div>
      <Navbar
            data-bs-theme="light"
        className="navbar"
      >
        <Container>
          <Navbar.Brand className="navbar-brend"></Navbar.Brand>
          <Nav className="me-auto">
            <NavLink className="nav-link" to={"/"}>
             
              <HomeIcon color="ction" />
              Home
            </NavLink>
            <NavLink className="nav-link" to={"/posts"}>
              {" "}
              Посты
            </NavLink>
            <NavLink className="nav-link" to={"/posts/new"}>
              {" "}

            </NavLink>
            {user.status === "logged" ? (
              <Button variant="red" className="ms-auto" onClick={logoutHandler}>
                {" "}
                Выйти
              </Button>
            ) : (
              <>
                <NavLink className="nav-link" to={"/account/new"}>
                  {" "}
                  Регистрация
                </NavLink>
                <NavLink className="nav-link" to={"/account/login"}>
                  {" "}
                  Вход
                </NavLink>
              </>
            )}
          </Nav>
          
          {user.status === "logged" ? user?.data.name : "Гость"}
        </Container>
      </Navbar>
    </div>
  );
}
