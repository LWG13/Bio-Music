import React, { useEffect, useState} from "react"
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query"
import { Link } from "react-router-dom"
import "./playlistUser.scss"
import { Grid } from "@mui/material"
import { useParams } from "react-router-dom"
import axios from "axios"

export default function PlaylistUser() {
  const { ref, inView } = useInView()
  const { id, type} = useParams()
  console.log(id)
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['userPlaylists', id, type],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND}music/user/${type}/all/${id}`, {
        params: { page: pageParam, limit: 6}
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
    }
  })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
 return(
    <div className="playlistUser">
     <h1>{type === "playlist" ? "Playlist của người dùng" : null}{type === "album" ? "Album của ca sĩ" : null }{type === "music" ? "Nhạc của ca sĩ" : null }</h1>
      <Grid container spacing={3} >
         { data?.pages?.map((page, i) => (
          <React.Fragment key={i}>
        
            {page?.data?.map(i => (
              <Grid size={{xs: 6, sm: 6, md: 4, lg: 3}} key={i._id}>
                <Link to={`/playlist/${i._id}`} className="playlistBox1" id={i._id}>
              <img src={i.image} alt="music" />
              <div className="playlistContent" >
              <h2>{i.title}</h2>
              <p>{type === "playlist" ? i.userId.username : i.singerId.username}</p>
              </div>
            </Link>
              </Grid>

            ))}</React.Fragment>))}
      </Grid>
      <div ref={ref} style={{ height: "50px" }}>
            {isFetchingNextPage && <p>Đang tải thêm...</p>}
          </div>
    </div>
 )
}