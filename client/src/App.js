import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./theme/theme";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/Posts/PostDetails/PostDetails";
import DialogSlide from "./components/Feedback/DialogSlide";
import SnackbarSlide from "./components/Feedback/SnackbarSlide";

const App = () => {
  const user = useSelector((state) => state.user);
  const isDark = useSelector((state) => state.isDark);

  return (
    <ThemeProvider theme={isDark ? theme.darkTheme : theme.lightTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Container maxWidth="xl">
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate replace to="/posts" />} />
            <Route path="/posts" element={<Home />} />
            <Route path="/posts/search" element={<Home />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route
              path="/auth"
              element={!user ? <Auth /> : <Navigate replace to="/" />}
            />
          </Routes>
          <DialogSlide />
          <SnackbarSlide />
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
