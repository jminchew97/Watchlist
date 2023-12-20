import { React, useContext, useEffect, useState } from "react";
import api from "../utilities.jsx";
import { useOutletContext, useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard.jsx";

const OthersWatchlists = () => {
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
      const token = localStorage.getItem("token");
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      const response = await api.get(`/watchlist/`);
      console.log(response)
      setResponseData(response.data);

    };

    fetchData();
  }, []);
 useEffect(() => {
  console.log(responseData)
 }, [responseData])
    // Set the watchlist owner state


  return (
    <>
      
    </>
  );
};

export default OthersWatchlists;
