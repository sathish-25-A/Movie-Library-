import React, { useState } from "react";
import MovieSearch from "./components/MovieSearch";
import WatchList from "./components/WatchList";
import "./App.css";

// Import Movie interface from App.tsx
export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
  rating?: number;
}

const App: React.FC = () => {
  const [watchList, setWatchList] = useState<Movie[]>([]);

  const addToWatchList = (movie: Movie) => {
    if (!watchList.find((m) => m.imdbID === movie.imdbID)) {
      setWatchList([...watchList, { ...movie, rating: 0 }]);
    }
  };

  const removeFromWatchList = (imdbID: string) => {
    setWatchList(watchList.filter((movie) => movie.imdbID !== imdbID));
  };

  const updateRating = (imdbID: string, rating: number) => {
    setWatchList(
      watchList.map((movie) =>
        movie.imdbID === imdbID ? { ...movie, rating } : movie
      )
    );
  };

  return (
    <div className="app">
      <div className="navbar">
        <div className="logo">🎬 Movie Library</div>
      </div>
      <MovieSearch addToWatchList={addToWatchList} />
      <WatchList
        watchList={watchList}
        removeFromWatchList={removeFromWatchList}
        updateRating={updateRating} // Pass updateRating prop here
      />
    </div>
  );
};

export default App;
