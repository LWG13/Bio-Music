import { useSearchParams, Link} from "react-router-dom";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import React, { useEffect, useState, useRef} from "react";
import axios from "axios";
import "./searchResult.scss"

export default function SearchResult() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  console.log(query)
  const { ref, inView } = useInView();
 
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["search", String(query)],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND}music/search`, {
        params: { search: String(query), page: pageParam },
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
  
  });
  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="searchResult" >
      <h1>Kết quả tìm được</h1>
      {data?.pages?.map((page, i) => (
      <div key={i} >
        {page?.data?.map(j => (
          j.type === "music" ? (
            <Link to={`/music/${j._id}`} className="playlistBox">
                <img src={j.image} alt="playlist" />
                <div className="playlistContent">
                  <span className="span1">{j.title}</span>
                  <span className="span2"> Nhạc</span>

                </div>
              </Link>
          ) : (
            <Link to={`/playlist/${j._id}`} className="playlistBox">
                <img src={j.image} alt="playlist" />
                <div className="playlistContent">
                  <span className="span1">{j.title}</span>
                  <span className="span2"> Danh sách phát</span>
                </div>
              </Link> 
             
          )
        ))}      
      
      </div>
      ))}
      <div ref={ref} style={{ height: "50px" }}>
        {isFetchingNextPage && <p>Đang tải thêm...</p>}
      </div>
    </div>
  )

}