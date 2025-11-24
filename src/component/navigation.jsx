import React, {useState } from 'react'
import { Outlet, useNavigate } from "react-router-dom"
import logo from "./BioMusicImage/logo.png"
import "./navigation.scss"
import search6 from "./BioMusicImage/search.png"
import nofication from "./BioMusicImage/nofication.png"
import homePage from "./BioMusicImage/home.png"
import music from "./BioMusicImage/music.png"
import user from "./BioMusicImage/lwg.jpg"
import homeMobile from "./BioMusicImage/homeMobile.png"
import library from "./BioMusicImage/library.png"
import { Link } from "react-router-dom"
import {useRef,  useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { resetSuccess } from "./ReduxToolkit/authSlice.js"
import { verifyUser } from "./ReduxToolkit/authSlice"
export default function Navigation() {
  const [search, setSearch] = useState("")
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const navigate = useNavigate()
  useEffect(() => {
   dispatch(verifyUser())
  },[])
  useEffect(() => {
        setTimeout(() => {
      dispatch(resetSuccess());
    }, 1000); 
  })
  const handleSearch = () => {
   
    navigate(`/search/result?query=${encodeURIComponent(search.trim())}`);
  }
  return(
  <div style={{display: "flex", alignItems: "center", justifyContent: "center" }} >
   <div className="grid">
    <div className="navigation">
      <Link to="/" >

      <img src={logo} alt="biomusic" style={{width: "60px", height: "60px", marginTop: "7px" }} />
      </Link>
     <Link to="/" >
      <img src={homePage} alt="home" className="homeIcon" width="65px" height="65px" style={{marginTop: "6px", marginLeft: "16px" }}/>
       </Link>
      <img src={music} alt="music" className="nofication1"/>
     <div className="search1" >
      <input type="text" placeholder="Tìm nhạc...." onChange={e => setSearch(e.target.value)}/>
      <button className="buttonSearch">
      <img src={search6} alt="search" width="30px" height="30px" onClick={() => handleSearch() }/>
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
       <Link to="/"className="navMobileBox" >
      <img src={homeMobile} alt="home" />
      <p>Trang chủ</p>
     </Link>
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