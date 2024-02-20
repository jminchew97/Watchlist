import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WatchlistCarousel from "../components/WatchlistCarousel";
import { Container, Button, Row } from "react-bootstrap";

import { api } from "../utilities.jsx";
const HomePage = () => {
  return (
    <Container className="landing-page text-center">
      <Row>
        <div className="col-sm center-all div-left">
          <h1>Explore Watchlists</h1>
          <p>
            Explore watchlists created by real users. This is also some more
            text and stuff.
          </p>
          <Button>Explore Watchlists</Button>
        </div>
        <div className="col-sm div-right">
          <div className="container-watchlist-feature">
            <WatchlistCarousel />
          </div>
        </div>
      </Row>
      <Row>
        <div className="col-sm flex-watchlist-widgets">
          {/* <WatchlistCarousel /> */}
          {/* <h1>TODO:Movie carousel</h1> */}
        </div>
        <div className="col-sm">
          {/* <h1>Explore Movies</h1> */}
          {/* <p>
            Explore watchlists created by real users. This is also some more
            text and stuff.
          </p> */}
          {/* <Button>Explore Movies</Button> */}
        </div>
      </Row>
    </Container>
  );
};

export default HomePage;
