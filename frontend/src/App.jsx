import "./App.css";
import { Outlet, Link, redirect } from "react-router-dom";
import { React, useState, useEffect } from "react";
import {api} from "./utilities.jsx";
import { Navbar, Nav } from "react-bootstrap";
import filmVaultLogo from './assets/filmVaultLogo.png'
// import { NavbarComponent } from "./components/NavbarComponent.jsx";
function App() {
  const [user, setUser] = useState(null);
  const [showWatchlistModal, setShowWatchlistModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [myWatchlistData, setMyWatchlistData] = useState([]);
  const [allUsersWatchlistsData,setAllUsersWatchlistData] = useState([])

  useEffect(() => {
    async function fetchUserWatchlist() {
      if (localStorage.getItem("user") && localStorage.getItem("token")) {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        setUser(user)
        api.defaults.headers.common["Authorization"] = `Token ${token}`;

        // Fetch user watchlists
        const response = await api.get(`user/${user}/watchlists/`);
        
        response.statusText == "OK" ? setMyWatchlistData(response.data.data) :
        console.log(`There was an issue loading watchlist data: ${response.statusText}`)

      }
      
    };
    
    async function  fetchWatchlistsForHomepage(){
      const response = await api.get(`watchlist/`);
      setAllUsersWatchlistData(response.data["watchlists"])
        // response.statusText == "OK" ? setMyWatchlistData(response.data.data) :
        // console.log(`There was an issue loading watchlist data: ${response.statusText}`)

    }
    fetchUserWatchlist();
    fetchWatchlistsForHomepage();
    
    

  
  }, []);
  // debug 

  useEffect(() => {
    console.log("successfully loaded all user watchlist data at app leve", allUsersWatchlistsData)
  }, [allUsersWatchlistsData]);
  return (
    <>
      <Navbar bg="black" expand="lg">
        <Navbar.Brand as={Link} to="/">
          <img className="logo" src={filmVaultLogo}></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {user == null ? (
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
                  Movies
                </Nav.Link>
                <Nav.Link as={Link}  to="/logout" >
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
          allUsersWatchlistsData,
        }}
      />
    </>
  );
}

export default App;
