import React, { useState, useEffect } from 'react';
import axios from 'axios';
// существующие отзывы загруженные с сервера
const BikeRiderZPage = () => {
  const [reviews, setReviews] = useState([]);
  // содержание нового отзыва
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  // должна ли отображаться форма добавления нового отзыва
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Загружаем существующие отзывы с сервера и сохраняет полученные данные в reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('тут нужно указать путь к API получения списка отзывов');
        setReviews(response.data);
      } catch (error) {
        console.error('Ошибка загрузки страницы:', error);
      }
    };
    fetchReviews(); // закружаем существующие отзывы с сервера
  }, []);

  const handleAddReview = () => { // тут у нас форма добавления нового отзыва при нажании на кнопку
    setShowReviewForm(true);
  };

  const handleReviewChange = (event) => {
    const { name, value } = event.target;
    setNewReview((prevReview) => ({ ...prevReview, [name]: value }));
  };

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('тут нужно указать путь', newReview);
      setReviews((prevReviews) => [...prevReviews, newReview]);
      setNewReview({ rating: 0, comment: '' });
      setShowReviewForm(false);
    } catch (error) {
      console.error('Ошибка загрузки страницы:', error);
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
          </div>
        ))}
      </div>
      <button onClick={handleAddReview}>Добавить отзыв</button>
      {showReviewForm && (
        <form onSubmit={handleReviewSubmit}>
          <label>
            Rating:
            <select name="rating" value={newReview.rating} onChange={handleReviewChange}> 
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </label>
          <label>
            Отзывы:
            <textarea name="comment" value={newReview.comment} onChange={handleReviewChange} />
          </label>
          <button type="submit">Сохранить отзыв</button>
        </form>
      )}
    </div>
  );
};

export default BikeRiderZPage;

