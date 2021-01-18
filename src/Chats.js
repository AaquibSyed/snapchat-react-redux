import "./Chats.css";

import React, { useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import { auth, db } from "./firebase";
import Chat from "./Chat";
import { useDispatch, useSelector } from "react-redux";
import { resetImage, selectUSer } from "./features/appSlice";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { useHistory } from "react-router-dom";

function Chats() {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUSer);
  const history = useHistory();
  const dispatch = useDispatch();

  const goToCam = () => {
    dispatch(resetImage());
    history.push("/");
  };
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapShot) =>
        setPosts(
          snapShot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);
  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar
          src={user.profilePic}
          onClick={() => auth.signOut()}
          className="chats__avatar"
        />
        <div className="chats__search">
          <SearchIcon className="chats__searchIcon" />
          <input type="text" placeholder="Friends" />
        </div>
        <ChatBubbleIcon className="chats__bubble" />
      </div>
      <div className="chats__posts">
        {posts.map(
          ({
            id,
            data: { profilePic, username, imageUrl, timestamp, read },
          }) => (
            <Chat
              key={id}
              id={id}
              profilePic={profilePic}
              username={username}
              imageUrl={imageUrl}
              timestamp={timestamp}
              read={read}
            />
          )
        )}
      </div>
      <div className="chats__gotoCamera">
        <RadioButtonUncheckedIcon
          fontSize="large"
          className="chats__camButton"
          onClick={goToCam}
        />
      </div>
    </div>
  );
}

export default Chats;
