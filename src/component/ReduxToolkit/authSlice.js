import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { auth, provider, signInWithPopup } from "../../../firebaseConfig";
import { toast } from "react-toastify"
axios.defaults.withCredentials = true; 

export const googleUser = createAsyncThunk(
  "auth/googleUser",
  async (_, { rejectWithValue }) => {
    try {
      

      // Đăng nhập qua Firebase
      const result = await signInWithPopup(auth, provider);

      const idToken = await result.user.getIdToken()
   
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND}user/google`, {
          token: idToken
        }, { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );
  console.log(res)
  const verifyRes = await axios.get(`${import.meta.env.VITE_BACKEND}user/verify`);
      return verifyRes.data.user;
  } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ( values , { rejectWithValue }) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND}user/signup`, {
        username: values.username,
        email: values.email,
        password: values.password,
      });
      const verifyRes = await axios.get(`${import.meta.env.VITE_BACKEND}user/verify`);
      return verifyRes.data.user;
    } catch (err) {
      console.log(err)
      return rejectWithValue(err.response?.data?.message || "Register failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ( values , { rejectWithValue }) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND}user/login`, {
        email: values.email,
        password: values.password,
      });
      const verifyRes = await axios.get(`${import.meta.env.VITE_BACKEND}user/verify`);
      return verifyRes.data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

export const verifyUser = createAsyncThunk(
  "auth/verifyUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND}user/verify`);
      return res.data.user;
    } catch (err) {
      return rejectWithValue(null); 
    }
  }
);
export const follow = createAsyncThunk(
  "auth/fUser",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND}user/follow`, {
        userId: values.userId,
        followId : values.followId
      });
      return res.data.user;
    } catch (err) {
      return rejectWithValue(null); 
    }
  }
);
export const likePost = createAsyncThunk(
  "auth/lPost",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND}music/like`, {
        userId: values.userId,
        likeId : values.likeId
      });
      return res.data.user;
    } catch (err) {
      return rejectWithValue(null); 
    }
  }
);

export const createPlaylist = createAsyncThunk(
  "auth/playlistUser",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND}music/create-playlist`, {
        username: values.username,
        userImage: values.userImage,
        userId: values.userId
      });
      return res.data.user;
    } catch (err) {
      return rejectWithValue(null); 
    }
  }
);
export const createMusicOrAlbum = createAsyncThunk(
  "auth/cmoa",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND}music/createMusicOrAlbum`, {
        image: values.image,
        singerId: values.singerId,
        role: values.role,
        title: values.title,
        type: values.type,
        category: values.category,
        audio: values.audio
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message); 
    }
  }
);
export const addMusicToPlaylist = createAsyncThunk(
  "auth/playlistM",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${import.meta.env.VITE_BACKEND}music/add-music`, {
        playlistId: values.playlistId,
        musicId: values.musicId,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(null); 
    }
  }
);
export const editPlaylist = createAsyncThunk(
  "auth/playlistM",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${import.meta.env.VITE_BACKEND}music/edit-playlist`, {
        _id: values._id,
        title: values.title,
        image: values.image,
        isPublic: values.isPublic
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(null); 
    }
  }
);

