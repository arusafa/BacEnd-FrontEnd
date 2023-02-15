import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import "../../css/App.css";

export default function Landing() {
  const [user, setUser] = useState({});
  const BASE_URL = "https://capstone-backend-gldz.onrender.com/home"
  const { id } = useParams();

  useEffect(() => {
    getTutorById();
    // eslint-disable-next-line
  }, []);

  const getTutorById = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/tutor/${id||""}`);
      setUser(res.data);
    } catch (error) {
      console.log({ error: error.response });
    }
  };
  return (
    <div>
      <div className="block">
        <div className="header">
          <p>Online Tutorial Web Application</p>
        </div>
      </div>
      <div>
        <Link className="a" to={"/home/logout"}>
          Logout
        </Link>
      </div>
      <div className="main2">
        Web app that has features to promote collaboration between. 3 main
        features would be, video group chat, resources for learning, person blog
        for showing personal achievements and to find friends that like similar
        things, Whiteboard that helps the session with tutor by giving them
        tools for communication of concepts.
      </div>
      <div>Logged In User: {user._id}</div>
      <div className="link_wrapper">
        <Link className="a" to={"#"}>
          About
        </Link>
        <Link className="a" to={"#"}>
          Features
        </Link>
        <Link className="a" to={"#"}>
          Price
        </Link>
        <Link className="a" to={"/home/whiteboard"}>
          Whiteboard
        </Link>
        <Link className="a" to={"/tutor"}>
          Become Tutor
        </Link>
        <Link className="a" to={"/home/tutor/signup"}>
          Sign Up
        </Link>
        <Link className="a" to={"/home/tutor/login"}>
          Log In
        </Link>
        <Link className="a" to={"/home/tutor/result"}>
          DataDisplay
        </Link>
      </div>
    </div>
  );
}
