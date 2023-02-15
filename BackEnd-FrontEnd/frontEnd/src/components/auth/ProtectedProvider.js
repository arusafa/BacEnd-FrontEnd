import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ProtectedContext = createContext();

export const ProtectedProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const BASE_URL = "https://capstone-backend-gldz.onrender.com/home"

  const handleAuthentication = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user`);
      setAuthenticated(true);
      console.log(res.data);
    } catch (error) {
      setAuthenticated(false);
      navigate('/tutor/login');
    }
  };

  const login = async (email, password) => {
    try {
      await axios.post(`${BASE_URL}/tutor/login`, { email, password });
      handleAuthentication();
      navigate('/landing');
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`);
      setAuthenticated(false);
      navigate('/tutor/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProtectedContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </ProtectedContext.Provider>
  );
};
