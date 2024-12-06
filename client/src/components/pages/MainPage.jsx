import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import RouteCard from '../ui/RouteCard';
import { Row } from 'react-bootstrap';
import CardMapComponent from '../ui/CardMapComponent';

export default function MainPage({ user }) {
  const [routes, setRoutes] = useState([]);
  const getRoutes = async () => {
    try {
      const res = await fetch('/api/routes/allRated');
      if (res.status === 200) {
        const data = await res.json();
        setRoutes(data);
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
      <Row>
    <h1 style={{ marginTop: '25px' }}>Добро пожаловать на BikeRiderZ!</h1>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            flexDirection: 'column',
            gap: '50px',
            marginTop: '25px',
          }}
        >
          {routes.map((el) => (
            <CardMapComponent key={el.id} route={el} user={user}></CardMapComponent>
          ))}
        </div>
      </Row>
    </>
  );
}
