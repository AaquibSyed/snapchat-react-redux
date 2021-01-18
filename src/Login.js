import { Button } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { login } from "./features/appSlice";
import { auth, provider } from "./firebase";
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        dispatch(
          login({
            username: user.displayName,
            profilePic: user.photoURL,
            id: user.uid,
          })
        );
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <img
        src="https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg"
        alt="snapchat"
      />
      <Button variant="outlined" onClick={signIn}>
        SIGN IN
      </Button>
    </div>
  );
};

export default Login;
