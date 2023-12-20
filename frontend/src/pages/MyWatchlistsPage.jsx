import { React, useContext, useEffect, useState } from "react";
import api from "../utilities.jsx";
import { useOutletContext } from "react-router-dom";
import WatchlistCard from "../components/WatchlistCard.jsx";
import CreateWatchlist from "../components/CreateWatchlist.jsx";
const MyWatchlistsPage = () => {
  const { setUser, user, setMyWatchlistData, myWatchlistData,accessWatchlistData, setAccessWatchlistData, setDataTrigger,dataTrigger} = useOutletContext();
  const [responseData, setResponseData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      
      setDataTrigger(dataTrigger+1)
      // setAccessWatchlistData(myWatchlistData)
    
    };

    fetchData();
    
  }, []); 
  useEffect(() => {
    const fetchData = async () => {
      setAccessWatchlistData(myWatchlistData)
    };

    fetchData();
    
  }, [myWatchlistData]); 
  return (
    <>
    <CreateWatchlist
    accessWatchlistData={accessWatchlistData}
    setAccessWatchlistData={setAccessWatchlistData}
    />
      {accessWatchlistData ? (
        <div className="flex-container">

        
          {accessWatchlistData.map((item, index) => (
            <WatchlistCard
              key={index}
              name={item.name}
              movies={item.movies}
              watchlistId={item.id}
              accessWatchlistData={accessWatchlistData}
              setAccessWatchlistData={setAccessWatchlistData}
            />
          ))}
        </div>
      ) : (
        <h1>No watchlists</h1>
      )}
    </>
  );
};

export default MyWatchlistsPage;
