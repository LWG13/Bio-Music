import React from "react";
import "./homePage.scss";
import Footer from "./footer.jsx";
import { useSelector, useDispatch } from "react-redux"
import { logOutUser } from "./ReduxToolkit/authSlice.js"
import { Link, useNavigate  } from "react-router-dom"
import axios from 'axios'
import { useEffect } from "react"
import { useQuery } from 'react-query'
import { setPlaylist } from "./ReduxToolkit/musicSlice.js";

export default function HomePage() {
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
    
    const fetchData = () => {
      return axios.get(`${import.meta.env.VITE_BACKEND}music/dexuat`)
    }
  const fetchData2 = () => {
    return axios.get(`${import.meta.env.VITE_BACKEND}music/moinhat`)
  }
  const fetchData3 = () => {
    return axios.get(`${import.meta.env.VITE_BACKEND}music/album`)
  }
  
  const { data: dexuat, isLoading, error } = useQuery({
  queryKey: ["dexuat"],
  queryFn: fetchData
  
})
  console.log(dexuat)
  const { data: moinhat } = useQuery({
    queryKey: ["moinhat"],
    queryFn: fetchData2
  })
  const { data: album } = useQuery({
    queryKey: ["album"],
    queryFn: fetchData3
  })

  const handleClick = (i) => {
    dispatch(setPlaylist(moinhat?.data))

    navigate(`/music/${i}`)
  }

  const handleClick2 = (i) => {
    dispatch(setPlaylist(dexuat?.data))

    navigate(`/music/${i}`)
  }
  return (
    <div className="homePage">
      <div className="section">
        <div className="titleTop">
          <h1>Đề xuất cho bạn</h1>
          <button className="all" onClick={() => navigate("/section/dexuat")}>Chọn tất cả</button>
        </div>
        <div className="musicList">
         {dexuat?.data?.map((i) => (
            <div className="musicBox" id={i._id} onClick={() => handleClick2(i._id)}>
              <img src={i.image} alt="music" />
              <div className="musicContent" >
              <h2>{i.title}</h2>
              <p>{i.singerId.username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="section">
        <div className="titleTop">
          <h1>Nhạc mới nhất</h1>
          <button className="all" onClick={() => navigate("/section/moinhat")}>Chọn tất cả</button>
        </div>
        <div className="musicList">
          {moinhat?.data?.map((i) => (
              <div className="musicBox" id={i._id} onClick={() => handleClick(i._id)}>
              <img src={i.image} alt="music" />
              <div className="musicContent" >
              <h2>{i.title}</h2>
              <p>{i.singerId.username}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="section">
          <div className="titleTop">
            <h1>Đề xuất Album</h1>
            <button className="all" onClick={() => navigate("/section/album")}>Chọn tất cả</button>
          </div>
          <div className="musicList">
            {album?.data?.map((i) => (
                <Link to={`/album/${i._id}`} className="musicBox" id={i._id} >
                <img src={i.image} alt="music" />
                <div className="musicContent" >
                <h2>{i.title}</h2>
                <p>{i.singerId.username}</p>
                </div>
               </Link>
            ))}
                   
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
