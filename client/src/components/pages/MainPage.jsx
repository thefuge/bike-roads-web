import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import axios from 'axios';
import Image from 'react-bootstrap/Image';
import img from '../assets/bikeicon.png';

export default function MainPage({ user }) {
  const [route, setRoute] = useState([]);
  console.log(route);

  const getRoutes = async () => {
    try {
      const res = await fetch('/routes/allRated');
      if (res.status === 200) {
        const data = await res.json();
        setRoute(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRoutes();
  }, []);
  return (
    <>
      <Card style={{ width: '18rem' }}>
        {/* КАРТА С МАРШРУТОМ <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Image src={img} alt='img' />
        <Card.Body>
          <Card.Title>route.title</Card.Title>
          <Card.Text>route.location</Card.Text>
          <Card.Text>route.length</Card.Text>
          <Card.Text>ownerId</Card.Text>
          <Button variant="primary" style={{width: '100%'}}>Подробнее</Button>
        </Card.Body>
      </Card>
    </>
  );
}
