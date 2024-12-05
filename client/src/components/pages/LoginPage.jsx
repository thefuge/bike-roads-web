import React from 'react';
import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';

export default function LoginPage({ signInHandler }) {
  return (
    <Container
      className="justify-content-center align-items-center mt-5"
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      <Form onSubmit={signInHandler} style={{ width: '50%' }}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="name@example.com"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPlaintextPassword">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
          />
          <Button
            type="submit"
            variant="outline-success"
            style={{ marginTop: '20px', width: '100%' }}
            className="mt-3"
          >
            Войти
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
}
