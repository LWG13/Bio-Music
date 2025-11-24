import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playlist: [],      
  currentIndex: 0, 
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
      state.currentIndex = 0;
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
     playNext: (state) => {
      const currentIndex = state.playlist.findIndex(
        (song) => song._id === state.currentSong?._id
      );
      if (currentIndex !== -1 && currentIndex < state.playlist.length - 1) {
        state.currentSong = state.playlist[currentIndex + 1];
      }
    },
    playPrev: (state) => {
      const currentIndex = state.playlist.findIndex(
        (song) => song._id === state.currentSong?._id
      );
      if (currentIndex > 0) {
        state.currentSong = state.playlist[currentIndex - 1];
      }
    },
    setPlaylist: (state, action) => {
      state.playlist = action.payload;
    },
    setAudioRef: (state, action) => {
      state.audio = action.payload;
    },
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },
  },
});

export const { setCurrentSong, playSong, currentSong, isPlaying, pauseSong, setAudioRef, togglePlay, playNext, playPrev,  setPlaylist,
 } =
  musicSlice.actions;
export default musicSlice.reducer;


