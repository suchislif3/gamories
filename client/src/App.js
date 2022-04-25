import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container } from "@material-ui/core";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import DialogSlide from "./components/Feedback/DialogSlide";
import SnackbarSlide from "./components/Feedback/SnackbarSlide";

const App = () => {
  const user = useSelector(state => state.user);

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/auth" element={!user ? <Auth /> : <Navigate replace to="/" />} />
        </Routes>
        <DialogSlide />
        <SnackbarSlide />
      </Container>
    </BrowserRouter>
  );
};

export default App;
