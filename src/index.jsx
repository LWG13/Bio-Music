import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import ProtectedRoute from "./userRoute.jsx"
import SingerRoute from "./singerRoute.jsx"

import Home from "./component/home.jsx"
import { ToastContainer } from "react-toastify"
import Navigation from "./component/navigation.jsx"
import { Provider, useDispatch} from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./component/ReduxToolkit/authSlice.js"
import CreateMusic from "./component/createMusic.jsx"
import musicReducer from "./component/ReduxToolkit/musicSlice.js"
import { QueryClient, QueryClientProvider } from 'react-query'
import MusicDetail from "./component/musicDetail.jsx"
import SingerPanel from "./component/singerPanel.jsx"
import PlaylistMobile from "./component/playlistMobile.jsx"
import Account from "./component/account.jsx"
import PlaylistDetail from "./component/playlistDetail.jsx"
import SearchResult from "./component/searchResult.jsx"
import AlbumDetail from "./component/albumDetail.jsx"
const queryClient = new QueryClient()

const store = configureStore({
  reducer: {
    auth: authReducer,
    music: musicReducer,
  }
})

import HomePage from "./component/homePage.jsx"
import Signup from "./component/signup.jsx"
import Login from "./component/login.jsx"
import Profile from './component/profile.jsx';
import EditPlaylist from './component/editPlaylist.jsx';
import PlaylistUser from "./component/playlistUser.jsx"
import Section from "./component/section.jsx"
import EditPassword from "./component/editPassword.jsx"
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigation />,
    children: [
      
      {
        element: <ProtectedRoute />,
        children: [
          {
        
            path: "/",
            element: <Home />,
            children: [
              { path: "/", element: <HomePage /> },
              { path: "/music/:id", element: <MusicDetail /> },
              { path: "/user/:id", element: <Profile /> },
              { path: "/user/:id/:type", element: <PlaylistUser /> },
              { path: "/libary", element: <PlaylistMobile /> },
              { path: "/playlist/:id", element: <PlaylistDetail /> },
              { path: "/album/:id", element: <AlbumDetail /> },
              { path: "/edit-playlist/:id", element: <EditPlaylist /> },
            {
        element: <SingerRoute />,
        children: [
          
      
              { path: "/singerPanel", element: <SingerPanel /> },
              { path: "/create", element: <CreateMusic /> },
        ]},
              { path: "/section/:id", element: <Section /> },
              { path: "/search/result", element: <SearchResult /> },
              { path: "/account", element: <Account /> },
              { path: "/edit-password", element: <EditPassword /> },
              
            ]
          }
        ]
      },

     
    ]},
    { path: "/sign-up", element: <Signup /> },
      { path: "/login", element: <Login /> }

    
]);
ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
    <Provider store={store}> 
    

    <QueryClientProvider client={queryClient}>
          <ToastContainer />
     
		<RouterProvider router={router} />
    
      </QueryClientProvider>
  </Provider>

  </React.StrictMode>
)