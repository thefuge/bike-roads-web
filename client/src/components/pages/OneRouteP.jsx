import React, { useState, useEffect } from "react";
import axios from "axios";

export default function BikeRiderZPage() {
  const [reviews, setReviews] = useState([]);
  const [editingReview, setEditingReview] = useState(null);
  const [userReview, setUserReview] = useState(null);
  const [newReview, setNewReview] = useState({ rating: "", comment: "" });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("/routes/:id_with_averagegRating");
        setReviews(response.data);
        const userReview = response.data.find(
          (review) => review.userId === localStorage.getItem("userId")
        );
        setUserReview(userReview);
      } catch (error) {
        console.error("Ошибка загрузки страницы:", error);
      }
    };
    fetchReviews();
  }, []);

  const handleEditReview = (review) => {
    if (review.userId === localStorage.getItem("userId")) {
      setEditingReview(review);
    } else {
      alert("Вы можете редактировать только свои собственные отзывы.");
    }
  };

  const handleReviewChange = (event) => {
    const { name, value } = event.target;
    setEditingReview((prevReview) => ({ ...prevReview, [name]: value }));
  };

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`/routes/:id_with_averagegRating${editingReview.id}`, editingReview);
      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review.id === editingReview.id ? editingReview : review
        )
      );
      setEditingReview(null);
    } catch (error) {
      console.error("Ошибка загрузки страницы:", error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(`/api/reviews/${reviewId}`);
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review.id !== reviewId)
      );
      setUserReview(null);
    } catch (error) {
      console.error("Ошибка загрузки страницы:", error);
    }
  };

  const handleNewReviewChange = (event) => {
    const { name, value } = event.target;
    setNewReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddReview = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/reviews", {
        ...newReview,
        userId: localStorage.getItem("userId"),
      });
      setReviews((prevReviews) => [...prevReviews, response.data]);
      setNewReview({ rating: "", comment: "" });
    } catch (error) {
      console.error("Ошибка при добавлении отзыва:", error);
    }
  };

  return (
    <div>
      <h2>BikeRiderZ</h2>
      <div>
        <h3>Отзывы:</h3>
        {reviews.map((review, index) => (
          <div key={index}>
            <p>Рейтинг: {review.rating}</p>
            <p>{review.comment}</p>
            {review.userId === localStorage.getItem("userId") && (
              <div>
                <button onClick={() => handleEditReview(review)}>Редактировать</button>
                <button onClick={() => handleDeleteReview(review.id)}>Удалить</button>
              </div>
            )}
          </div>
        ))}
      </div>
      {userReview ? (
        <p>
          Вы уже оставили отзыв. Вы можете его{" "}
          <button onClick={() => handleEditReview(userReview)}>редактировать</button>{" "}
          или{" "}
          <button onClick={() => handleDeleteReview(userReview.id)}>удалить</button>.
        </p>
      ) : (
        <p>Вы еще не оставили отзыв.</p>
      )}
      {editingReview && (
        <form onSubmit={handleReviewSubmit}>
          <label>
            Рейтинг:
            <select
              name="rating"
              value={editingReview.rating}
              onChange={handleReviewChange}
            >
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
              name="comment"
              value={editingReview.comment}
              onChange={handleReviewChange}
            />
          </label>
          <button type="submit">Сохранить</button>
        </form>
      )}
      {!userReview && (
        <form onSubmit={handleAddReview}>
          <h3>Добавить новый отзыв:</h3>
          <label>
            Рейтинг:
            <select
              name="rating"
              value={newReview.rating}
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
              name="comment"
              value={newReview.comment}
              onChange={handleNewReviewChange}
              required
            />
          </label>
          <button type="submit">Добавить отзыв</button>
        </form>
      )}
    </div>
  );
}


