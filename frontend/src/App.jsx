import "./App.css";
import { Outlet, Link } from "react-router-dom";
import { React, useState } from "react";
function App() {
  const [user, setUser] = useState(null);

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
            </>
          )}
        </ul>
      </nav>

      <Outlet context={{ user, setUser }} />
    </>
  );
}

export default App;
