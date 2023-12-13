import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const WatchlistCard = (props) => {
    const {id, name, user, movies, key, watchlistId} = props
    const navigate = useNavigate()
    const firstThreeMovies = movies.slice(0,2)
    
    const handleCardClick = () => {
        console.log(`Clicked a watchlist with id:${watchlistId}`)
        navigate(`/watchlist/${watchlistId}`)
        // redirect to watchlist page with route /watchlist/id
    }
    return (
    <Card data-watchlist-id={watchlistId} bg="dark" text="white" style={{ width: '18rem' }} onClick={handleCardClick}>
      <Card.Header as="h5">{name}</Card.Header>
      <Card.Body>
        <Card.Text>
            <ul>
        {firstThreeMovies.map((item, index) => (
            <li key={index}  >{item.name}</li>
          ))}
          
          </ul>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default WatchlistCard;