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

  // useEffect(async () => {
  //   // let response = await api.get(`movieapi/top-rated`);
  //   // setTopRatedMovies(response.data.results);
  //   console.log("asdasdasd",allUsersWatchlistsData)
  //   return () => {}
  // }, [allUsersWatchlistsData]);

  // {
  //   "watchlists": [
  //     {
  //       "id": 8,
  //       "name": "my favorite action movies",
  //       "user": {
  //         "username": "bobbymitchel",
  //         "profile_picture": "https://cdn2.thecatapi.com/images/MTcxNTc1MA.jpg"
  //       },
  //       "movies": [
  //         {
  //           "id": 3,
  //           "name": "Mission: Impossible",
  //           "release_date": "1996-05-22",
  //           "summary": "When Ethan Hunt, the leader of a crack espionage team whose perilous operation has gone awry with no explanation, discovers that a mole has penetrated the CIA, he's surprised to learn that he's the No. 1 suspect. To clear his name, Hunt now must ferret out the real double agent and, in the process, even the score.",
  //           "img_src": "https://image.tmdb.org/t/p/w500/l5uxY5m5OInWpcExIpKG6AR3rgL.jpg"
  //         }
  //       ],
  //       "isPublic": true
  //     },
  //
  //   ]
  // }
  // useEffect(() => {
  //   console.log("Widget loading it successfully",allUsersWatchlistsData)

  //   return () => {}
  // }, [allUsersWatchlistsData]);
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
