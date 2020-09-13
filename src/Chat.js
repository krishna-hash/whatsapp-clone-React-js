import React, { useState, useEffect } from "react";
import "./Chat.css";
import { IconButton, Avatar } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from "react-router-dom";
import db from "./Firebase";
import { useStatevalue } from "./StateProvider";
import firebase from "firebase";

function Chat() {
  const [msg, setmsg] = useState("");
  const [val, setval] = useState("");
  const [rid, setrid] = useState("");
  const { roomid } = useParams();
  const [mess, setmessages] = useState([]);
  const [{ user }] = useStatevalue();

  useEffect(() => {
    if (roomid) {
      db.collection("rooms")
        .doc(roomid)
        .onSnapshot((snap) => setrid(snap.data().name));
      db.collection("rooms")
        .doc(roomid)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snap) => setmessages(snap.docs.map((doc) => doc.data())));
    }
  }, [roomid]);
  useEffect(() => {
    setval(Math.floor(Math.random() * 5000));
  }, [roomid]);
  const submit = (e) => {
    e.preventDefault();
    db.collection("rooms").doc(roomid).collection("messages").add({
      message: msg,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setmsg("");
  };

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar
          src={`https://avatars.dicebear.com/api/human/${val}.svg?mood[]=happy`}
        ></Avatar>
        <div className="chat_header-info">
          <h3>{rid}</h3>
          <p>
            Last seen{""}
            {new Date(mess[mess.length - 1]?.timestamp?.toDate()).toUTCString()}
          </p>
        </div>
        <div className="chat_header-right">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="chat_body">
        {mess.map((message) => (
          <p
            className={`chat_message ${
              user.displayName === message.name && "chat_receiver"
            }`}
          >
            <span className="chat_name">{message.name}</span>
            {message.message}
            <span className="chat_timeline">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      <div className="chat_footer">
        <InsertEmoticonIcon></InsertEmoticonIcon>
        <form>
          <input
            type="text"
            value={msg}
            onChange={(e) => setmsg(e.target.value)}
            placeholder="type here...."
          ></input>
          <button type="submit" onClick={submit}>
            send
          </button>
        </form>
        <MicIcon></MicIcon>
      </div>
    </div>
  );
}

export default Chat;
