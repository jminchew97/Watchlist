import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WatchlistCarousel from "../components/WatchlistCarousel";
import { Container, Button, Row } from "react-bootstrap";
import posterNotAvailable from "../assets/posterNotAvailable.jpg";

import { api } from "../utilities.jsx";
const HomePage = () => {
  return (
    <>
      <Container className="container-1 text-center">
        <Row className="row-1">
          <div className="col-sm center-all div-left">
            <h1>Explore Watchlists</h1>
            <p>
              Explore watchlists created by real users. This is also some more
              text and stuff.
            </p>
            <button>Explore Watchlists</button>
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
            <button>Explore Movies</button>
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
