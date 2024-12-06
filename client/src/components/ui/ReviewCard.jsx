
import Card from "react-bootstrap/Card";


export default function ReviewCard({ review }) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>Оценка: {review.routeRate}</Card.Title>
        <Card.Text>Отзыв: {review.routeReview}</Card.Text>
      </Card.Body>
    </Card>
  );
}
