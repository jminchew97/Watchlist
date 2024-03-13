import { React, useState } from "react";
import { api } from "../utilities.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

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
      const response = await api.post("user/signup/", formData);
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
    <Container>
      <Row>
        <Col>
          <form className="center-all">
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
              
              </label>
              <input
                type="text"
                className="form-control bg-dark text-light border-light"
                id="username"
                onChange={handleInputChange}
                value={formData.username}
                placeholder="username"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
             
              </label>
              <input
                type="email"
                className="form-control bg-dark text-light border-light"
                id="email"
                onChange={handleInputChange}
                value={formData.email}
                placeholder="email"
              />
            </div>
            <div className="mb-3">
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
            >
              <h3>
              Sign Up
              </h3>
            </button>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupForm;
