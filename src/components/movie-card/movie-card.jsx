import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./movie-card.scss";

//********************************* Random border color Start ***************************************/
const borderClasses = [
  "border-vibrant-primary",
  "border-vibrant-secondary",
  "border-vibrant-success",
  "border-vibrant-danger",
  "border-vibrant-warning",
  "border-vibrant-info",
  "border-vibrant-light",
  "border-vibrant-dark",
];

const getRandomBorderClass = () => {
  const randomIndex = Math.floor(Math.random() * borderClasses.length);
  return borderClasses[randomIndex];
};
//********************************** Random border color End ************************************* */

export const MovieCard = ({ movie }) => {
  //******************************  Random border color Start ***************************************** */
  const borderClass = getRandomBorderClass();
  //********************************Random border color End *************************************** */

  return (
    <Card className={`h-100 ${borderClass}`}>
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button
            // onClick={() => onMovieClick(movie)}
            variant="outline-primary"
            className="mt-3"
          >
            {movie.Title}
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

// PropTypes for MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
      Bio: PropTypes.string,
      Birth: PropTypes.string,
    }),
    ImagePath: PropTypes.string,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};
