import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MovieCard = (props) => {
  const { movie, watchlistId } = props;
  const navigate = useNavigate();

  const handleCardClick = () => {
    //do something?
  };
  return (
    <Card
      data-movie-id={movie.id}
      data-watchlist-id={watchlistId}
      bg="dark"
      text="white"
      style={{ width: "18rem" }}
      onClick={handleCardClick}
    >
      <Card.Header as="h5">{movie.name}</Card.Header>
      <Card.Img src="https://m.media-amazon.com/images/M/MV5BMjE1MDYxOTA4MF5BMl5BanBnXkFtZTcwMDE0MDUzMw@@._V1_.jpg"></Card.Img>
      <Card.Body>
        <Card.Text>{movie.summary}</Card.Text>
        <Card.Text>Release Date:{movie.release_date}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;
