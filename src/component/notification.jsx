import React, { useState, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { useInfiniteQuery } from "react-query"
import axios from "axios"
import { useInView } from "react-intersection-observer"
import { Link, useNavigate } from "react-router-dom"
import "./notification.scss"
import { isSeen } from "./ReduxToolkit/authSlice.js"

export default function Notification() {
   const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
  const navigate= useNavigate()
    const { ref, inView } = useInView();

    const {
      data,refetch,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      status,
    } = useInfiniteQuery({
      queryKey: ["notification"],
      queryFn:  async ({ pageParam = 0 }) => {
        const res = await axios.get(
    `${import.meta.env.VITE_BACKEND}music/getNotification/${auth.id}`,
    {
      params: { page: pageParam},
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
useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
  

  return (
    <div className="notification" >
      <h1>Thông báo</h1>
      
    {  data?.pages?.map((page, i) => (
      <div key={i} >
        {page?.data?.map(j => {
  if (j.type === "music") {
    return (
      <div  className={j.isSeen === true ? "notiBox" : "isNotSeenNotiBox" } onClick={() => {
      dispatch(isSeen({_id: j._id}))
        navigate(`/music/${j.postId}`)
      }}>
        <img src={j.userGiveId.image} alt="image" />
        <p><b>{j.userGiveId.username}</b> đã phát hành ra nhạc mới</p>
      </div>
    );
  }

  if (j.type === "album") {
    return (
      <div  className={j.isSeen === true ? "notiBox" : "isNotSeenNotiBox" } onClick={() => {
        dispatch(isSeen({_id: j._id}))
        navigate(`/album/${j.postId}`)
      }}>
        <img src={j.userGiveId.image} alt="image" />
        <p><b>{j.userGiveId.username}</b> đã phát hành ra album mới</p>
      </div>
    );
  }
  if (j.type === "admin") {
    return (
      <div  className={j.isSeen === true ? "notiBox" : "isNotSeenNotiBox" } >
       
        <p>{j.message}</p>
      </div>
    )
  }

  return null;
})}
      </div>
      ))}
      
      <div ref={ref} style={{ height: "50px" }}>
        {isFetchingNextPage && <p>Đang tải thêm...</p>}
      </div>
    </div>
  )
}