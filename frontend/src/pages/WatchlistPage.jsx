import { React, useContext, useEffect, useState } from "react";
import {api} from "../utilities.jsx";
import { useOutletContext, useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard.jsx";
import { Container, Row, Col } from "react-bootstrap";
const WatchlistPage = () => {
  const {
    setUser,
    user,
    accessWatchlistData,
    setAccessWatchlistData,
    myWatchlistData,
  } = useOutletContext();
  
  const [responseData, setResponseData] = useState(null);
  const [isWatchlistOwner, setIsWatchlistOwner] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      // const token = localStorage.getItem("token");
      // api.defaults.headers.common["Authorization"] = `Token ${token}`;
      const response = await api.get(`/watchlist/${id}`);
      setResponseData(response.data);
    };

    fetchData();
  }, [accessWatchlistData]);

  useEffect(() => {
    // Wait until accessWatchlistData is populated
    if (myWatchlistData) {
      // Check if the watchlist is yours
      const isMyWatchlist = myWatchlistData.some(
        (watchlist) => watchlist.id === Number(id)
      );

      // Set the watchlist owner state
      setIsWatchlistOwner(isMyWatchlist);
    }
  }, [myWatchlistData, accessWatchlistData, id]);

  return (
    <>
      {responseData ? (
        <>
          <Container className="text-center">
            <h1>{responseData.data.name}</h1>
            
            <img
              className="profile-picture"
              src={responseData.data.user["profile_picture"]}
              alt="Profile"
            />
            <p>By <b>{responseData.data.user.username}</b></p>
            <div className="flex-container">
              {responseData.data.movies.map((item) => (
                <MovieCard
                  key={item.id}
                  movie={item}
                  watchlistId={responseData.data.id}
                  isWatchlistOwner={isWatchlistOwner}
                />
              ))}
            </div>
          </Container>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default WatchlistPage;
