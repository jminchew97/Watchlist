import SearchBar from "../components/SearchBar.jsx";
import DbMovieCard from "../components/DbMovieCard.jsx";
import WatchlistModal from "../components/WatchlistModal.jsx";
import api from "../utilities.jsx";
import react, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const ExplorePage = () => {
  const [watchlists, setWatchlists] = useState(null) 
  const [responseData, setResponseData] = useState(null);
  
  useEffect(() => {
    // Define a function to fetch data
    const fetchData = async () => {
      try {
        // Make an API call or any asynchronous operation to get data
        const user = localStorage.getItem("user")
        const token = localStorage.getItem("token");

        
        api.defaults.headers.common["Authorization"] = `Token ${token}`;

        const response = await api.get(`user/${user}/watchlists/`);
        setWatchlists(response.data.data)
        // const result = await response.json();

        // // Update the state with the fetched data
        // setWatchlists(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function
    fetchData();

    // Optionally, you can return a cleanup function
    // This function will be called when the component unmounts
    // return () => {
    //   // Perform cleanup if needed
    // };
  }, []);
  const handleSearch = async (searchTerm) => {
    const encodedUrl = encodeURI(searchTerm); // "the batman" => "the%20batman"
    let response = await api.get(`movieapi/${encodedUrl}`);

    setResponseData(response.data.results);
  };
  
  return (
    <>
      <div>
        <h1>My Component</h1>
        <SearchBar onSearch={handleSearch} />
      </div>
      <div>
        <WatchlistModal
        watchlists={watchlists}

        />
        {responseData ? (
          <ul>
            {responseData.map((item, index) => (
              // <li key={item.id}>{item.title}</li>
              <DbMovieCard
                movie={item}
                key={index}
              />
            ))}
          </ul>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default ExplorePage;
