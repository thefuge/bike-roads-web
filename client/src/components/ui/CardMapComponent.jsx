import Button from "react-bootstrap/esm/Button";
import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup"
import MapComponent from "./MapComponent";

export default function CardMapComponent({}) {

  return (
    <>
      <Card style={{ height: '30', width: "50rem" }} key={КЛЮЧ!!!}>
        <MapComponent/>0
        <Card.Body>
          <Card.Title>{route.title}</Card.Title>
        </Card.Body>
        <ListGroup >
        <ListGroup.Item>Рейтинг: {ТО ОТКУДА РЕЙТИНГ ПОДТЯГИВАЕМ}</ListGroup.Item>
          <ListGroup.Item>Начальная точка: {route.startPoint}</ListGroup.Item>
          <ListGroup.Item>Конечная точка: {route.startPoint}</ListGroup.Item>
          <ListGroup.Item>Расстояние {route.routeLength}</ListGroup.Item>
        </ListGroup>
        </Card>
        <Card.Body>
          <Button onClick={() => AboutRoute(route.id)}>Подробнее</Button>
        </Card.Body>

    </>
  );
}

