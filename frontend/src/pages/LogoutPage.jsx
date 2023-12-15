import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";
import api from "../utilities.jsx";
// import {api} from ""
const LogoutPage = () => {
  const navigate = useNavigate();
  const {setUser, user} = useOutletContext();
 
 
    

    useEffect(() => {
      setUser(null)
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      delete api.defaults.headers.common["Authorization"]
      navigate("/login")

    return () => {
      // Code to run when the component unmounts
    };
  }, []);
 

  
  return (
    <></>
  );
};

export default LogoutPage;
