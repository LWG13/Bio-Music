import React, { useState, useEffect} from "react"
import "./category.scss"
import { useDispatch, useSelector } from "react-redux"
import { IoArrowBackSharp } from "react-icons/io5"

import { Link, useNavigate, useParams} from "react-router-dom"
import { Grid } from "@mui/material"
import { useInfiniteQuery } from "react-query"
import { useInView } from "react-intersection-observer";

import axios from "axios"


export default function CategoryMusic() {
  const { category } = useParams()
  const { ref, inView } = useInView()
    const { data, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['category', category],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND}music/category/${category}`, {
        params: { page: pageParam, limit: 10}
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
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const navigate = useNavigate()
  return (
    <div className="categoryMu" >
      <Link to="/category" >
      <IoArrowBackSharp style={{ width: "40px", height: "40px", color: "white"}}/>
      </Link>
      <h2>Thể loại nhạc bạn tìm được</h2>
      <Grid container spacing={3} >
         { data?.pages?.map((page, i) => (
          <React.Fragment key={i}>

            {page?.data?.map(i => (
              <Grid size={{xs: 6, sm: 6, md: 4, lg: 4}} key={i._id}>
                <Link to={`/music/${i._id}`} className="playlistBox1" id={i._id}>
              <img src={i.image} alt="music" />
              <div className="playlistContent" >
              <h2>{i.title}</h2>
              <p>{i.singerId.username}</p>
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