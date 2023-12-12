import React from 'react';
import { Card, Button } from 'react-bootstrap';

const WatchlistCard = (props) => {
    const {id, name, user, movies } = props
    
    const firstThreeMovies = movies.slice(0,2)
  return (
    <Card bg="dark" text="white" style={{ width: '18rem' }}>
      <Card.Header as="h5">{name}</Card.Header>
      <Card.Body>
        <Card.Text>
            <ul>
        {firstThreeMovies.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
          
          </ul>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default WatchlistCard;