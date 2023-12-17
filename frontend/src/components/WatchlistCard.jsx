import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../utilities.jsx";
const WatchlistCard = (props) => {
  const {
    id,
    name,
    user,
    movies,
    key,
    watchlistId,
    myWatchlistData,
    setMyWatchlistData,
  } = props;
  const navigate = useNavigate();
  const firstThreeMovies = movies.slice(0, 2);

  const handleCardClick = () => {
    console.log(`Clicked a watchlist with id:${watchlistId}`);
    navigate(`/watchlist/${watchlistId}`);
    // redirect to watchlist page with route /watchlist/id
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("CALLING DELETE");
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    api.defaults.headers.common["Authorization"] = `Token ${token}`;
    console.log(watchlistId);
    const response = await api.delete(`watchlist/${watchlistId}`);

    if (response.status == 204) {
      console.log("before",myWatchlistData);
      const updatedList = myWatchlistData.filter(
        (item) => item !== watchlistId
      );

      // Update the state with the new array
      setMyWatchlistData(updatedList);
      console.log("after",myWatchlistData);
    }
  };
  return (
    <Card
      data-watchlist-id={watchlistId}
      bg="dark"
      text="white"
      style={{ width: "18rem" }}
      onClick={handleCardClick}
    >
      <Card.Header as="h5">{name}</Card.Header>
      <Card.Body>
        <Card.Text>
          <ul>
            {firstThreeMovies.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
          <Button variant="danger" onClick={(e) => handleDelete(e)}>
            Delete
          </Button>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default WatchlistCard;
