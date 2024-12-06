import { useState } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { Form, Button, Container, Alert } from "react-bootstrap";
import axiosInstance from "../../api/axiosInstance";

export default function ProfilePage() {
  const [startCoordinates, setStartCoordinates] = useState([
    55.751574, 37.573856,
  ]);
  const [endCoordinates, setEndCoordinates] = useState([55.761574, 37.583856]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleMapClick = (event) => {
    const coords = event.get("coords");

    if (
      Math.abs(coords[0] - startCoordinates[0]) < 0.01 &&
      Math.abs(coords[1] - startCoordinates[1]) < 0.01
    ) {
      setStartCoordinates(coords);
    } else {
      setEndCoordinates(coords);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formTarget = event.target;
      const title = formTarget.title.value;
      const location = formTarget.location.value;

      if (!title || !location) return alert("Заполните все поля!");

      const routeData = {
        title,
        startPoint: startCoordinates.join(", "),
        endPoint: endCoordinates.join(", "),
        location,
      };
      await axiosInstance.post("/routes/", routeData);
      formTarget.reset();
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    } catch (error) {
      if (error.response?.status === 400) {
        alert("Ваша сессия истекла. Авторизуйтесь снова");
      } else {
        alert("Ошибка при добавлении мероприятия");
      }
    }
  };


  return (
    <>
    <h1 style={{ marginTop: '30px' }}>Введите данные для добавления маршрута:</h1>
    {showSuccessMessage && (
          <Alert variant="success" style={{ width: '70%', fontSize: '30px' }}>Ваш маршрут успешно добавлен!</Alert>
        )}
      <Form
        onSubmit={handleSubmit}
        style={{
          paddingTop: "5px",
          display: "flex",
          flexDirection: "column",
          justifyContent: 'center',
          alignItems: "baseline",
          gap: "10px",
        }}
        >
        <YMaps>
          <Map
            defaultState={{ center: startCoordinates, zoom: 11 }}
            onClick={handleMapClick}
            style={{ alignItems: "center", width: "70%", height: "500px" }}
            >
            <Placemark
              geometry={startCoordinates}
              options={{ preset: "islands#icon", iconColor: "#0095b6" }}
              draggable={true}
              onDragEnd={(event) =>
                setStartCoordinates(event.get("target").geometry.coordinates)
              }
              />
            <Placemark
              geometry={endCoordinates}
              options={{ preset: "islands#icon", iconColor: "#ff0000" }}
              draggable={true}
              onDragEnd={(event) =>
                setEndCoordinates(event.get("target").geometry.coordinates)
              }
              />
          </Map>
        </YMaps>
        <div>
          <h3>Координаты:</h3>
          <p>
            Начальная точка: {startCoordinates[0]}, {startCoordinates[1]} | Конечная точка: {endCoordinates[0]}, {endCoordinates[1]}
          </p>
        </div>

        <Form.Control
          name="title"
          size="sm"
          type="text"
          placeholder="Название маршрута"
          style={{ width: "50%", height: "55px", borderRadius: "25px" }}
        />
        <Form.Control
          name="location"
          size="sm"
          type="text"
          placeholder="Населенный пункт"
          style={{ width: "50%", height: "55px", borderRadius: "25px" }}
        />
        <Button type="submit" variant="primary">
          Добавить маршрут
        </Button>
      </Form>
    </>
  );
}