import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import api from "../utilities.jsx";
const MyModal = (props) => {
  const {
    showWatchlistModal,
    setShowWatchlistModal,
    selectedMovie,
    setSelectedMovie,
  } = useOutletContext();

  const handleShow = () => setShowWatchlistModal(true);
  const handleClose = () => setShowWatchlistModal(false);

  const handleClick = async (watchlist) => {
    console.log(selectedMovie);

    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    api.defaults.headers.common["Authorization"] = `Token ${token}`;
    
    const response = await api.put(`watchlist/${watchlist.id}/movie`, {
      "data":{
      name: selectedMovie["title"],
      release_date: selectedMovie["release_date"],
      summary: selectedMovie["release_date"],
      }
    });
    console.log(response)
  };

  return (
    <>
      <Modal show={showWatchlistModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select watchlist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {props.watchlists ? (
              <ul>
                {props.watchlists.map((item, index) => (
                  // console.log(props.watchlists[index])
                  <li key={item.id} onClick={() => handleClick(item)}>
                    {item.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No watchlists available.</p>
            )}
          </ul>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MyModal;
