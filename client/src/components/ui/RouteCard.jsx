import React from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import img from '../assets/bikeicon.png';

export default function RouteCard({ route }) {
  return (
    <Card style={{ width: '50%' }}>
      <Card.Body>
        <Image src={img} alt="img" />
        <Card.Title>Рейтинг: {Number(route.average_rating)}</Card.Title>
        <Card.Title>{route.title}</Card.Title>
        <Card.Title>{route.startPoint}</Card.Title>
        <Card.Text>{route.location}</Card.Text>
        <Card.Text>{route.length}</Card.Text>
        <Card.Text>{route.ownerId}</Card.Text>
        <Button
          variant="primary"
          style={{ width: '100%' }}
          onClick={() =>
            (window.location.href = 'http://localhost:5173/route')
          }
        >
          Подробнее
        </Button>
      </Card.Body>
    </Card>
  );
}
