import React from 'react';
import { Button } from 'react-bootstrap';
import { useOutletContext } from "react-router-dom";

const AddToWatchlistButton = (props) => {
  const {showWatchlistModal, setShowWatchlistModal, selectedMovie, setSelectedMovie} = useOutletContext();
  
  
  const handleClick = () => {
    setShowWatchlistModal(true)
    setSelectedMovie(props.movie)

  };

  return (
    <Button variant="primary" onClick={handleClick}>
      +watchlist
    </Button>
  );
};

export default AddToWatchlistButton;