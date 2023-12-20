import React from "react";
import { Card, Button } from "react-bootstrap";
import AddToWatchlistButton from "./AddToWatchlistButton";
import posterNotAvailable from "../assets/posterNotAvailable.jpg"
const DbMovieCard = (props) => {
  const { movie } = props;

  const handleCardClick = () => {};
  return (
    <Card
      bg="dark"
      text="white"
      style={{ width: "18rem" }}
      onClick={handleCardClick}
      className="flex-item"
    >
      <Card.Header as="h5">{movie.title}</Card.Header>
      {movie.poster_path ? (
        <Card.Img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        ></Card.Img>
      ) : (
        <Card.Img
          src={posterNotAvailable}
        ></Card.Img>
      )}

      <Card.Body>
        <Card.Text>{movie.overview}</Card.Text>
        <Card.Text>Release Date:{movie.release_date}</Card.Text>
        <AddToWatchlistButton movie={movie} />
      </Card.Body>
    </Card>
  );
};

export default DbMovieCard;
