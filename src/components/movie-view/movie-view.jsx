import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import { useParams, Link } from "react-router-dom";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m._id === movieId);

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="movie-view">
      <div className="movie-poster">
        <img
          src={movie.ImagePath}
          alt={`The poster for ${movie.Title}`}
          className="w-100"
        />
      </div>
      <div className="movie-title">
        <h1>{movie.Title}</h1>
      </div>
      <div className="movie-description">
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <div className="movie-genre">
        <h2>Genre</h2>
        <div className="genre-name">{movie.Genre.Name}</div>
        <div className="genre-description">{movie.Genre.Description}</div>
      </div>
      <div className="movie-director">
        <h2>Director</h2>
        <div className="director-name">{movie.Director.Name}</div>
        <div className="director-bio">{movie.Director.Bio}</div>
        <div className="director-birth">
          Born: {new Date(movie.Director.Birth).toLocaleDateString()}
        </div>
      </div>
      <Link to={`/`}>
        <Button
          variant="primary"
          size="md"
          className="mt-3"
          style={{ cursor: "pointer" }}
        >
          Back
        </Button>
      </Link>
    </div>
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
