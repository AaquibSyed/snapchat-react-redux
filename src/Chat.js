import { Avatar } from "@material-ui/core";
import React from "react";
import StopIcon from "@material-ui/icons/Stop";
import "./Chat.css";
import ReactTimeago from "react-timeago";
function Chat({ profilePic, username, imageUrl, timestamp, read }) {
  return (
    <div className="chat">
      <Avatar src={profilePic} className="chat__avatar" />
      <div className="chat__info">
        <h4>{username}</h4>
        <p>
          Tap to view -
          <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} />
        </p>
      </div>
      {!read && <StopIcon className="chat__readIcon" />}
    </div>
  );
}

export default Chat;
