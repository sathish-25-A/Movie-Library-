import React, { useState } from "react";
import { Movie } from "../App"; // Import Movie type
import axios from "axios";

const MovieSearch: React.FC<{ addToWatchList: (movie: Movie) => void }> = ({
  addToWatchList,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = async () => {
    setErrorMessage(""); // Reset error before each search
    try {
      console.log("Searching for:", searchQuery); // Log query to check
      const response = await axios.get<{ Search: Movie[] }>(
        `https://www.omdbapi.com/?s=${searchQuery}&apikey=57fac967`
      );
      if (response.data.Search) {
        setMovies(response.data.Search); // TypeScript knows response.data.Search is a Movie array
      } else {
        setErrorMessage("No movies found. Try a different search.");
      }
    } catch (error) {
      console.error("Error fetching movies", error);
      setErrorMessage("Failed to fetch movies. Please try again.");
    }
  };

  return (
    <div className="movie-search-container">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for a movie..."
      />
      <button onClick={handleSearch}>Search</button>
      {errorMessage && <p>{errorMessage}</p>}
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-item">
            <div className="movie-header">
              {/* Display Movie Title */}
              <h3>{movie.Title}</h3>
            </div>
            {/* Movie Poster */}
            {movie.Poster && movie.Poster !== "N/A" ? (
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="movie-poster"
              />
            ) : (
              <p>No image available</p>
            )}

            {/* Add to Watchlist Button */}
            <button
              className="add-to-watchlist-btn"
              onClick={() => addToWatchList(movie)}
            >
              Add to Watchlist
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSearch;
