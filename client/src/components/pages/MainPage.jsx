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
    <h1>ПРИВЕТ</h1>
      <Row>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginLeft: '25%',
            flexDirection: 'column',
            gap: '25px',
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
