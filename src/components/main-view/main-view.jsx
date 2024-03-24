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
  const [userInfo, setUserInfo] = useState(null);
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

  /*********************************** */
  const toggleFavorite = (movieId) => {
    const isFavorite = userInfo?.FavoriteMovies.includes(movieId);
    const method = isFavorite ? "DELETE" : "POST";
    const urlBase = `https://dry-ridge-94435-1154c64a056a.herokuapp.com/users/${user.Username}`;
    const url = isFavorite
      ? `${urlBase}/FavoriteMovies/${movieId}`
      : `${urlBase}/movies/${movieId}`;

    fetch(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          // Checking if the response returns JSON
          const contentType = response.headers.get("Content-Type");
          if (contentType && contentType.includes("application/json")) {
            return response.json(); // If the response is JSON, parse it
          } else {
            return response.text(); // Otherwise, we process it as text
          }
        } else {
          throw new Error("Could not update favorites");
        }
      })
      .then((data) => {
        // We update the state or do something else depending on the response
        if (typeof data === "string") {
          // Обработка текстового сообщения от сервера, если необходимо
          console.log(data);
        } else {
          // 'data' is assumed to be the updated userInfo object
          setUserInfo(data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  /*********************************** */
  const isFavorite = (movieId) => userInfo?.FavoriteMovies.includes(movieId);
  /*********************************** */

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
                    <Col
                      key={movie._id}
                      sm={6}
                      md={4}
                      lg={3}
                      className="margin"
                    >
                      <MovieCard
                        key={movie._id}
                        movie={movie}
                        toggleFavorite={() => toggleFavorite(movie._id)}
                        isFavorite={isFavorite(movie._id)}
                      />
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
