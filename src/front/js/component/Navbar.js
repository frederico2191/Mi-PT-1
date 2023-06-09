import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Avatar } from "@mui/material";
import ballet from "../../img/ballet.jpg";
import { IoMdSearch } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  const isTrainer = store.user?.user_role == "trainer";
  const isTrainee = store.user?.user_role == "trainee";

  const getImageUrl = () => {
    const profileImage = store.user?.trainer?.profile_image_url;
    if (!profileImage) return "";
    const url = profileImage.split("/upload/");
    const findFace = "/upload/c_thumb,g_face,h_500,w_600/".concat(url[1]);
    const finalUrl = [url[0], findFace].join("");
    return finalUrl;
  };

  return (
    <nav className="navbar navbar-expand bg-body-tertiary bg-dark container-fluid">
      <div className="container-fluid d-flex ">
        <a className="navbar-brand text-white" href={process.env.BASENAME}>
          Mi-PT
        </a>
        <div className="d-flex">
          <Link to="/search" className="my-auto me-3">
            <IoMdSearch
              className="my-auto"
              style={{ fill: "lightGrey" }}
              size={30}
            />
          </Link>
          {store.user?.trainer?.profile_image_url && (
            <Avatar alt="Profile Pic" src={getImageUrl()} />
          )}
          <div className="ml-auto">
            {!store.token ? (
              <div>
                <Link to="/login">
                  <button className="btn btn-primary mx-3">Log In</button>
                </Link>
                <Link to="/register">
                  <button className="btn btn-primary">Register</button>
                </Link>
              </div>
            ) : (
              <div>
                <div className="" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle text-white"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {store.user?.firstName}
                      </a>
                      <ul className="dropdown-menu dropdown-menu-end">
                        <li>
                          {isTrainer ? (
                            <Link
                              className="dropdown-item"
                              to={`/trainer/${store.user?.trainer?.id}`}
                            >
                              My Profile
                            </Link>
                          ) : null}
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            to={`${
                              isTrainer ? "trainer" : "trainee"
                            }/edit-profile`}
                          >
                            Edit Profile   
                            <FaUserEdit size={15} />
                          </Link>
                        </li>
                        <li>
                          {isTrainee ? (
                            <Link
                              className="dropdown-item"
                              to="/trainee/upcomingclasses"
                            >
                              My Upcoming Classes
                            </Link>
                          ) : isTrainer ? (
                            <Link className="dropdown-item" to="/home/trainer">
                              My Classes
                            </Link>
                          ) : null}
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/">
                            Home
                          </Link>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            <button
                              onClick={() => actions.logout()}
                              className="btn btn-primary"
                            >
                              LOG OUT
                            </button>
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
