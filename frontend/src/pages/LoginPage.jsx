import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";
import api from "../utilities.jsx";
// import {api} from ""
const LoginForm = () => {
  const navigate = useNavigate();
  const { setUser, user } = useOutletContext();
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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card bg-dark text-light">
            <div className="card-body">
              <h2 className="card-title text-center text-primary">Login</h2>
              <form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control bg-dark text-light border-light"
                    id="username"
                    onChange={handleInputChange}
                    value={formData.username}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control bg-dark text-light border-light"
                    id="password"
                    onChange={handleInputChange}
                    value={formData.password}
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
