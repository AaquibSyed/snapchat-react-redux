import { Avatar } from "@material-ui/core";
import React from "react";
import StopIcon from "@material-ui/icons/Stop";
import "./Chat.css";
import ReactTimeago from "react-timeago";
import { useDispatch } from "react-redux";
import { selectImage } from "./features/appSlice";
import { useHistory } from "react-router-dom";
import { db } from "./firebase";
function Chat({ id, profilePic, username, imageUrl, timestamp, read }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const exit = () => {
    history.replace("/");
  };

  const open = () => {
    if (!read) {
      dispatch(selectImage(imageUrl));
      db.collection("posts").doc(id).set(
        {
          read: true,
        },
        {
          merge: true,
        }
      );
      history.push("/chats/view");
    } else exit();
  };
  return (
    <div className="chat" onClick={open}>
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
