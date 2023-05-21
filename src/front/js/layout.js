import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { DetailTrainer } from "./pages/detailTrainer";
import injectContext from "./store/appContext";
import { Navbar } from "./component/Navbar";
import { Footer } from "./component/footer";
import { DetailClass } from "./pages/detailClass";
import UpcomingClassesTrainee from "./pages/upcomingClassesTrainee";
import HomeTrainer from "./pages/homeTrainer";
import Profile from "./pages/profile";
import EditProfile from "./pages/editProfile";
import Search from "./pages/search";
import { LoadScript } from "@react-google-maps/api";
import "./layout.css";

const libraries = ["places"];

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;

  return (
    <div className="h-100">
      <BrowserRouter basename={basename}>
        <LoadScript
          googleMapsApiKey={"AIzaSyDDZ4KCljuX_ugUKoGDSsdiswCVE0k_UY8"}
          libraries={libraries}
        >
          <ScrollToTop>
            <Navbar />
            <div className="mx-sm-0 mx-md-2 mx-lg-3 fw-light min-vh-100 mb-5">
              <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<Register />} path="/register" />
                <Route element={<Login />} path="/login" />
                <Route element={<Profile />} path="/profile" />
                <Route element={<EditProfile />} path="/edit-profile" />
                <Route element={<HomeTrainer />} path="/home/trainer" />
                <Route element={<Search />} path="/search" />
                <Route
                  element={<UpcomingClassesTrainee />}
                  path="/trainee/upcomingclasses"
                />
                <Route
                  path="/trainer/:trainer_id"
                  element={<DetailTrainer />}
                />
                <Route
                  path="/activity_per_trainer/:activity_per_trainer_id"
                  element={<DetailClass />}
                />
                <Route element={<h1>Not found!</h1>} />
              </Routes>
            </div>
            <Footer />
          </ScrollToTop>
        </LoadScript>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
