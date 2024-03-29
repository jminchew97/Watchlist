import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import { api } from "../../utilities.jsx";
import posterNotAvailable from "../../assets/posterNotAvailable.jpg";
import CreateWatchlist from "../CreateWatchlist/CreateWatchlist.jsx";
import "./WatchlistModal.css";
const MyModal = (props) => {
  const {
    showWatchlistModal,
    setShowWatchlistModal,
    selectedMovie,
    setSelectedMovie,
    myWatchlistData,
    setMyWatchlistData,
  } = useOutletContext();

  const [addToWatchlistState, setAddToWatchlistState] = useState(true);
  const [newWatchlistState, setNewWatchlistState] = useState(false);

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
    if (selectedMovie["poster_path"]) {
      data[
        "img_src"
      ] = `https://image.tmdb.org/t/p/w500${selectedMovie["poster_path"]}`;
    } else {
      data["img_src"] = posterNotAvailable;
    }
    console.log(data);
    const response = await api.put(`watchlist/${watchlist.id}/movie`, {
      data: data,
    });
    if (response.status == 200) {
      console.log("before", myWatchlistData);
      //replace watchlist with new watchlist with updated movies
      const newWatchlistData = myWatchlistData.filter((wlist) => wlist.id !== watchlist.id)
      console.log("after", newWatchlistData)
      setMyWatchlistData([...newWatchlistData, response.data.data])
      

    }
    setShowWatchlistModal(false);
  };

  const handleNewWatchlistButton = () => {
    setAddToWatchlistState(false);
    setNewWatchlistState(true);
  };

  useEffect(() => {
    console.log("myWatchlistData changed", myWatchlistData);
  }, [myWatchlistData]);
  return (
    <>
      <Modal show={showWatchlistModal} onHide={handleClose}>
        <Modal.Header closeButton className="bg-dark text-light border-0">
          <Modal.Title>
            {addToWatchlistState ? (
              <h3>Select Watchlist</h3>
            ) : (
              <h3>Create watchlist</h3>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-light ">
          {addToWatchlistState ? (
            <ul>
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
          ) : (
            <CreateWatchlist
              selectedMovie={selectedMovie}
              setSelectedMovie={setSelectedMovie}
              setShowWatchlistModal={setShowWatchlistModal}
              addToWatchlistState={addToWatchlistState}
              setAddToWatchlistState={setAddToWatchlistState}
              newWatchlistState={newWatchlistState}
              setNewWatchlistState={setNewWatchlistState}
              setMyWatchlistData={setMyWatchlistData}
              myWatchlistData={myWatchlistData}
            />
          )}
        </Modal.Body>
        <Modal.Footer className="bg-dark text-light border-0">
          {addToWatchlistState ? (
            <button onClick={handleNewWatchlistButton}>new</button>
          ) : (
            <></>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MyModal;
