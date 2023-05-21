import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Avatar } from "@mui/material";
import ballet from "../../img/ballet.jpg";
import { IoMdSearch } from "react-icons/io";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  return (
    <nav className="navbar navbar-expand bg-body-tertiary bg-dark container-fluid">
      <div className="container-fluid d-flex ">
        <a className="navbar-brand" href={process.env.BASENAME}>
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
          <Avatar alt="Profile Pic" src={ballet} />
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
                        className="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {console.log("store.user", store.user)}
                        {store.user?.firstName}
                      </a>
                      <ul className="dropdown-menu dropdown-menu-end">
                        <li>
                          <Link className="dropdown-item" to="/edit-profile">
                            Edit Profile
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            to="/trainee/upcomingclasses"
                          >
                            My Upcoming Classes
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
