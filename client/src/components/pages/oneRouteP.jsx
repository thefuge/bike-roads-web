import React, { useState, useEffect } from "react";
import axios from "axios";

export default function BikeRiderZPage() {
  const [reviews, setReviews] = useState([]);
  const [editingReview, setEditingReview] = useState(null);
  const [userReview, setUserReview] = useState(null);

  useEffect(() => {
    // Загружаем существующие отзывы с сервера
    const fetchReviews = async () => {
      try {
        const response = await axios.get("/api/reviews");
        setReviews(response.data);
        // Находим отзыв текущего пользователя
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
    // Проверяем, является ли текущий пользователь автором отзыва
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
      await axios.put(`/api/reviews/${editingReview.id}`, editingReview);
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
    // тут у нас удаление отзыва с обновлением состояния
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

  return (
    <div>
      <h2>BikeRiderZ</h2>
      <div>
        <h3>Reviews:</h3>
        {reviews.map((review, index) => (
          <div key={index}>
            <p>Rating: {review.rating}</p>
            <p>{review.comment}</p>
            {review.userId === localStorage.getItem("userId") && (
              <div>
                <button onClick={() => handleEditReview(review)}>Edit</button>
                <button onClick={() => handleDeleteReview(review.id)}>
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      {userReview ? (
        <p>
          Вы уже оставили отзыв. Вы можете его{" "}
          <button onClick={() => handleEditReview(userReview)}>
            редактировать
          </button>{" "}
          или{" "}
          <button onClick={() => handleDeleteReview(userReview.id)}>
            удалить
          </button>
          .
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
            Отзывы:
            <textarea
              name="comment"
              value={editingReview.comment}
              onChange={handleReviewChange}
            />
          </label>
          <button type="submit">Сохранить</button>
        </form>
      )}
    </div>
  );
}
