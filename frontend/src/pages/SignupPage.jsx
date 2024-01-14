import { React, useState } from "react";
import api from "../utilities.jsx";
import axios from "axios"
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      // const response = await api.post("/user/login/", formData);
      const response = await api.post(
        "user/signup/",
        formData
      );
      if (response.status == 201) {
        navigate("/login");
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
              <h2 className="card-title text-center text-primary">Sign Up</h2>
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
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control bg-dark text-light border-light"
                    id="email"
                    onChange={handleInputChange}
                    value={formData.email}
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
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
