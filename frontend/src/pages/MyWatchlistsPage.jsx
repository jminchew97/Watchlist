import { React, useContext, useEffect, useState } from "react";
import api from "../utilities.jsx";
import { useOutletContext } from "react-router-dom";
import WatchlistCard from "../components/WatchlistCard.jsx";
const MyWatchlistsPage = () => {
  const { setUser, user } = useOutletContext();
  const [responseData, setResponseData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      const response = await api.get(`user/${user}/watchlists/`);
      // console.log(response.data.data);
      setResponseData(response.data.data);
      console.log(responseData);
    };

    fetchData();
  }, []);

  return (
    <>
      {responseData ? (
        <ul>
          {responseData.map((item, index) => (
            <WatchlistCard
              key={index}
              name={item.name}
              movies={item.movies}
              watchlistId={item.id}
            />
          ))}
        </ul>
      ) : (
        <h1>No user logged in</h1>
      )}
    </>
  );
};

export default MyWatchlistsPage;
