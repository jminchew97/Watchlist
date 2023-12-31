import "./App.css";
import { Outlet, Link } from "react-router-dom";
import { React, useState, useEffect } from "react";
import api from "./utilities.jsx";
import { Navbar, Nav } from "react-bootstrap";
function App() {
  const [user, setUser] = useState(null);
  const [showWatchlistModal, setShowWatchlistModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [myWatchlistData, setMyWatchlistData] = useState([]);
  const [accessWatchlistData, setAccessWatchlistData] = useState([]);
  const [dataTrigger, setDataTrigger] = useState(0);

  useEffect(() => {
    const fetchUserWatchlist = async () => {
      if (localStorage.getItem("user") && localStorage.getItem("token")) {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        api.defaults.headers.common["Authorization"] = `Token ${token}`;

        const response = await api.get(`user/${user}/watchlists/`);
        setMyWatchlistData(response.data.data);
        console.log("set new watchlist data");
      }
    };

    fetchUserWatchlist();

    return () => {};
  }, [dataTrigger]);
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/">
          Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {!localStorage.getItem("user") ? (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/mywatchlists">
                  MyWatchlist
                </Nav.Link>
                <Nav.Link as={Link} to="/explorewatchlists">
                  Explore Watchlists
                </Nav.Link>
                <Nav.Link as={Link} to="/explore">
                  Explore
                </Nav.Link>
                <Nav.Link as={Link} to="/logout" style={{ color: "red" }}>
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Outlet
        context={{
          user,
          setUser,
          showWatchlistModal,
          setShowWatchlistModal,
          selectedMovie,
          setSelectedMovie,
          setMyWatchlistData,
          myWatchlistData,
          accessWatchlistData,
          setAccessWatchlistData,
          dataTrigger,
          setDataTrigger,
        }}
      />
    </>
  );
}

export default App;
