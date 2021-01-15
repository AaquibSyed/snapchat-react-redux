import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { resetImage, selectImage } from "./features/camSlice";
import { useHistory } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import "./Preview.css";
import { useDispatch } from "react-redux";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import CropIcon from "@material-ui/icons/Crop";
import EditIcon from "@material-ui/icons/Edit";
import TimerIcon from "@material-ui/icons/Timer";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import SendIcon from "@material-ui/icons/Send";
const Preview = () => {
  const cameraImage = useSelector(selectImage);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!cameraImage) {
      history.replace("/");
    }
  }, [cameraImage, history]);

  const closePreview = () => {
    dispatch(resetImage());
  };

  return (
    <div className="preview">
      <CloseIcon className="preview__close" onClick={closePreview} />
      <div className="preview__toolbarRight">
        <EditIcon />
        <TimerIcon />
        <TextFieldsIcon />
        <MusicNoteIcon />
        <CropIcon />
        <NoteAddIcon />
      </div>
      <div className="preview__Footer">
        <h2>Send</h2>
        <SendIcon />
      </div>
      <img src={cameraImage} alt="cameraImage" />
    </div>
  );
};

export default Preview;
