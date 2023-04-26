import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const Register = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const token = sessionStorage.getItem();

  const handleRegister = async () => {
    // Call your API endpoint to check if the email and password match
    const response = await fetch(
      "https://3001-frederico2191-mipt1-3m8823gmubq.ws-eu95.gitpod.io/api/token",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    )
      .then((response) => {
        if (response.ok) {
          // Registration successful
          return response.json();
        } else {
          // Registration failed
          console.log("Registration failed");
        }
      })
      .then((data) => {
        console.log(data)
        sessionStorage.setItem("token", data.access_token)
      }
      .catch((err) => console.erorr(err));
  };
  return (
    if (sessionStorage != undefined && sessionStorage != ""){
      <div>
        <h1>You are logged in with {token}</h1>      
      </div>
    } else
    <div className="registerForm">
      <h1>Register</h1>
      <input
        type="text"
        value={email}
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Save user</button>
    </div>
  );
};
