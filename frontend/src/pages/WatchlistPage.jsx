import { React, useContext, useEffect, useState } from "react";
import api from "../utilities.jsx";
import { useOutletContext, useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard.jsx";

const WatchlistPage = () => {
  const { setUser, user } = useOutletContext();
  const [responseData, setResponseData] = useState(null);
  
  const {id} = useParams()
  useEffect(() => {
    
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      console.log(`got token on watchlist page ${token}`)
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      const response = await api.get(`/watchlist/${id}`);
      setResponseData(response.data);
      
      
    };
    fetchData();
  }, []);

  return (
    <>
    {
      responseData   ?
      <>
        <h1>{responseData.data.name}</h1>
          {console.log(responseData.data)}
          {
            responseData.data.movies.map((item) => (
            <MovieCard 
            key={item.id}
            movie={item}
            watchlistId={responseData.data.id}
          /> 
            ))
          }
          
        </> 
        :  
        <h1>loading...</h1>
    }
      
    </>
  );
};

export default WatchlistPage;
