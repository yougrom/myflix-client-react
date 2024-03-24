import React from "react";
import PropTypes from "prop-types";

import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";

export const MovieView = ({ movies }) => {
  const { _id: movieId } = useParams();

  const movie = movies.find((m) => m._id === movieId);

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <Container className="movie-view">
      <Row className="my-3">
        <Col className="movie-poster">
          <Image
            src={movie.ImagePath}
            alt={`The poster for ${movie.Title}`}
            className="w-50"
          />
        </Col>
      </Row>
      <Row className="my-3">
        <Col className="movie-title">
          <h1>{movie.Title}</h1>
        </Col>
      </Row>
      <Row className="my-3">
        <Col className="movie-description">
          <h2>Description</h2>
          <p>{movie.Description}</p>
        </Col>
      </Row>
      <Row className="my-3">
        <Col className="movie-genre">
          <h2>Genre</h2>
          <div className="genre-name">
            <strong>{movie.Genre.Name}</strong>
          </div>
          <div className="genre-description">{movie.Genre.Description}</div>
        </Col>
      </Row>
      <Row className="my-3">
        <Col className="movie-director">
          <h2>Director</h2>
          <div className="director-name">
            <strong>{movie.Director.Name}</strong>
          </div>
          <div className="director-bio">{movie.Director.Bio}</div>
          <div className="director-birth">
            Born: {new Date(movie.Director.Birth).toLocaleDateString()}
          </div>
        </Col>
      </Row>
      <Row className="my-3">
        <Col>
          <Link to={`/`}>
            <Button variant="primary" size="md" style={{ cursor: "pointer" }}>
              Back
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
      }),
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        Birth: PropTypes.string.isRequired,
      }),
      ImagePath: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
    })
  ).isRequired,
};
