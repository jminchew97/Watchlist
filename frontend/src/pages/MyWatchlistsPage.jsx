import { React, useContext, useEffect, useState } from "react";
import api from "../utilities.jsx";
import { useOutletContext } from "react-router-dom";
import WatchlistCard from "../components/WatchlistCard.jsx";
import CreateWatchlist from "../components/CreateWatchlist.jsx";
const MyWatchlistsPage = () => {
  const { setUser, user } = useOutletContext();
  const [responseData, setResponseData] = useState([]);
  const [myWatchlistData, setMyWatchlistData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      const response = await api.get(`user/${user}/watchlists/`);
      // console.log(response.data.data);
      setResponseData(response.data.data);
      setMyWatchlistData(
        responseData.map((item) => item.id)
      )
    };

    fetchData();
  }, [myWatchlistData]);

  return (
    <>
    <CreateWatchlist
    myWatchlistData={myWatchlistData}
    setMyWatchlistData={setMyWatchlistData}
    />
      {responseData ? (
        <ul>
          {responseData.map((item, index) => (
            <WatchlistCard
              key={index}
              name={item.name}
              movies={item.movies}
              watchlistId={item.id}
              myWatchlistData={myWatchlistData}
              setMyWatchlistData={setMyWatchlistData}
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
