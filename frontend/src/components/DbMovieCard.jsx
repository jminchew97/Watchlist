import React from "react";
import { Card, Button } from "react-bootstrap";
import {api,imageBaseUrl} from "../utilities"
import AddToWatchlistButton from "./AddToWatchlistButton";
import posterNotAvailable from "../assets/posterNotAvailable.jpg"
const DbMovieCard = (props) => {
  const { movie } = props;

  const handleCardClick = () => {};
  return (
    <Card
    
      text="white"
      
      onClick={handleCardClick}
      className="flex-item "
    >
      <Card.Header as="h5">{movie.title}</Card.Header>
      {movie.poster_path ? (
        <Card.Img
          src={`${imageBaseUrl}${movie.poster_path}`}
        ></Card.Img>
      ) : (
        <Card.Img
          src={posterNotAvailable}
        ></Card.Img>
      )}

      <Card.Body>
        <Card.Text>{movie.overview.slice(0,255) + "..."}</Card.Text>
        <Card.Text>Release Date:{movie.release_date}</Card.Text>
        <AddToWatchlistButton movie={movie} />
      </Card.Body>
    </Card>
  );
};

export default DbMovieCard;