export const editUser = createAsyncThunk(
  "auth/usM",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${import.meta.env.VITE_BACKEND}user/editUser`, {
        _id: values._id,
        username: values.username,
        image: values.image,
     });
      return res.data;
    } catch (err) {
      return rejectWithValue(null); 
    }
  }
);

export const removeMusicToPlaylist = createAsyncThunk(
  "auth/playlistR",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${import.meta.env.VITE_BACKEND}music/remove-music`, {
        playlistId: values.playlistId,
        musicId: values.musicId,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(null); 
    }
  }
);
export const addMusicToAlbum = createAsyncThunk(
  "auth/playlistMjbg",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${import.meta.env.VITE_BACKEND}music/add-music/album`, {
        albumId: values.albumId,
        musicId: values.musicId,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message); 
    }
  }
);
export const removeMusicToAlbum = createAsyncThunk(
  "auth/playlistAlb",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${import.meta.env.VITE_BACKEND}music/remove-music/album`, {
        albumId: values.albumId,
        musicId: values.musicId,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(null); 
    }
  }
);
export const editPassword = createAsyncThunk(
  "auth/pass",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${import.meta.env.VITE_BACKEND}user/editPassword`, {
        _id: values._id,
        passwordUser: values.passwordUser,
        newPassword: values.newPassword
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message); 
    }
  }
);
export const deletePlaylist = createAsyncThunk(
  "auth/playlistD",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_BACKEND}music/delete-playlist`, {
  data: { _id: values._id },
});
      return res.data;
    } catch (err) {
      return rejectWithValue(null); 
    }
  }
);
export const deleteMusicOrAlbum = createAsyncThunk(
  "auth/ma",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_BACKEND}music/deleteAlbumOrMusic`, {
  data: { _id: values._id, role: values.role,type:  values.type},
});
      return res.data;
    } catch (err) {
      return rejectWithValue(null); 
    }
  }
);

export const logOutUser = createAsyncThunk("auth/logoutUser", async () => {
  await axios.post(`${import.meta.env.VITE_BACKEND}user/logout`);
  return null; 
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    id: "",
    username: "",
    email: "",
    image: "",
    userAuth: false,
    role: "",
    loading: false,
    registerError: null,
    editPlaylist: false,
    registerStatus: "",
    addAlbumError: null,
    loginError: null,
    editPassword: false,
    createMusic: false,
    editPasswordError: null,
    loginStatus: "",
  },
  reducers: {
        resetSuccess(state,action) {
      return {
        ...state,
        editPlaylist: false,
        editPassword: false,
        createMusic: false
      }
        }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.registerStatus = "pending"
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.id = action.payload._id;
        state.username = action.payload.username
        state.email = action.payload.email
        state.image = action.payload.image
        state.registerStatus = "success",
        state.userAuth = true
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.registerError = action.payload;
        state.registerStatus = "reject"
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loginStatus = "pending";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
     state.userAuth = true
        state.id = action.payload._id;
        state.username = action.payload.username
        state.email = action.payload.email
        state.image = action.payload.image
        state.loginStatus = "success"
      })
      .addCase(googleUser.fulfilled, (state, action) => {
        state.loading = false;
      state.userAuth = true
        state.id = action.payload._id;
        state.username = action.payload.username
        state.email = action.payload.email
        state.image = action.payload.image
        state.loginStatus = "success"
      })
.addCase(loginUser.rejected, (state, action) => {
        state.loginStatus = "reject";
        state.loginError = action.payload;
      })

      // VERIFY
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.id = action.payload._id;
        state.username = action.payload.username
        state.email = action.payload.email
        state.image = action.payload.image
        state.userAuth = true
        state.role = action.payload.role
      })
      .addCase(createPlaylist.fulfilled, (state) => {
      
    })
      // LOGOUT
      .addCase(logOutUser.fulfilled, (state) => {
        state.username = null;
        state.id = null;
        state.email = null;
        state.image = null
        state.userAuth = false
      })

    .addCase(editPlaylist.fulfilled, (state) => {
    toast.success(`Edit Playlist successfully`, {
          position: "top-right"
     })
   return {
     ...state,
     editPlaylist: true,
    }
    }) .addCase(editPassword.fulfilled, (state) => {
 toast.success(`Edit password successfully`, {
          position: "top-right"
        })

 return {
   ...state,
    editPassword : true
    }
    })
.addCase(editPassword.rejected, (state, action) => {
      state.editPasswordError = action.payload 
    })
     .addCase(createMusicOrAlbum.fulfilled, (state) => {
        toast.success("Creating successfully", {
          position: "top-right"
        })
       state.createMusic = true
     })
    .addCase(addMusicToAlbum.rejected, (state, action) => {
        
       state.addAlbumError = action.payload
     })
     
      .addCase(addMusicToAlbum.fulfilled, (state, action) => {
         toast.success("Add music to album successfully", {
              position: "top-right"
            })
        return {
          ...state
        }
         })
    .addCase(removeMusicToAlbum.fulfilled, (state, action) => {
       toast.success("remove music to album successfully", {
            position: "top-right"
          })
      return {
        ...state
      }
       })
    .addCase(deleteMusicOrAlbum.fulfilled, (state, action) => {
       toast.success("delete music or album successfully", {
            position: "top-right"
          })
      return {
        ...state
      }
       })
  },
});
export const {resetSuccess} = authSlice.actions
export default authSlice.reducer;