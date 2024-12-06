import Button from 'react-bootstrap/esm/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from 'react-router-dom';
import { YMaps, Map, GeoObject } from '@pbe/react-yandex-maps';

export default function CardMapComponent({ route }) {
  function parseCoordinates(point) {
    return point.split(', ').map((coord) => parseFloat(coord.trim()));
  }
  const [xer, er] = parseCoordinates(route.startPoint);
  const [reer, ert] = parseCoordinates(route.endPoint);
  let navigate = useNavigate();

  return (
    <>
      <Card style={{ height: '40rem', width: '50rem' }} key={route.id}>
        <YMaps>
          <Map
          style={{ height: '100%', width: '100%' }}
            defaultState={{
              center: [`${xer}`, `${er}`],
              zoom: 10,
            }}
          >
            <GeoObject
              geometry={{
                type: 'LineString',
                coordinates: [
                  [`${xer}`, `${er}`],
                  [`${reer}`, `${ert}`],
                ],
              }}
              options={{
                geodesic: true,
                strokeWidth: 5,
                strokeColor: '#F008',
              }}
            />
          </Map>
        </YMaps>
        <Card.Body>
          <Card.Title>{route.title}</Card.Title>
        </Card.Body>
        <ListGroup>
          <ListGroup.Item>
            Рейтинг: {Number(route.average_rating)}
          </ListGroup.Item>
          <ListGroup.Item>Локация: {route.location}</ListGroup.Item>
          <ListGroup.Item>Начальная точка: {route.startPoint}</ListGroup.Item>
          <ListGroup.Item>Конечная точка: {route.endPoint}</ListGroup.Item>
          <ListGroup.Item>Расстояние {route.routeLength} метров</ListGroup.Item>
        </ListGroup>
        <Button
          variant="primary"
          style={{ marginTop: '10px' }}
          onClick={() => navigate(`/route/${route.id}`)}
        >
          Подробнее
        </Button>
      </Card>
      <Card.Body>
      </Card.Body>
    </>
  );
}
