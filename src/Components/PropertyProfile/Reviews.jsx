import React, { useState, useEffect } from "react";
import ReviewSingle from "./ReviewSingle";
import { useAppProvider } from "../../Contexts/AppContext";
import { toast } from "react-toastify";

const Reviews = ({ reviews }) => {
  const [sortedReviews, setSortedReviews] = useState([]);
  const [sortOption, setSortOption] = useState("rating");
  const { userId } = useAppProvider();
  const [reviewsContainerClass, setReviewsContainerClass] =
    useState("reviews-container");
  useEffect(() => {
    let sortedArray = [...reviews];
    if (sortOption === "rating") {
      sortedArray.sort((a, b) => b.review_score - a.review_score);
    } else if (sortOption === "date") {
      sortedArray.sort(
        (a, b) => new Date(b.move_in_date) - new Date(a.move_in_date)
      );
    }
    setSortedReviews(sortedArray);

    if (!userId) {
      setReviewsContainerClass("reviews-container not-logged-in");
    } else {
      setReviewsContainerClass("reviews-container");
    }
  }, [reviews, sortOption]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  useEffect(() => {
    if (!userId) {
      setReviewsContainerClass("reviews-container not-logged-in");
    } else {
      setReviewsContainerClass("reviews-container");
    }
  }, [userId]);

  return (
    <div className={reviewsContainerClass}>
      <div className="reviews-header">
        <h3>Reviews</h3>
        <div className="sort-by">
          <label htmlFor="sort-select">Sort by:</label>
          <select
            id="sort-select"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="rating">Rating</option>
            <option value="date">Date</option>
          </select>
        </div>
      </div>
      {reviews.length === 0 ? (
        <div>
          <p>No reviews available, Do you want add one?</p>
          <button
            className="write-a-review-btn"
            onClick={() => {
              if (!userId) {
                toast.error("Please login to write a review");
                return;
              }
              window.location.href = "/write-a-review-0";
            }}
          >
            Write a review
          </button>
        </div>
      ) : (
        sortedReviews.map((review) => (
          <ReviewSingle key={review.review_id} review={review} />
        ))
      )}
    </div>
  );
};

export default Reviews;
