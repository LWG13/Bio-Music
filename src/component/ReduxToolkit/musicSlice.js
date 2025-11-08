import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSong: null,
  isPlaying: false,
  audio: null,
};

const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
      state.isPlaying = true;
    },
    playSong: (state) => {
      if (state.audio) state.audio.play();
      state.isPlaying = true;
    },
    pauseSong: (state) => {
      if (state.audio) state.audio.pause();
      state.isPlaying = false;
    },
    setAudioRef: (state, action) => {
      state.audio = action.payload;
    },
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },
  },
});

export const { setCurrentSong, playSong, currentSong, isPlaying, pauseSong, setAudioRef, togglePlay } =
  musicSlice.actions;
export default musicSlice.reducer;