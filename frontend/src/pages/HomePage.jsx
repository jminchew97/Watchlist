import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import WatchlistCarousel from "../components/WatchlistCarousel";
import { Container, Button, Row } from "react-bootstrap";
import posterNotAvailable from "../assets/posterNotAvailable.jpg";

import { api } from "../utilities.jsx";
const HomePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Container className="container-1 text-center">
        <Row className="row-1">
          <div className="col-sm center-all div-left">
            <h1 className="text-light">Explore Watchlists</h1>
            <h3 className="text-light">
              Explore watchlists created by real users. Create your own and share them with the world!
            </h3>
            <button onClick={()=> navigate(`/explorewatchlists`)}>Explore Watchlists</button>
          </div>
          <div className="col-sm div-right">
            <div className="container-watchlist-feature">
              <WatchlistCarousel />
            </div>
          </div>
        </Row>
      </Container>
      <div className="container-2">
        <img
          className="movie-background-image"
          src="https://image.tmdb.org/t/p/original/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg"
        ></img>
        <div className="col-sm center-all container-2-content">
            <h1>Explore Movies</h1>
            <p>Explore film-vaults catalog containing millions of movies!</p>
            <button onClick={() => navigate(`/explore`)}>Explore Movies</button>
          </div>
      </div>
      <Container className="container-2">
        <Row className="container-2-row">
          
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
