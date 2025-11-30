import React, { useEffect, useState, useRef} from "react"
import {useSelector, useDispatch} from "react-redux"
import {useInfiniteQuery} from "react-query"
import "./singerPanel.scss"
import {useNavigate, Link} from "react-router-dom"
import { deleteMusicOrAlbum } from "./ReduxToolkit/authSlice.js"
import { useInView } from "react-intersection-observer"
import axios from "axios"
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";


export default function SingerPanel() {
const { ref, inView } = useInView();
 const auth =useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate= useNavigate()
  const [searchData, setSearchData] = useState("")
  const [type, setType] = useState("music")
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["seaffrch",searchData, type],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND}music/singerList/${auth.id}`, {
        params: { type: type, search: searchData, page: pageParam}
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
    <div className="singerPanel" >
     <h1>Danh sách Nhạc và Album của bạn</h1>
    <div style={{display: "flex"}}>
     <div className={type === "music" ? "isBoxType" : "boxType"}  onClick={() => setType("music")}>Nhạc</div>
      <div onClick={() => setType("album")} className={type === "album" ? "isBoxType" : "boxType"}>Album</div>
    
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
                  <span className="span1">{j.title}</span>

<div style={{display: "flex"}} >               
  <span className="span2">{type === "music" ? "Nhạc" : "Album" }</span>
   <Link to={`/edit/${j._id}/${j.type}`}>
                  <FaEdit style={{width: "40px", height: "40px", marginLeft: "10px", color: "#32CD32"}}/>
   </Link>             
     <MdDelete style={{width:"40px", height: "40px", color: "red"}} onClick={() => dispatch(deleteMusicOrAlbum({role: auth.role, _id: j._id, type: j.type}))}/>
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
