import { useEffect, React, useState } from "react";
import { api } from "../utilities.jsx";
import Carousel from "react-bootstrap/Carousel";
import posterNotAvailable from "../assets/posterNotAvailable.jpg";
import { imageBaseUrl } from "../utilities";
import { useOutletContext } from "react-router-dom";
import WatchlistCard from "./WatchlistCard.jsx";
const WatchlistCarousel = (props) => {
  const [topRatedMovies, setTopRatedMovies] = useState(undefined);
  const { allUsersWatchlistsData } = useOutletContext();
  useEffect(()=> {
    
  },[allUsersWatchlistsData])
 
  return (
    <>
      
      <div className="watchlist-animator">
      
        {allUsersWatchlistsData[0] ? (
          allUsersWatchlistsData[0]["movies"].map((movie) => (
            <img src={movie["img_src"]}></img>
          ))
        ) : (
          <></>
        )}
      {allUsersWatchlistsData[0] ? (
          <p>@{allUsersWatchlistsData[0].user.username}</p>
      ) : (
        <></>
      )}
      </div>
      
      {/* <p>{allUsersWatchlistsData[0].user}</p> */}
    </>
  );
};

export default WatchlistCarousel;
