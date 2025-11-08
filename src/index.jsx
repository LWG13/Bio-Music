import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import Home from "./component/home.jsx"
import Navigation from "./component/navigation.jsx"
import { Provider, useDispatch} from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./component/ReduxToolkit/authSlice.js"
import musicReducer from "./component/ReduxToolkit/musicSlice.js"
import { QueryClient, QueryClientProvider } from 'react-query'
import MusicDetail from "./component/musicDetail.jsx"
import PlaylistMobile from "./component/playlistMobile.jsx"
import PlaylistDetail from "./component/playlistDetail.jsx"

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
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigation />,
		children: [
			{
				path: "/",
        element: <Home />,
        children: [
          {
            path: "/",
            element: <HomePage />
          },
          { 
            path: "/music/:id",
            element: <MusicDetail />
          },
          {
            path: "/user/:id",
            element: <Profile />
          },
          {
            path: "/libary",
            element: <PlaylistMobile />
          },
          {
            path: "/playlist/:id",
            element: <PlaylistDetail />
          },
          {
            path: "/edit-playlist/:id",
            element: <EditPlaylist />
          }
        ]
			}
		]
		
  },
  {
   path: "/sign-up",
   element: <Signup />
  },
  {
   path: "/login",
   element: <Login />
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
    <QueryClientProvider client={queryClient}>
     <Provider store={store}> 
    
		<RouterProvider router={router} />
    
     </Provider>
      </QueryClientProvider>
	</React.StrictMode>
)