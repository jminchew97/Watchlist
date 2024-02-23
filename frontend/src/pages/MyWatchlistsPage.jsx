import { React, useContext, useEffect, useState } from "react";
import {api} from "../utilities.jsx";
import { useOutletContext } from "react-router-dom";
import WatchlistCard from "../components/WatchlistCard.jsx";
import CreateWatchlist from "../components/CreateWatchlist/CreateWatchlist.jsx";
const MyWatchlistsPage = () => {
  const {setMyWatchlistData, myWatchlistData} = useOutletContext();
  const [responseData, setResponseData] = useState([]);
  

  return (
    <>
    <CreateWatchlist
    myWatchlistData={myWatchlistData}
    setMyWatchlistData={setMyWatchlistData}
    />
      {myWatchlistData ? (
        <div className="flex-container">

        
          {myWatchlistData.map((item, index) => (
            <WatchlistCard
              key={index}
              name={item.name}
              movies={item.movies}
              watchlistId={item.id}
              myWatchlistData={myWatchlistData}
              setMyWatchlistData={setMyWatchlistData}
            />
          ))}
        </div>
      ) : (
        <h1>Create a watchlist!</h1>
      )}
    </>
  );
};

export default MyWatchlistsPage;
