import React from "react";
import "./homePage.scss";
import Footer from "./footer.jsx";
import { useSelector, useDispatch } from "react-redux"
import { logOutUser } from "./ReduxToolkit/authSlice.js"
import { Link } from "react-router-dom"
import axios from 'axios'
import { useEffect } from "react"

import { useQuery } from 'react-query'

export default function HomePage() {
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
    
    const fetchData = () => {
      return axios.get(`${import.meta.env.VITE_BACKEND}music/dexuat`)
    }
  const fetchData2 = () => {
    return axios.get(`${import.meta.env.VITE_BACKEND}music/moinhat`)
  }
  const fetchData3 = () => {
      return axios.get(`${import.meta.env.VITE_BACKEND}music/noibat`)
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

  const { data: noibat } = useQuery({
    queryKey: ["noibat"],
    queryFn: fetchData3
  })   
  return (
    <div className="homePage">
      <div className="section">
        <div className="titleTop">
          <h1>Đề xuất cho bạn</h1>
          <button className="all">Chọn tất cả</button>
        </div>
        <div className="musicList">
         {dexuat?.data?.map((i) => (
            <Link to={`/music/${i._id}`} className="musicBox" id={i._id}>
              <img src={i.image} alt="music" />
              <div className="musicContent" >
              <h2>{i.title}</h2>
              <p>{i.singerName}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="section">
        <div className="titleTop">
          <h1>Nhạc mới nhất</h1>
          <button className="all">Chọn tất cả</button>
        </div>
        <div className="musicList">
          {moinhat?.data?.map((i) => (
              <Link to={`/music/${i._id}`} className="musicBox" id={i._id}>
              <img src={i.image} alt="music" />
              <div className="musicContent" >
              <h2>{i.title}</h2>
              <p>{i.singerName}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="section">
        <div className="titleTop">
          <h1>Nổi bật</h1>
          <button className="all">Chọn tất cả</button>
        </div>
        <div className="musicList">
          {noibat?.data?.map((i) => (
              <Link to={`/music/${i._id}`} className="musicBox" id={i._id}>
              <img src={i.image} alt="music" />
              <div className="musicContent" >
              <h2>{i.title}</h2>
              <p>{i.singerName}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
