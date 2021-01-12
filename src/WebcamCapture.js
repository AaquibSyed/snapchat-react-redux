import React, { useRef } from "react";
import Webcam from "react-webcam";

const videoConstaints = {
  height: 400,
  width: 250,
  facingMode: "user",
};

const WebcamCapture = () => {
  const webCamRef = useRef(null);

  return (
    <div className="webcamCapture">
      <Webcam
        audio={false}
        height={videoConstaints.height}
        width={videoConstaints.width}
        videoConstraints={videoConstaints}
        screenshotFormat="image/jpeg"
        ref={webCamRef}
      ></Webcam>
    </div>
  );
};

export default WebcamCapture;
