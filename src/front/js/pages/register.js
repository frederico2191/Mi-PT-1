import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newUser, setNewUser] = useState({
    email: null,
    password: null,
  });
  const navigate = useNavigate();

  const handleClick = () => {
    actions.register(email, password);
    navigate("/login");
  };

  if (store.token && store.token != "" && store.token != undefined) {
    navigate("/");
  }

  return (
    <div>
      <div className="text-center mt-5">
        <h1>Register</h1>
        {store.token && store.token != "" && store.token != undefined ? (
          "You are logged in with  the following token: " + store.token
        ) : (
          <div>
            <input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button onClick={handleClick}>Register</button>
          </div>
        )}
      </div>
      <Link to="/">
        <span className="btn btn-primary btn-lg" href="#" role="button">
          Back home
        </span>
      </Link>
    </div>
  );
};
