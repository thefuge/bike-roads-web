import Card from "react-bootstrap/Card";
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export default function ReviewCard({ review }) {
  const formattedDate = format(
    new Date(review.createdAt),
    "d MMMM yyyy, HH:mm:ss",
    { locale: ru }
  );
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>Оценка: {review.routeRate}</Card.Title>
        <Card.Text>Отзыв: {review.routeReview}</Card.Text>
        <Card.Text>Автор: {review.userName}</Card.Text>
        <Card.Text>Дата: {formattedDate}</Card.Text>
      </Card.Body>
    </Card>
  );
}
