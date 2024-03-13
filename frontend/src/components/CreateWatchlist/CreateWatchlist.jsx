import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import { api } from "../../utilities.jsx";
import "./CreateWatchlist.css";
import posterNotAvailable from "../../assets/posterNotAvailable.jpg";
import { CreateNewWatchlist, AddNewMovie } from "../../functions/CRUD.jsx";
const CreateWatchlist = (props) => {
  const [watchlistName, setWatchlistName] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const {
    selectedMovie,
    setSelectedMovie,
    setShowWatchlistModal,
    addToWatchlistState,
    setAddToWatchlistState,
    newWatchlistState,
    setNewWatchlistState,
    setMyWatchlistData,
    myWatchlistData,
  } = props;

  const handleCreateWatchlist = async (e) => {
    e.preventDefault();
    const user = Number(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    api.defaults.headers.common["Authorization"] = `Token ${token}`;

    const createWatchlistResponse = await CreateNewWatchlist(
      watchlistName,
      user,
      isPublic
    );
   
    if (createWatchlistResponse.statusText == "OK") {
      

      //Add new movie to newly created watchlist
      
      const { id } = createWatchlistResponse.data;
   
      //add new movie -> WatchlistObject with new movie added
      const addMovieResponse = await AddNewMovie(id, selectedMovie);
      

      if (addMovieResponse.statusText == "OK") {
        
        setMyWatchlistData([...myWatchlistData, addMovieResponse.data.data]);
        // filter out watchlist we just created so we 
        // can place in new watchlist WITH new movie added
        
        
        
        // add movie to watchlist in myWatchlistData

        setNewWatchlistState(false);
        setAddToWatchlistState(true);
        setShowWatchlistModal(false);
      }
    }
  };

  return (
    <Container className="mt-5 create-form ">
      <Row className="justify-content-center ">
        <Col>
          <div className="p-4 rounded bg-dark text-light">
            <Form>
              <Form.Group
                controlId="watchlistName"
                className="bg-dark text-light"
              >
                <Form.Control
                  type="text"
                  value={watchlistName}
                  onChange={(e) => setWatchlistName(e.target.value)}
                  className="bg-dark text-light mb-4"
                  autoComplete="off"
                  placeholder="watchlist name"
                />
              </Form.Group>
              <Form.Group controlId="isPublic">
                <Form.Check
                  type="checkbox"
                  label="Public Watchlist"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  className="bg-dark text-light checkbox"
                />
              </Form.Group>

              <button type="button" onClick={(e) => handleCreateWatchlist(e)}>
                Create Watchlist
              </button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateWatchlist;
