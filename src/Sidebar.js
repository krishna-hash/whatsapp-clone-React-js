import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { IconButton, Avatar } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Sidebarchat from "./Sidebarchat";
import db from "./Firebase";
import { useStatevalue } from "./StateProvider";

function Sidebar() {
  const [{ user }, dispatch] = useStatevalue();
  const [room, setroom] = useState([]);
  useEffect(() => {
    const subscribe = db.collection("rooms").onSnapshot((snap) => {
      setroom(
        snap.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return () => {
      subscribe();
    };
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar_headerparts">
          <IconButton>
            <DonutLargeIcon></DonutLargeIcon>
          </IconButton>
          <IconButton>
            <ChatIcon></ChatIcon>
          </IconButton>
          <IconButton>
            <MoreVertIcon></MoreVertIcon>
          </IconButton>
        </div>
      </div>
      <div className="sidebar_search">
        <div className="sidebar_searchcontainer">
          <IconButton>
            <SearchIcon></SearchIcon>
          </IconButton>
          <input type="text" placeholder="serach for values"></input>
        </div>
      </div>
      <div className="sidebar_chat">
        <Sidebarchat newchat />
        {room.map((room) => (
          <Sidebarchat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
