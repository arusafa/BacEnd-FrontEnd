import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Make an API call to check if user is authenticated
    const checkAuthentication = async () => {
      const BASE_URL = "https://capstone-backend-gldz.onrender.com/home";
      try {
        const res = await axios.get(`${BASE_URL}/user`);
        setAuthenticated(true);
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    checkAuthentication();
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
