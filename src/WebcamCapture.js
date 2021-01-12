import React, { useRef, useCallback } from "react";
import Webcam from "react-webcam";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { useDispatch } from "react-redux";
import { setImage } from "./features/camSlice";

const videoConstaints = {
  height: 400,
  width: 250,
  facingMode: "user",
};

const WebcamCapture = () => {
  const webCamRef = useRef(null);
  const dispatch = useDispatch();

  const capture = useCallback(() => {
    const imageSource = webCamRef.current.getScreenshot();
    dispatch(setImage(imageSource));
  }, [webCamRef]);

  return (
    <div className="webcamCapture">
      <Webcam
        audio={false}
        height={videoConstaints.height}
        width={videoConstaints.width}
        videoConstraints={videoConstaints}
        screenshotFormat="image/jpeg"
        ref={webCamRef}
      />
      <RadioButtonUncheckedIcon
        className="webcamCapture__captureButton"
        fontSize="large"
        onClick={capture}
      />
    </div>
  );
};

export default WebcamCapture;
