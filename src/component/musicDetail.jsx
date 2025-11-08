import React from "react"
import { Link, useParams } from "react-router-dom"
import { useQuery } from 'react-query'
import { useDispatch, useSelector } from "react-redux"
import { FaHeart } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa"
  import { FaShareAlt } from "react-icons/fa";
import axios from 'axios'
import { useEffect } from "react"
import { Grid } from "@mui/material"

import { setCurrentSong, playSong, pauseSong, currentSong, isPlaying } from "./ReduxToolkit/musicSlice";
 
import "./musicDetail.scss"
import Footer from "./footer";
export default function MusicDetail() {
  const id = useParams()

  const dispatch = useDispatch();


  const { data } = useQuery({
   queryKey: ["musicdetail", id.id],
   queryFn: () => {
     return axios.get(`${import.meta.env.VITE_BACKEND}music/detail/${id.id}`)}
  })
  const { data : singer} = useQuery({
   queryKey: ["singer"],
   queryFn: () => {
     return axios.get(`${import.meta.env.VITE_BACKEND}music/singer/${data?.data?.singerId}`)}
  })
  const fetchData = () => {
      return axios.get(`${import.meta.env.VITE_BACKEND}music/dexuat`)
  }
  const { data: dexuat, isLoading, error } = useQuery({
  queryKey: ["dexuat"],
  queryFn: fetchData
  
})
  console.log(currentSong)
  const handlePlay = () => {
    
    if (!currentSong || currentSong._id !== id.id) {
      dispatch(setCurrentSong(data?.data)); // cập nhật Redux, PlayBar sẽ phát
    } else {
      dispatch(pauseSong());
    }
  };

  return(
    <div className="musicDetail">
      <Grid container spacing={3}>
        <Grid size={{xs: 12, sm: 12, md: 6, lg: 6 }} >
          <img src={data?.data?.image} alt="music" width="100%" style={{borderRadius: "10px" }} />
        </Grid>
        <Grid size={{xs: 12, sm: 12, md: 6, lg:6 }} >
        <h1>{data?.data?.title}</h1>
          <div className="infoBox" >
          <div className="heart" >
            <FaHeart style={{width: "50px", height: "50px"}} />
            <p>10</p>
          </div>
            <FaShareAlt style={{width: "50px", height: "50px"}}/>
          </div>
          <button className="ngheNhac" onClick={handlePlay}>{isPlaying && currentSong?._id === id.id ? "Dừng" : "Nghe Nhạc"}</button>
          <br/>
          <br/>
          <hr/>
            <h2>Ca sĩ</h2>
        <Link to={`/profile/${data?.data.singerId}`} className="userDetail">
         <img src={data?.data.singerImage} alt="" width="100px"/>
         <div className="userInfo">
          <p style={{fontSize: "23px"}}>{data?.data.singerName}</p>
          <span style={{color: "#d4d4d4", marginRight: "10px"}}>Bấm để xem trang của ca sĩ</span>
         </div>
        </Link>
       
          <br/> 
          <h2>Vài bản nhạc của ca sĩ</h2>
          <div className="singerMusic" >
            {singer?.data?.map(data => (
           <Link to={`/music/${data?._id}`} className="userDetail">
         <img src={data.image} alt="" width="100px"/>
         <div className="userInfo">
          <p style={{fontSize: "23px"}}>{data?.title}</p>
          <span style={{color: "#d4d4d4", marginRight: "10px"}}>{data?.singerName}</span>
         </div>
        </Link>   
            ))}
          </div>
           <h2>Đề xuất cho bạn</h2>
           <div className="suggestBox" >
             {dexuat?.data?.map(data => (
                <Link to={`/music/${data?._id}`} className="userDetail">
              <img src={data.image} alt="" width="100px"/>
              <div className="userInfo">
               <p style={{fontSize: "23px"}}>{data?.title}</p>
               <span style={{color: "#d4d4d4", marginRight: "10px"}}>{data?.singerName}</span>
              </div>
             </Link>   
                 ))}

           </div>
        </Grid>
     </Grid>
    <Footer />
    </div>
  )
}