import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import TutorList from "../tutor/TutorList";
import { ToastContainer } from "react-toastify";
import TutorLogin from "../tutor/TutorLogin";
import TutorSignup from "../tutor/TutorSignup";
import TutorLogout from "../tutor/TutorLogout";
import Whiteboard from "./Whiteboard";

function Navigation() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/home/tutor/login/:id" element={<Landing />} />
            <Route path="/home/tutor/signup" element={<TutorSignup />} />
            <Route path="/home/tutor/result" element={<TutorList />} />
            <Route path="/home/tutor/login" element={<TutorLogin />} />
            <Route path="/home/logout" element={<TutorLogout />} />
            <Route path="/home/whiteboard" element={<Whiteboard />} />
          </Routes>
          <ToastContainer />
        </Router>
      </div>
    </Container>
  );
}

export default Navigation;
