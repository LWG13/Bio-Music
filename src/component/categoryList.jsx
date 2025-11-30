import React, { useState, useEffect} from "react"
import "./category.scss"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { IoArrowBackSharp } from "react-icons/io5"

import { Link, useNavigate} from "react-router-dom"
import { Grid } from "@mui/material"
import { useQuery } from "react-query"
export default function CategoryList() {
  const fetchData = () => {
      return axios.get(`${import.meta.env.VITE_BACKEND}music/dexuat`)
  }
  const { data: dexuat, isLoading, error } = useQuery({
  queryKey: ["dexuat"],
  queryFn: fetchData
  
})
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const navigate = useNavigate()



  return (
    <div className="category" >
       <Link to="/" >
      <IoArrowBackSharp style={{ width: "40px", height: "40px", color: "white"}}/>
      </Link>
     
     <h1>Thể loại nhạc</h1>
    <div style={{display: "flex", flexDirection: "column"}} >
      <Grid container spacing={4}>
       <Grid size={{xs: 4, sm: 4, md: 3, lg: 3}} >
        <Link to="/category/anime" className="categoryBox">
         <span>Anime</span>
        </Link>
       </Grid>
         <Grid size={{xs: 4, sm: 4, md: 3, lg: 3}} >
        <Link to="/category/phonk" className="categoryBox">
           Phonk
          </Link>
         </Grid>
        <Grid size={{xs: 4, sm: 4, md: 3, lg: 3}} >
          <Link to="/category/pop" className="categoryBox">
             Nhạc Pop
            </Link>
           </Grid>
        <Grid size={{xs: 4, sm: 4, md: 3, lg: 3}} >
        <Link to="/category/giaitri" className="categoryBox">
           Giải Trí
          </Link>
         </Grid>
        <Grid size={{xs: 4, sm: 4, md: 3, lg: 3}} >
          <Link to="/category/hiphop" className="categoryBox">
             Hip Hop
            </Link>
           </Grid>
      </Grid>
      </div>
      <h2>Đề xuất</h2>
      <Grid container spacing={2} >{dexuat?.data?.map(i => (
          <Grid size={{xs: 6, sm: 6, md: 4, lg: 4}} key={i._id}>
            <Link to={`/music/${i._id}`} className="playlistBox1" id={i._id}>
          <img src={i.image} alt="music" />
          <div className="playlistContent" >
          <h2>{i.title}</h2>
          <p>{i.singerId.username}</p>
          </div>
        </Link>
          </Grid>

        ))}
      </Grid>
    </div>
  )
}
