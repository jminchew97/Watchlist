import React, { useState, useEffect} from "react";
import { Button, Modal } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import api from "../utilities.jsx";
import posterNotAvailable from "../assets/posterNotAvailable.jpg"
const MyModal = (props) => {
  const {
    showWatchlistModal,
    setShowWatchlistModal,
    selectedMovie,
    setSelectedMovie,
    myWatchlistData,
    setMyWatchlistData,
    setDataTrigger,
    setAccessWatchlistData,
    dataTrigger
  } = useOutletContext();

  const handleShow = () => setShowWatchlistModal(true);
  const handleClose = () => setShowWatchlistModal(false);

  const handleClick = async (watchlist) => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    api.defaults.headers.common["Authorization"] = `Token ${token}`;

    const data = {
      name: selectedMovie["title"],
      release_date: selectedMovie["release_date"],
      summary: selectedMovie["overview"],
      
    };
    if (selectedMovie["poster_path"]){
      data["img_src"] = `https://image.tmdb.org/t/p/w500${selectedMovie["poster_path"]}`
    } else {
      data["img_src"] = posterNotAvailable
    }
    console.log(data);
    const response = await api.put(`watchlist/${watchlist.id}/movie`, {
      data: data,
    });
    if (response.status == 200){
      console.log("WORKED!!")
      
    }
    setShowWatchlistModal(false);
  };
  useEffect(() => {
    // Your logic to execute on component mount or when reloadKey changes
    console.log("loaded up ")
    setDataTrigger(dataTrigger+1)
    setAccessWatchlistData(myWatchlistData)
  }, [showWatchlistModal]);
  return (
    <>
      <Modal show={showWatchlistModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select watchlist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul >
            {myWatchlistData ? (
              <ul className="watchlist-selection-list">
                {myWatchlistData.map((item, index) => (
                  // console.log(props.watchlists[index])
                  <li key={item.id} onClick={() => handleClick(item)}>
                    {item.name}
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <p>No watchlists available.</p>
              </>
            )}
          </ul>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MyModal;
