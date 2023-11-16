import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import SearchIcon from "../src/search.svg";
import MovieCard from "./MovieCard";

// 93806436
const API_URL = "http://www.omdbapi.com/?apikey=93806436";

// const movie1 = {
//   Title: "The Amazing Spiderman 2 Webb Cut",
//   Year: "2021",
//   imdbID: "tt18351128",
//   Type: "movie",
//   Poster:
//     "https://m.media-amazon.com/images/M/MV5BYzYzZDViNWYtNWViMS00NDMxLThlN2YtZjFkOWMwODkzNzhiXkEyXkFqcGdeQXVyMTUwMzM4NzU0._V1_SX300.jpg",
// };

const App = () => {
  const [movies, setMovies] = useState([]);
  const [serachTerm, setserachTerm] = useState("");

  useEffect(() => {
    searchMovies("Spiderman");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    console.log(data.Search);
    setMovies(data.Search);
  };

  return (
    <div className="app">
      <h1>Movie Land</h1>
      <div className="search">
        <input
          placeholder="Search for movies..."
          value={serachTerm}
          onChange={(e) => setserachTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="Search"
          onClick={() => searchMovies(serachTerm)}
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
