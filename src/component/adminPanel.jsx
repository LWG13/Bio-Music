import React, { useState, useEffect} from "react"
import "./adminPanel.scss"
import { useDispatch, useSelector } from "react-redux"

import { Link, useNavigate} from "react-router-dom"
import { Grid } from "@mui/material"
import { useInfiniteQuery } from "react-query"
import axios from "axios"
import { useInView } from "react-intersection-observer"
import { MdDelete } from "react-icons/md";
import { deleteMusicOrAlbumOrUser} from "./ReduxToolkit/authSlice.js"

export default function AdminPanel() {
const { ref, inView } = useInView()
  const auth =useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate= useNavigate()
  const [searchData, setSearchData] = useState("")
  const [type, setType] = useState("music")
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["adminh",searchData, type],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND}music/userList`, {
        params: { type: type, search: searchData, page: pageParam, role: auth.role}
      });
      return res.data;
    },
    getNextPageParam: (lastPage, allPages) => {
    const loadedCount = allPages.reduce(
      (sum, p) => sum + p.data.length,
      0
    )
    if (loadedCount >= lastPage.total) return undefined;
    return allPages.length;
      },
    refetchInterval: 3000
  
  });
  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
 
  return (
    <div className="admin" >
       <h1>Trang Admin</h1>
          <div style={{display: "flex"}}>
           <div className={type === "music" ? "isBoxType" : "boxType"}  onClick={() => setType("music")}>Nhạc</div>
            <div onClick={() => setType("album")} className={type === "album" ? "isBoxType" : "boxType"}>Album</div>
            <div onClick={() => setType("user")} className={type === "user" ? "isBoxType" : "boxType"}>Người dùng</div>

          </div>
            <div className="search1">
                   <input type="text" placeholder="thêm bài hát.." onChange={e => setSearchData(e.target.value)} />
                 </div>

            {data?.pages?.map((page, i) => (
            <div key={i} >
              {page?.data?.map(j => (
                  <div className="playlistBox">
                      <img src={j.image} alt="playlist" />
                      <div className="playlistContent">
                        <span className="span1">{type === "user" ? j.username : j.title}</span>

      <div style={{display: "flex"}} >               {type === "user" ? <span>{j._id}</span> : (
        <span className="span2">{type === "music" ? "Nhạc" : "Album" }</span>
   )}
    <MdDelete style={{width:"40px", height: "40px", color: "red"}} onClick={() => dispatch(deleteMusicOrAlbumOrUser({role: auth.role, _id: j._id, type: j.type}))}/>
      </div>
      </div>

                    </div>

              ))}      

            </div>
            ))}
            <div ref={ref} style={{ height: "50px" }}>
              {isFetchingNextPage && <p>Đang tải thêm...</p>}
            </div>

    </div>
  )
}