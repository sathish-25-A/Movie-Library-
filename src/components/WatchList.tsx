import React from "react";
import { Movie } from "../App"; // Ensure you import the Movie type from App.tsx

interface WatchListProps {
  watchList: Movie[];
  removeFromWatchList: (imdbID: string) => void;
  updateRating: (imdbID: string, rating: number) => void;
}

const WatchList: React.FC<WatchListProps> = ({
  watchList,
  removeFromWatchList,
  updateRating,
}) => {
  const handleRatingChange = (imdbID: string, newRating: number) => {
    updateRating(imdbID, newRating);
  };

  return (
    <div className="watchlist-container">
      <h2>Your Watchlist</h2>
      <ul>
        {watchList.map((movie) => (
          <li key={movie.imdbID} className="watchlist-item">
            <img src={movie.Poster} alt={movie.Title} />
            <div className="movie-details">
              <div className="movie-header">
                <h3>{movie.Title} ({movie.Year})</h3>
              </div>
              <div className="movie-actions">
                <button onClick={() => removeFromWatchList(movie.imdbID)}>
                  Remove from Watchlist
                </button>
                <div className="rating-container">
                  <label>Rating:</label>
                  <div className="rating-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`star ${star <= (movie.rating || 0) ? "filled" : ""}`}
                        onClick={() => handleRatingChange(movie.imdbID, star)}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WatchList;
