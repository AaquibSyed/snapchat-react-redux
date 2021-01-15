import { createSlice } from "@reduxjs/toolkit";

export const camSlice = createSlice({
  name: "camSlice",
  initialState: {
    image: null,
  },
  reducers: {
    setImage: (state, action) => {
      state.image = action.payload;
    },
    resetImage: (state) => {
      state.image = null;
    },
  },
});

export const { setImage, resetImage } = camSlice.actions;
export const selectImage = (state) => state.camera.image;
export default camSlice.reducer;
