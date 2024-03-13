import { React, useContext, useEffect, useState } from "react";
import {api} from "../utilities.jsx";
import { useOutletContext } from "react-router-dom";
import WatchlistCard from "../components/WatchlistCard.jsx";
import CreateWatchlist from "../components/CreateWatchlist/CreateWatchlist.jsx";
import { Col, Container, Row } from "react-bootstrap";
const MyWatchlistsPage = () => {
  const {setMyWatchlistData, myWatchlistData} = useOutletContext();
  const [responseData, setResponseData] = useState([]);
  

  return (
    <>
  
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
       
        <div className="center-all" >
            <h3>You currently have <i>no watchlists</i> . To create one, go to the <i><b>Movies</b></i> tab and search for a title to add.</h3>
        </div>
      )}
    </>
  );
};

export default MyWatchlistsPage;
