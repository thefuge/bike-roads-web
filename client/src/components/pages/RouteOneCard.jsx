import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link, useParams } from "react-router-dom";

import axios from "axios";
import axiosInstance from "../../api/axiosInstance";
import CardMapComponent from "../ui/CardMapComponent";

import React from "react";
import { Container, ListGroup, Row } from "react-bootstrap";
import { GeoObject, Map, YMaps } from "@pbe/react-yandex-maps";
import ReviewCard from "../ui/ReviewCard";

export default function RouteOneCard() {
  const { id } = useParams();
  const [route, setRoute] = useState({
    title: "",
    startPoint: "",
    endPoint: "",
    location: "",
    routeLength: "",
    ownerId: "",
    averageRating: 0,
  });

  useEffect(() => {
    fetch(`/api/routes/${id}/with_averagegRating`)
      .then((res) => res.json())
      .then((data) => setRoute(data))
      .catch(console.log);
  }, [id]);
  console.log(route, 45687498465);

  function parseCoordinates(point) {
    return point.split(", ").map((coord) => parseFloat(coord.trim()));
  }

  const [reviews, setReviews] = useState([]);

  const getReviews = async () => {
    try {
      const res = await fetch(`/api/routes/${id}/ratingsAll`);
      if (res.status === 200) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  const [newReview, setNewReview] = useState({ rating: "", comment: "" });
  const handleNewReviewChange = (event) => {
    const { name, value } = event.target;
    setNewReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddReview = async (event) => {
    event.preventDefault();
    try {
      const formTarget = event.target;
      const dataForm = new FormData(formTarget);
      const dataForApi = Object.fromEntries(dataForm);
      const response = await axiosInstance.post(
        `/routes/${id}/rate`,
        dataForApi
      );
      setReviews((prevReviews) => [response.data, ...prevReviews]); // Добавляем новый отзыв
      setNewReview({ routeRate: "", routeReview: "" }); // Сбрасываем форму
    } catch (error) {
      console.error("Ошибка при добавлении отзыва:", error);
    }
  };

  return (
    <>
      <Container>
        <Card style={{ height: "30rem", width: "50rem" }} key={route.id}>
          <YMaps>
            <Map
              defaultState={{
                center: parseCoordinates(route.startPoint),
                zoom: 10,
              }}
            >
              <GeoObject
                geometry={{
                  type: "LineString",
                  coordinates: [
                    parseCoordinates(route.startPoint),
                    parseCoordinates(route.endPoint),
                  ],
                }}
                options={{
                  geodesic: true,
                  strokeWidth: 5,
                  strokeColor: "#F008",
                }}
              />
            </Map>
          </YMaps>
          <Card.Body>
            <Card.Title>{route.title}</Card.Title>
          </Card.Body>
          <ListGroup>
            <ListGroup.Item>
              Рейтинг: {Number(route.averageRating)}
            </ListGroup.Item>
            <ListGroup.Item>Локация: {route.location}</ListGroup.Item>
            <ListGroup.Item>Расстояние {route.routeLength}</ListGroup.Item>
          </ListGroup>
        </Card>
        <Row>
          <form onSubmit={handleAddReview}>
            <h3>Добавить новый отзыв:</h3>
            <label>
              Рейтинг:
              <select
                name="routeRate"
                value={newReview.routeRate}
                onChange={handleNewReviewChange}
                required
              >
                <option value="">Выберите рейтинг</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </label>
            <label>
              Отзыв:
              <textarea
                name="routeReview"
                value={newReview.routeReview}
                onChange={handleNewReviewChange}
                required
              />
            </label>
            <button type="submit">Добавить отзыв</button>
          </form>
          ОТЗЫВЫ
          <div className="cardsList">
            {reviews.map((el) => (
              <ReviewCard key={el.id} review={el} />
            ))}
          </div>
        </Row>
      </Container>
    </>
  );
}
