import React, { useRef, useCallback } from "react";
import Webcam from "react-webcam";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { useDispatch } from "react-redux";
import { setImage } from "./features/camSlice";
import { useHistory } from "react-router-dom";
import "./WebcamCapture.css";

const videoConstaints = {
  height: 500,
  width: 350,
  facingMode: "user",
};

const WebcamCapture = () => {
  const webCamRef = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const capture = useCallback(() => {
    const imageSource = webCamRef.current.getScreenshot();
    dispatch(setImage(imageSource));
    history.push("/preview");
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
        className="webcamCapture__Button"
        fontSize="large"
        onClick={capture}
      />
    </div>
  );
};

export default WebcamCapture;
