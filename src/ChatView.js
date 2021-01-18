import React from "react";
import { useSelector } from "react-redux";
import { selectSelectedImage } from "./features/appSlice";
import { useHistory } from "react-router-dom";
import "./ChatView.css";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

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
      <div className="chatView__timer">
        <CountdownCircleTimer
          isPlaying={true}
          duration={10}
          strokeWidth={4}
          size={40}
          colors={[
            ["#044777", 0.33],
            ["#f7b801", 0.33],
            ["#A30000", 0.33],
          ]}
        >
          {({ remainingTime }) => {
            if (remainingTime === 0) {
              exit();
            }
            return remainingTime;
          }}
        </CountdownCircleTimer>
      </div>
    </div>
  );
};

export default ChatView;
