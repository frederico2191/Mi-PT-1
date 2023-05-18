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

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <div className="mx-5 fw-light">
            <Routes>
              <Route element={<Home />} path="/" />
              <Route element={<Register />} path="/register" />
              <Route element={<Login />} path="/login" />
              <Route element={<HomeTrainer />} path="/home/trainer" />
              <Route
                element={<UpcomingClassesTrainee />}
                path="/trainee/upcomingclasses"
              />
              <Route path="/trainer/:trainer_id" element={<DetailTrainer />} />
              <Route
                path="/activity_per_trainer/:activity_per_trainer_id"
                element={<DetailClass />}
              />
              <Route element={<h1>Not found!</h1>} />
            </Routes>
          </div>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
