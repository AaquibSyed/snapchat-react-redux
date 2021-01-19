import { Avatar } from "@material-ui/core";
import React from "react";
import StopIcon from "@material-ui/icons/Stop";
import "./Chat.css";
import ReactTimeago from "react-timeago";
import { useDispatch } from "react-redux";
import { selectImage } from "./features/appSlice";
import { useHistory } from "react-router-dom";
import { db } from "./firebase";
import DeleteIcon from "@material-ui/icons/Delete";

function Chat({ id, profilePic, username, imageUrl, timestamp, read }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const deleteChat = () => {
    db.collection("posts").doc(id).delete();
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
    }
  };
  return (
    <div className="chat" onClick={open}>
      <Avatar src={profilePic} className="chat__avatar" />
      <div className="chat__info">
        <h4>{username}</h4>
        {!read && (
          <p>
            Tap to view -
            <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} />
          </p>
        )}
        {read && (
          <p className="chat__details">
            <p>
              Received{" "}
              <ReactTimeago
                date={new Date(timestamp?.toDate()).toUTCString()}
              />
            </p>
            <DeleteIcon className="chat__delete" onClick={deleteChat} />
          </p>
        )}
      </div>
      {!read && <StopIcon className="chat__readIcon" />}
    </div>
  );
}

export default Chat;
