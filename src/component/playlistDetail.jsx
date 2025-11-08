import React, { useEffect, useState, useRef} from "react";
import { useParams, Link, useNavigate} from "react-router-dom";

import "./playlistDetail.scss";
import axios from "axios";
import { useQuery, useInfiniteQuery } from "react-query";
import { addMusicToPlaylist, removeMusicToPlaylist, deletePlaylist } from "./ReduxToolkit/authSlice.js"
import add1 from "./BioMusicImage/add.png";
import { useInView } from "react-intersection-observer";
import search1 from "./BioMusicImage/search.png"
import { MdCancel } from "react-icons/md";

import { CiCircleMore } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import Footer from "./footer.jsx";
export default function PlaylistDetail() {
  const id = useParams();
  const { data } = useQuery({
    queryKey: ["us", id.id],
    queryFn: () =>
      axios.get(
        `${import.meta.env.VITE_BACKEND}music/playlist/detail/${id.id}`,
      ),
  });
  console.log(data)
  const settingRef = useRef()
   const [musicSearch, setMusicSearch] = useState("");

  const { data: addMusicList } = useQuery({
    queryKey: ["add", musicSearch],
    queryFn: () => {
      return axios.get(
        `${import.meta.env.VITE_BACKEND}music/playlistAddMusic`, {
          params: { search: musicSearch}
        }
      )}
        });
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
const navigate= useNavigate()
  const { ref, inView } = useInView();

  const [search, setSearch] = useState("");
  const [querySearch, setQuerySearch] = useState("");

  const [add, setAdd] = useState(false)
  
  const {
    data: music,refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["playlisttt", id.id, querySearch],
    queryFn:  async ({ pageParam = 0 }) => {
      const res = await axios.get(
  `${import.meta.env.VITE_BACKEND}music/playlist/musics/${id.id}`,
  {
    params: { page: pageParam, limit: 10, search },
  }
);
return res.data 
    },
   getNextPageParam: (lastPage, allPages) => {
  const loadedCount = allPages.reduce(
    (sum, p) => sum + p.data.length,
    0
  );
  if (loadedCount >= lastPage.total) return undefined;
  return allPages.length;
},})

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
  const handleAdd = (musicId) => {
    dispatch(addMusicToPlaylist({playlistId: id.id, musicId: musicId}))
    refetch()
    
  }
  const [setting, setSetting] = useState(false)
    useEffect(() => {
   let handler = (e) => {
     if(settingRef.current && !settingRef.current.contains(e.target)){
       setSetting(false)
     }
   }
   document.addEventListener("mousedown", handler)
   return () => document.removeEventListener("mousedown",handler)
  }, [])
  return (
    <div className="profile">
      <div className="userDetail">
        <img src={data?.data?.image} alt="" width="100px" />
        <div className="userInfo">
          <p style={{ fontSize: "20px" }}>Danh sách phát</p>
          <h2 style={{ color: "white", marginRight: "10px" }}>
            {data?.data?.title}
          </h2>
        </div>
      </div>
      {data?.data?.userId === auth.id ? (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <CiCircleMore style={{ width: "40px", height: "40px" }} onClick={() => setSetting(true) } />
                          {setting ? <Setting setting={settingRef} dispatch={dispatch} id={id.id} navigate={navigate} /> : null}
          {add ? <MdCancel style={{width: "40px", height: "40px" }} onClick={() => setAdd(!add) }/> : <img src={add1} alt="add" width="40px" height="40px" onClick={() => setAdd(!add) }  /> }
        </div>
      ) : null}
      <br />
      <br />
     {add ?
       (
         <>
           <h1>Thêm bài hát</h1>
           <div className="search1">
             <input type="text" placeholder="thêm bài hát.." onChange={e => setMusicSearch(e.target.value)} />
           </div>
           <div className="musicList">
             {addMusicList?.data?.map(music1 => (
           <div  className="userDetail1">
             <img src={music1.image} alt="" width="70px" />
             <div className="userInfo1">
               <h2>{music1.title}</h2>
              <div style={{
               display: "flex"
              }} >
               <p style={{ color: "white", marginRight: "10px" }}>
                 {music1.singerName}
               </p>
               <button className="removeButton" onClick={() => handleAdd(music1._id)}>Thêm nhạc</button>
             </div>
             </div>
           </div>
             ))}
           </div>
           <div>
           
           </div>
         </>
       )
      : (
     <>
      <div className="search1">
        <input type="text" placeholder="tìm bài hát.." onChange={e => setSearch(e.target.value)} />
        <button className="buttonSearch" onClick={() => setQuerySearch(search)}> <img src={search1} alt="search" width="30px" height="30px" />
     </button>
      </div>
      
      <div className="playlist-user1">
        <h1>Các bản nhạc</h1>
        <div className="playlistList1">
          {music?.pages?.map((page, i) => (
            <div key={i}>
              {page?.data?.map(musicc => (
              <div style={{display: "flex"}}>
                <Link to={`/music/${musicc._id}`} className="userDetail1">
                  <img src={musicc.image} alt="" width="70px" />
                  <div className="userInfo1">
                    <h2>{musicc.title}</h2>
                    

                    <p style={{ color: "white", marginRight: "10px" }}>
                      {musicc.singerName}
                    </p>
                
                  </div>
                </Link>
                {data.data.userId === auth.id ?
             <button style ={{ marginTop: "50px"}} onClick={() => dispatch(removeMusicToPlaylist({playlistId: id.id, musicId: musicc._id}))} className="removeButton">Xóa</button>
                  : null}
                </div>
              ))}
            </div>
          ))}

          <div ref={ref} style={{ height: "50px" }}>
            {isFetchingNextPage && <p>Đang tải thêm...</p>}
          </div>
        </div>
      </div> </>
      )}
      <Footer />
    </div>
  );
}
function Setting({setting, dispatch,id, navigate}) {
 const handleDel = async () => {
  const res = await dispatch(deletePlaylist({_id: id}))
   if(res.success === "success" ) navigate("/libary")
}
  return (

         <div className={`dropdownmenu10`} ref={setting}>
           <Link to={`/edit-playlist/${id}`} className="dropdownitem10" >
              
             <p  className="link10" >Chỉnh sửa</p>
            </Link>
            <div className="dropdownitem10" onClick={() => handleDel()}  >
              <p  className="link10" >Xóa</p>
            </div>

         </div>

  )
}