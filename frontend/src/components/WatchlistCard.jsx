import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useNavigate, useOutletContext } from "react-router-dom";
import api from "../utilities.jsx";

const WatchlistCard = (props) => {
  const {
    id,
    name,
    user,
    movies,
    key,
    watchlistId,
    setAccessWatchlistData,
    accessWatchlistData,
  } = props;
  // const {accessWatchlistData,
  //   setAccessWatchlistData} = useOutletContext()
  const navigate = useNavigate();
  const { myWatchlistData } = useOutletContext();
  // const firstThreeMovies = movies.slice(0, 2);

  const handleCardClick = () => {
    console.log(`Clicked a watchlist with id:${watchlistId}`);
    navigate(`/watchlist/${watchlistId}`);
    // redirect to watchlist page with route /watchlist/id
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const isConfirmed = window.confirm(
      `Are you sure you want to delete: ${name}?`
    );

    if (isConfirmed) {
      const user = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      api.defaults.headers.common["Authorization"] = `Token ${token}`;

      const response = await api.delete(`watchlist/${watchlistId}`);

      if (response.status == 204) {
        console.log("before", accessWatchlistData);
        const updatedList = accessWatchlistData.filter(
          (item) => item.id !== watchlistId
        );
        setAccessWatchlistData(updatedList);
        console.log("after", accessWatchlistData);
      } else {
        // Your logic for canceled action
        console.log("Canceled action");
      }
    }
  };
  return (
    <Card
      data-watchlist-id={watchlistId}
      bg="light"
      text="black"
      style={{ width: "18rem" }}
      onClick={handleCardClick}
    >
      <Card.Header as="h5">{name}</Card.Header>
      <Card.Body>
        <div className="flex-container">
          {movies ? (
            <>
              {movies.slice(0, 4).map((item, index) => (
                <img
                  className="inside-watchlist-card"
                  key={index}
                  src={item["img_src"]}
                ></img>
              ))}
            </>
          ) : (
            <h1>empty</h1>
          )}
        </div>

        <Card.Text></Card.Text>
      </Card.Body>
      {user ? <Card.Footer>Created By:{user.username}</Card.Footer> : <></>}
      {myWatchlistData.some((watchlist) => watchlist.id == watchlistId) ? (
        <Button variant="danger" onClick={(e) => handleDelete(e)}>
          Delete
        </Button>
      ) : (
        <></>
      )}
    </Card>
  );
};

export default WatchlistCard;
