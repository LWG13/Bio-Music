import React from 'react'
import { Outlet } from "react-router-dom"
import logo from "./BioMusicImage/logo.png"
import "./navigation.scss"
import search from "./BioMusicImage/search.png"
import nofication from "./BioMusicImage/nofication.png"
import homePage from "./BioMusicImage/home.png"
import music from "./BioMusicImage/music.png"
import user from "./BioMusicImage/lwg.jpg"
import homeMobile from "./BioMusicImage/homeMobile.png"
import library from "./BioMusicImage/library.png"
import { useNavigate, Link } from "react-router-dom"
import {useRef, useState, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { resetSuccess } from "./ReduxToolkit/authSlice.js"
import { verifyUser } from "./ReduxToolkit/authSlice"
export default function Navigation() {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const navigate = useNavigate()
  useEffect(() => {
   dispatch(verifyUser())
  },[])
  useEffect(() => {
   if(auth.userAuth === false) navigate("/login")
  })
  useEffect(() => {
        setTimeout(() => {
      dispatch(resetSuccess());
    }, 1000); 
  })
  return(
  <div style={{display: "flex", alignItems: "center", justifyContent: "center" }} >
   <div className="grid">
    <div className="navigation">
     <img src={logo} alt="biomusic" style={{width: "60px", height: "60px", marginTop: "7px" }} />
      <img src={homePage} alt="home" className="homeIcon" width="65px" height="65px" style={{marginTop: "6px", marginLeft: "16px" }}/>
     <div className="search1" >
      <input type="text" placeholder="Tìm nhạc...." />
      <button className="buttonSearch">
      <img src={search} alt="search" width="30px" height="30px"/>
        </button>
     </div>
     <img src={nofication} alt="nofication" className="nofication"/>
    <Link to={`/user/${auth.id}`}>
      <img src={auth.image} alt="user" className="userNav" style={{width: "40px", height: "40px", borderRadius: "50%", marginLeft: "10px", marginTop: "15px", float: "right"}}/>
    </Link>
    </div> </div>
    <div className="content">
    
     <Outlet />
    </div>
    <div className="navMobile">
     <div className="navMobileBox" >
      <img src={homeMobile} alt="home" />
      <p>Trang chủ</p>
     </div>
      <div className="navMobileBox" >
       <img src={music} alt="music" />
        <p>Nhạc</p>
       </div>
      <Link to="/libary" className="navMobileBox" >
        <img src={library} alt="library" />
        <p>Thư viện</p>

       </Link>
      <Link to={`/user/${auth.id}`} className="navMobileBox" >
        <img src={auth.image} alt="user" style={{borderRadius: "50%"}}/>
        <p>Tài Khoản</p>
      </Link>
    </div>
   
  </div>
  )
}