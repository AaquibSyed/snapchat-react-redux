import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { resetImage, selectImage } from "./features/camSlice";
import { useHistory } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import { useDispatch } from "react-redux";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import CropIcon from "@material-ui/icons/Crop";
import EditIcon from "@material-ui/icons/Edit";
import TimerIcon from "@material-ui/icons/Timer";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import SendIcon from "@material-ui/icons/Send";
import { v4 as uuid } from "uuid";
import "./Preview.css";
import { db, storage } from "./firebase";
import firebase from "firebase";
import { selectUSer } from "./features/appSlice";

const Preview = () => {
  const cameraImage = useSelector(selectImage);
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectUSer);

  useEffect(() => {
    if (!cameraImage) {
      history.replace("/");
    }
  }, [cameraImage, history]);

  const closePreview = () => {
    dispatch(resetImage());
  };

  const sendPost = () => {
    const id = uuid();
    const uploadTask = storage
      .ref(`posts/${id}`)
      .putString(cameraImage, "data_url");

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("posts")
          .child(id)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              imageUrl: url,
              read: false,
              username: "aaquib",
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              profilePic: user.profilePic,
            });
            history.replace("/chats");
          });
      }
    );
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
      <div className="preview__Footer" onClick={sendPost}>
        <h3>Send</h3>
        <SendIcon fontSize="small" />
      </div>
      <img src={cameraImage} alt="cameraImage" />
    </div>
  );
};

export default Preview;
