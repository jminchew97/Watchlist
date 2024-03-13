import React from "react";
import { Card, Button } from "react-bootstrap";
import {api,imageBaseUrl} from "../utilities"
import AddToWatchlistButton from "./AddToWatchlistButton";
import posterNotAvailable from "../assets/posterNotAvailable.jpg"
import { useNavigate, useOutletContext } from "react-router-dom";

 


const DbMovieCard = (props) => {
  const { movie } = props;
  const { setUser, user, setMyWatchlistData} = useOutletContext();
  const navigate = useNavigate();

  const handleCardClick = () => {};
  return (
    <Card
    
      text="white"
      
      onClick={handleCardClick}
      className="flex-item db-movie-card"
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
        {
          user == null ?
          <button onClick={() => navigate("/login")}>Sign up to add to a watchlist</button> :
      <AddToWatchlistButton movie={movie} />
        }
        
      </Card.Body>
    </Card>
  );
};

export default DbMovieCard;
