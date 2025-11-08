import React, { useEffect, useState} from "react"
import { useParams, Link } from "react-router-dom"
import "./profile.scss"
import axios from "axios"
import { useQuery } from "react-query"
import { useSelector, useDispatch } from "react-redux"
import Footer from "./footer.jsx"
export default function Profile() {
 const id = useParams()
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: () => axios.get(`${import.meta.env.VITE_BACKEND}user/detail/${id.id}`)
  })
  const {data: playlist } = useQuery({
    queryKey: ["userPlaylist"],
    queryFn: () => axios.get(`${import.meta.env.VITE_BACKEND}music/user-playlist/${id.id}`)
  })
  return (
    <div className="profile" >

     <div className="userDetail">
         <img src={data?.data?.image} alt="" width="100px"/>
         <div className="userInfo">
          <p style={{fontSize: "20px"}}>Hồ Sơ</p>
          <h1 style={{color: "white", marginRight: "10px"}}>{data?.data?.username}</h1>
         </div>
        </div>
       <div className="playlist-user" >
        <div className="titleTop">
          <h1>Playlist</h1> 
        <button className="all">Chọn tất cả</button>
        </div>
        
         <div className="playlistList" >
          {playlist?.data?.map(i => (
             <Link to={`/playlist/${i._id}`} className="playlistBox" id={i._id}>
              <img src={i.image} alt="music" />
              <div className="playlistContent" >
              <h2>{i.title}</h2>
              <p>{i.userId.username}</p>
              </div>
            </Link>

          ))}
         
        </div>
       </div>
    <Footer />
    </div>
  )
}