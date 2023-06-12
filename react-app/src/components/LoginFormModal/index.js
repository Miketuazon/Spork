import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useSelector } from "react-redux";
import "./LoginForm.css";
import SignupFormModal from "../SignupFormModal";
import OpenModalButton from "../OpenModalButton";
import * as sessionActions from "../../store/session";
function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };
  const demoSignIn = async (e) => {
    e.preventDefault();
    const password = "password"
    const email = "demo@aa.io"
    const demoData = await dispatch(login(email, password));
    if (demoData) {
      setErrors(demoData);
    } else {
      closeModal();
    }
  }
  return (
    <>
      <div className="frog-login-video">
        <video
          autoPlay
          muted
          loop
          playsInline
          width="600"
          height="277"
        >
          <source
            src="https://assets.tumblr.com/pop/src/assets/images/login-wall/art_v2-004010f0.webm"
            type="video/webm;codec=vp9"
          />
          <source
            src="https://assets.tumblr.com/pop/src/assets/images/login-wall/art_v2-5c3eb22e.mp4"
            type="video/mp4"
          />
          <img
            src="https://assets.tumblr.com/pop/src/assets/images/login-wall/art_v2-3f0f7a0b.gif"
            alt=""
          />
        </video>
      </div>
      <div className="log-in-form-below-frog">
        <h4>Enter your email to log in or register:</h4>
        <form className="form-log-in" onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li className="error-message" key={idx}>{error}</li>
            ))}
          </ul>
          <label>
            <input className="email-and-password-form"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            <input className="email-and-password-form"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button className="login-button" type="submit">Log In</button>
          <div className="signup-link-in-login-form">
            Don't have an account yet?
            <br></br>
            <div className="submit-button-log-in">
              <button className="loginform-sign-in-button">
                <OpenModalButton
                  buttonText="Sign Up"
                  modalComponent={<SignupFormModal />}
                />
              </button>
              <button className="sign-up-button" />
              <button onClick={demoSignIn} className="demo-sign-in-button" id='demo-user-button'>
                Demo User
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
export default LoginFormModal;
