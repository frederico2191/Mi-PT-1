import React from "react";
import "./footer.css";
import { BsFacebook, BsTwitter, BsInstagram, BsGithub } from "react-icons/bs";

export const Footer = () => (
  <footer className="footer">
    <div className="icons-container">
      <a href="https://facebook.com" target="_blank">
        <BsFacebook className="icon" style={{ fill: "lightGrey" }} size={30} />
      </a>
      <a href="https://twitter.com" target="_blank">
        <BsTwitter className="icon" style={{ fill: "lightGrey" }} size={30} />
      </a>
      <a href="https://instagram.com" target="_blank">
        <BsInstagram className="icon" style={{ fill: "lightGrey" }} size={30} />
      </a>
      <a href="https://github.com" target="_blank">
        <BsGithub className="icon" style={{ fill: "lightGrey" }} size={30} />
      </a>
    </div>
    <div className="text-container">
      <span className="copyright">© 2023 4GeeksAcademy</span>
    </div>
  </footer>
);
