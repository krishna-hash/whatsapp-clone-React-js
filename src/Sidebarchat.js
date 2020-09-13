import React, { useState, useEffect } from "react";
import "./sidebarchat.css";
import { Avatar } from "@material-ui/core";
import db from "./Firebase";
import { Link } from "react-router-dom";
import { useStatevalue } from "./StateProvider";

function Sidebarchat({ id, name, newchat }) {
  const [val, setval] = useState("");
  const [message, setmessage] = useState([]);
  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snap) => setmessage(snap.docs.map((doc) => doc.data())));
    }
  }, [id]);
  useEffect(() => {
    setval(Math.floor(Math.random() * 5000));
  }, []);
  const create = () => {
    const name = prompt("enter your name");
    if (name) {
      db.collection("rooms").add({
        name: name,
      });
    }
  };
  return !newchat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarchat">
        <Avatar
          src={`https://avatars.dicebear.com/api/human/${val}.svg?mood[]=happy`}
        ></Avatar>
        <div className="sidebarchat-info">
          <h2>{name}</h2>
          <p>{message[message.length - 1]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={create} className="sidebarchat">
      <h2>Add new chat</h2>
    </div>
  );
}

export default Sidebarchat;
