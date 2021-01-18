import React from "react";
import { useSelector } from "react-redux";
import { selectSelectedImage } from "./features/appSlice";
import { useHistory } from "react-router-dom";

const ChatView = () => {
  const history = useHistory();
  const exit = () => {
    history.replace("/chats");
  };
  const selectedImage = useSelector(selectSelectedImage);
  if (!selectedImage) {
    exit();
  }
  return (
    <div className="chatView" onClick={exit}>
      <img src={selectedImage} alt="error loading" />
    </div>
  );
};

export default ChatView;
