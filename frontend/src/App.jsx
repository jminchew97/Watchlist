import "./App.css";
import { Outlet, Link } from "react-router-dom";
import { React, useState } from "react";
function App() {
  const [user, setUser] = useState(null);
  const [showWatchlistModal, setShowWatchlistModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null)
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          {!localStorage.getItem("user") ? (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/logout">Logout</Link>
              </li>
              <li>
                <Link to="/mywatchlists">MyWatchlist</Link>
              </li>
              <li>
                <Link to="/explore">Explore</Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      <Outlet
        context={
          { 
          user, 
          setUser, 
          showWatchlistModal, 
          setShowWatchlistModal,
          selectedMovie, 
          setSelectedMovie 
        }
      }
      />
    </>
  );
}

export default App;
