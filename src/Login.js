import React from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "./Firebase";
import { actiontypes } from "./reducer";
import { useStatevalue } from "./StateProvider";

function Login() {
  const [{}, dispatch] = useStatevalue();

  const submit = (e) => {
    e.preventDefault();
    auth
      .signInWithPopup(provider)
      .then((data) => {
        dispatch({
          type: actiontypes.SET_USER,
          user: data.user,
        });
      })
      .catch((err) => alert(err.message));
  };
  return (
    <div className="login">
      <div className="Login_body">
        <img
          src="https://dutchidiom.files.wordpress.com/2018/05/whatsapp-messenger-logo.png"
          alt="whatsapp"
          height="150px"
          width="150px"
        ></img>
        <h2>whatsapp login</h2>
        <Button type="submit" onClick={submit}>
          sign in with Google
        </Button>
      </div>
    </div>
  );
}

export default Login;
