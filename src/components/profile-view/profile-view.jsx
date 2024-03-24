import React, { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
// import Button from "react-bootstrap/Button";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import { Form, Button, Row, Col, Container } from "react-bootstrap";

export const ProfileView = ({ movies, user }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  useEffect(() => {
    const url = `https://dry-ridge-94435-1154c64a056a.herokuapp.com/users/${user.Username}`;

    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setUserInfo(data);
        setUsername(data.Username);
        setEmail(data.Email);
        setBirthday(data.Birthday ? data.Birthday.split("T")[0] : "");
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  }, [user.Username, user.token]); // These dependencies ensure that the request will be executed when the username or token changes

  const handleUpdate = (e) => {
    e.preventDefault();
    // code to send updated information to the server
    console.log(username, email, birthday);
  };

  //************************************* */
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

  // console.log(toggleFavorite);

  //****************************************** */
  const isFavorite = (movieId) => userInfo?.FavoriteMovies.includes(movieId);
  //****************************************** */

  if (!userInfo) return <div>Loading...</div>;

  return (
    <Container>
      <h1>{userInfo.Username}'s Profile</h1>
      <Form onSubmit={handleUpdate}>
        <Form.Group as={Row} className="mb-3" controlId="formUsername">
          <Form.Label column sm={2}>
            Username:
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formEmail">
          <Form.Label column sm={2}>
            Email:
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formBirthday">
          <Form.Label column sm={2}>
            Birthday:
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Row className="mb-3">
          <Col sm={12} className="d-flex justify-content-between">
            <Button
              variant="primary"
              type="submit"
              onClick={() => {
                /* function to Update user */
              }}
            >
              Update Profile
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                /* function to remove user */
              }}
            >
              Deregister
            </Button>
          </Col>
        </Row>
      </Form>
      <div className="favorites">
        <h2>Favorite Movies</h2>
        <Row className="justify-content-md-center">
          {movies
            .filter((m) => userInfo?.FavoriteMovies.includes(m._id))
            .map((movie) => (
              <Col key={movie._id} sm={6} md={4} lg={3} className="mb-4">
                {/* Компонент MovieCard должен быть адаптирован для использования с react-bootstrap, если необходимо */}
                <MovieCard
                  key={movie._id}
                  movie={movie}
                  toggleFavorite={() => toggleFavorite(movie._id)}
                  isFavorite={isFavorite(movie._id)}
                />
              </Col>
            ))}
        </Row>
      </div>
    </Container>
  );
};
