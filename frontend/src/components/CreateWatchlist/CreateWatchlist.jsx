import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import { api } from "../../utilities.jsx";
import "./CreateWatchlist.css";
import posterNotAvailable from "../../assets/posterNotAvailable.jpg";
import {CreateNewWatchlist, AddNewMovie} from "../../functions/CRUD.jsx"
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

    const createWatchlistResponse = await CreateNewWatchlist(watchlistName,user,isPublic)
    console.log(createWatchlistResponse)
    if (createWatchlistResponse.statusText == "OK") {
      setMyWatchlistData([...myWatchlistData, createWatchlistResponse.data])

      //Add new movie to newly created watchlist
      const {id} = (createWatchlistResponse).data 

      //add new movie
      const addMovieResponse = await AddNewMovie(id,selectedMovie)
      console.log(addMovieResponse)

      if ( addMovieResponse.statusText == "OK") {
        console.log("new movie added to watchilst", addMovieResponse.data)
        // add movie to watchlist in myWatchlistData


        setNewWatchlistState(false)
        setAddToWatchlistState(true)
        setShowWatchlistModal(false)
      }
      
    } 
  }

  return (
    <Container className="mt-5 create-form">
      {/* <input type='text' className='name-input' placeholder='watchlist name'></input>
      <h4>public</h4>
      <input type="radio" className='public-input'></input> */}

      <Row className="justify-content-center">
        <Col>
          <div className="p-4 border rounded bg-light">
            <Form>
              <Form.Group controlId="watchlistName">
                <Form.Label>Watchlist Name:</Form.Label>
                <Form.Control
                  type="text"
                  value={watchlistName}
                  onChange={(e) => setWatchlistName(e.target.value)}
                  autoComplete="off"
                />
              </Form.Group>
              <Form.Group controlId="isPublic">
                <Form.Check
                  type="checkbox"
                  label="Public Watchlist"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                />
              </Form.Group>

              <Button
                variant="dark"
                type="button"
                onClick={(e) => handleCreateWatchlist(e)}
              >
                Create Watchlist
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateWatchlist;
