import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
// import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";

const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!token) {
      // console.log("Token not found.");
      return;
    }

    const url = "https://dry-ridge-94435-1154c64a056a.herokuapp.com/movies";
    fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((moviesFromApi) => {
        const formattedMovies = moviesFromApi.map((movie) => ({
          _id: movie._id,
          Title: movie.Title,
          Description: movie.Description,
          Genre: movie.Genre,
          Director: movie.Director,
          ImagePath: movie.ImagePath,
        }));
        setMovies(formattedMovies);
        // console.log("Formatted movies:", formattedMovies);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  }, [token]);

  const onLoggedOut = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={onLoggedOut} />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <SignupView />}
          />
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <LoginView onLoggedIn={(user) => setUser(user)} />
              )
            }
          />
          <Route
            path="/movies/:_id"
            element={
              !user ? <Navigate to="/login" /> : <MovieView movies={movies} />
            }
          />

          <Route
            path="/profile"
            element={
              !user ? (
                <Navigate to="/login" />
              ) : (
                <ProfileView movies={movies} user={user} />
              )
            }
          />

          <Route
            path="/"
            element={
              !user ? (
                <Navigate to="/login" />
              ) : movies.length === 0 ? (
                <Col>The list is empty!</Col>
              ) : (
                <>
                  {movies.map((movie) => (
                    <Col key={movie._id} md={3}>
                      <MovieCard movie={movie} />
                    </Col>
                  ))}
                </>
              )
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

export default MainView;
