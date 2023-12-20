import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate, useOutletContext } from "react-router-dom";
import api from "../utilities.jsx"
const MovieCard = (props) => {
  const { movie, watchlistId, isWatchlistOwner} = props;
  const navigate = useNavigate();
  const {setAccessWatchlistData, accessWatchlistData } = useOutletContext();
  const handleCardClick = () => {
    //do something?
  };
  const handleDeleteButton = async () => {

      const token = localStorage.getItem("token");
      console.log(`got token on watchlist page ${token}`)
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      const response = await api.delete(`/watchlist/${watchlistId}/movie/${movie.id}`);
      if (response.status == 200){
        console.log("data before:", accessWatchlistData)
        const updatedWatchlist = accessWatchlistData.map(watchlistItem => {
          // Use Array.filter() to filter out the movie with the specified id
          const updatedMovies = watchlistItem.movies.filter(movieObj => movieObj.id !== movie.id);
        
          // Return a new object with the updated movies array
          return {
            ...watchlistItem,
            movies: updatedMovies
          };
          
        });
        console.log("data after:", accessWatchlistData)
        setAccessWatchlistData(updatedWatchlist);
      }
      

  }
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
      <Card.Img src={movie["img_src"]}></Card.Img>
      <Card.Body>
        <Card.Text>{movie.summary}</Card.Text>
        <Card.Text>Release Date:{movie.release_date}</Card.Text>
      </Card.Body>
      {
        isWatchlistOwner ?
        <Button variant="danger" onClick={handleDeleteButton}>delete</Button> :
        <></>
      }
    </Card>
  );
};

export default MovieCard;
