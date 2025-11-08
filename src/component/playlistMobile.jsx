import React, { useEffect, useState } from "react"
import { useDispatch, useSelector} from "react-redux"
import logo from "./BioMusicImage/lwg.jpg";
import { Link } from "react-router-dom"
import add from "./BioMusicImage/add.png";
import { useQuery, useInfiniteQuery} from "react-query"
import axios from "axios"
import { createPlaylist } from "./ReduxToolkit/authSlice.js"
import "./playlistMobile.scss"
import { useInView } from "react-intersection-observer";
import search1 from "./BioMusicImage/search.png"



export default function PlaylistMobile() {
   const auth = useSelector(state => state.auth)
   const { ref, inView } = useInView();

  const [search, setSearch] = useState("");
  const [querySearch, setQuerySearch] = useState("");

  const dispatch = useDispatch()
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
  queryKey: ['userPlaylists', auth.id, querySearch],
  queryFn: async ({ pageParam = 0 }) => {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND}music/playlist/${auth.id}`, {
      params: { page: pageParam, limit: 10, search },
    })
     return res.data 
  },
  getNextPageParam: (lastPage, allPages) => {
     const loadedCount = allPages.reduce(
    (sum, p) => sum + p.data.length,
    0
  )
  if (loadedCount >= lastPage.total) return undefined;
  return allPages.length;
  },refetchInterval: 4000
});
  console.log(data)
  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="playlistPage" >
      <div className="upperSide">
        <h2>Thư viện </h2>
        <img
          src={add}
          alt="add"
          width="30px"
          height="30px"
          style={{ marginTop: "20px", marginRight: "20px" }}
          onClick={() => dispatch(createPlaylist({username: auth.username, userId: auth.id}))}
        />
      </div>
      <br/>
      <div className="search1">
        <input type="text" placeholder="tìm bài hát.." onChange={e => setSearch(e.target.value)} />
        <button className="buttonSearch" onClick={() => setQuerySearch(search)}> <img src={search1} alt="search" width="30px" height="30px" />
     </button>
      </div>
      <div className="playlist">
              <br/>
              <br/>
              
               { data?.pages?.map((page, i) => (
          <div key={i} >
            {page?.data?.map(playlist => (
              <Link to ={`/playlist/${playlist._id}`} className="playlistBox">
                <img src={playlist.image} alt="playlist" />
                <div className="playlistContent">
                  <span className="span1">{playlist.title}</span>
                  <span className="span2">Danh sách phát • {playlist.userId.username}</span>
                </div>
              </Link>
          ))}
          </div>
        ))}
         <div ref={ref} style={{ height: "50px" }}>
            {isFetchingNextPage && <p>Đang tải thêm...</p>}
          </div>
      </div>
    </div>
  )
}