import React, { useEffect, useState, useRef} from "react";
import { useParams, Link, useNavigate} from "react-router-dom";

import "./albumDetail.scss";
import axios from "axios";
import Footer from "./footer.jsx";

import { useQuery, useInfiniteQuery } from "react-query";
import add1 from "./BioMusicImage/add.png";

import { useInView } from "react-intersection-observer";
import search1 from "./BioMusicImage/search.png"
import { MdCancel } from "react-icons/md";
import { setPlaylist} from "./ReduxToolkit/musicSlice.js"
import { addMusicToAlbum, removeMusicToAlbum } from "./ReduxToolkit/authSlice.js"

import { CiCircleMore } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";

export default function AlbumDetail() {
  const id = useParams();
  const { data } = useQuery({
    queryKey: ["us", id.id],
    queryFn: () =>
      axios.get(
        `${import.meta.env.VITE_BACKEND}music/album/detail/${id.id}`,
      ),
  });
  console.log(data)
   const [musicSearch, setMusicSearch] = useState("");

  const { data: addMusicList } = useQuery({
    queryKey: ["add", musicSearch],
    queryFn: () => {
      return axios.get(
        `${import.meta.env.VITE_BACKEND}music/albumAddMusic/${auth.id}`, {
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
    queryKey: ["album", id.id, querySearch],
    queryFn:  async ({ pageParam = 0 }) => {
      const res = await axios.get(
  `${import.meta.env.VITE_BACKEND}music/album/musics/${id.id}`,
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
},refetchInterval: 4000})

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
  const handleAdd = (musicId) => {
    dispatch(addMusicToAlbum({albumId: id.id, musicId: musicId}))
    refetch()
    
  } 
  const [setting, setSetting] = useState(false)
   
  return (
    <div className="profile">
      <div className="userDetail">
        <img src={data?.data?.image} alt="" width="100px" />
        <div className="userInfo">
          <p style={{ fontSize: "20px" }}>Album</p>
          <h2 style={{ color: "white", marginRight: "10px" }}>
            
            {data?.data?.title}
          </h2>
          <p onClick={() => navigate(`/user/${data?.data?.singerId?._id}`)} style={{ fontSize: "20px" }}>{data?.data?.singerId?.username}</p>
        </div>
      </div>
      {data?.data?.singerId?._id === auth.id ? (
        <div >
         
          {add ? <MdCancel style={{width: "40px", height: "40px" }} onClick={() => setAdd(!add) }/> : <img src={add1} alt="add" width="40px" height="40px" onClick={() => setAdd(!add) }  /> }
        </div>
      ) : null}
      <br />
      <br />
     {add ?
       (
         <>
           <h1>Thêm bài hát của bạn</h1>
           <div className="search1">
             <input type="text" placeholder="thêm bài hát.." onChange={e => setMusicSearch(e.target.value)} />
           </div>
           <div className="musicList">
             {addMusicList?.data?.map(music1 => (
           <div  className="userDetail1" key={music1._id}>
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
               <br/>
                <p style={{color: "red"}}>{auth.addAlbumError}</p>
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
                <div
      className="userDetail1"
      key={musicc._id}
      onClick={() => {
        dispatch(setPlaylist(page.data)); 
        navigate(`/music/${musicc._id}`); 
      }}
    >
                  <img src={musicc.image} alt="" width="70px" />
                  <div className="userInfo1">
                    <h2>{musicc.title}</h2>
                    

                    <p style={{ color: "white", marginRight: "10px" }}>
                      {musicc.singerId.username}
                    </p>
                
                  </div>
                </div>
                {data.data.singerId._id === auth.id ?
             <button style ={{ marginTop: "50px"}} onClick={() => dispatch(removeMusicToAlbum({albumId: id.id, musicId: musicc._id}))} className="removeButton">Xóa</button>
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
