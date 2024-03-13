import React, { useState } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { useNavigate, useOutletContext } from "react-router-dom";
import { api } from "../utilities.jsx";
// import {api} from ""
const LoginForm = () => {
  const navigate = useNavigate();
  const { setUser, user, setMyWatchlistData} = useOutletContext();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/user/login/", formData);

      console.log(response);
      if (response.status === 200) {
        let user = response.data.user;
        let token = response.data.token;
        let id = response.data.id;

        localStorage.setItem("user", id);
        localStorage.setItem("token", token);
        api.defaults.headers.common["Authorization"] = `Token ${token}`;
        console.log(api.defaults.headers.common["Authorization"]);
        setUser({
          username: user,
          user_id: id,
        });

        if (localStorage.getItem("user") && localStorage.getItem("token")) {
          const user = localStorage.getItem("user");
          const token = localStorage.getItem("token");
  
          api.defaults.headers.common["Authorization"] = `Token ${token}`;
  
          // Fetch user watchlists
          const response = await api.get(`user/${user}/watchlists/`);
          
          response.statusText == "OK" ? setMyWatchlistData(response.data.data) :
          console.log(`There was an issue loading watchlist data: ${response.statusText}`)

        }
        navigate("/mywatchlists/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.id;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Container className="center-all">
      <Row>
        <Col>
          <form>
                <div className="mb-3">
                  <label htmlFor="username"className="form-label">
      
                  </label>
                  <input
                    type="text"
                    className="form-control bg-dark text-light border-light"
                    id="username"
                    onChange={handleInputChange}
                    placeholder="username"
                    value={formData.username}
                  />
                </div>
                <div className="mb-5">
                  <label htmlFor="password" className="form-label">
                   
                  </label>
                  <input
                    type="password"
                    className="form-control bg-dark text-light border-light"
                    id="password"
                    onChange={handleInputChange}
                    value={formData.password}
                    placeholder="password"

                  />
                </div>
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="w-100"
                >
                 <h3>
                  Login
                  </h3>
                </button>
              </form>
        </Col>
      </Row>
    </Container>

  );
};

export default LoginForm;
