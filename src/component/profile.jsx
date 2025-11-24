import React, { useEffect, useState, useRef} from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { FaImages } from "react-icons/fa";
import { IoArrowBackSharp } from "react-icons/io5";
import { editUser } from "./ReduxToolkit/authSlice.js"
import "./profile.scss"
import axios from "axios"
import { useQuery } from "react-query"
import { useQueryClient } from "react-query";
import { follow } from "./ReduxToolkit/authSlice.js"
import { useSelector, useDispatch } from "react-redux"
import Footer from "./footer.jsx"
import { CiCircleMore } from "react-icons/ci";

export default function Profile() {
  const queryClient = useQueryClient()
  const [edit, setEdit] = useState(false)
 const [setting, setSetting] = useState(false)
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const settingRef = useRef()
 const id = useParams()
  const { data } = useQuery({
    queryKey: ["user", id.id],
    queryFn: () => axios.get(`${import.meta.env.VITE_BACKEND}user/detail/${id.id}`),
    refetchInterval: 4000
  })
  const navigate = useNavigate()
  const {data: playlist } = useQuery({
    queryKey: ["userPlaylist"],
    queryFn: () => axios.get(`${import.meta.env.VITE_BACKEND}music/user-playlist/${id.id}`)
  })
  const {data: music } = useQuery({
    queryKey: ["userMusic"],
    queryFn: () => axios.get(`${import.meta.env.VITE_BACKEND}music/user-music/${id.id}`)
  })
   const {data: album } = useQuery({
    queryKey: ["userAlbum"],
    queryFn: () => axios.get(`${import.meta.env.VITE_BACKEND}music/user-album/${id.id}`)
  })
   const [image, setImage] = useState(data?.data?.image);
  const [name, setName] = useState(data?.data?.username)
 const handleChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };
    const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
      console.log(image);
    };
  };
  const [follow1, setFollow] = useState(data?.data?.follower?.includes(auth.id))
  const handleFollow = async () => {
   
  dispatch(follow({ userId: auth.id, followId: id.id }));

   
  };
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
    <div className="profile" >
    <div style={{display: "flex", justifyContent: "space-between"}}>
    <Link to="/" >
      <IoArrowBackSharp style={{ width: "40px", height: "40px" }}/>
      </Link>
      {data?.data._id === auth.id ? 
       <CiCircleMore style={{ width: "40px", height: "40px" }} onClick={() => setSetting(true) } /> : null}
                          {setting ? <Setting setting={settingRef} dispatch={dispatch} id={id.id} navigate={navigate} set ={() => setEdit(!edit)}role={auth.role} /> : null}
         
    
   </div>
     <div className="userDetail">
         <img src={edit ? image : data?.data?.image} alt="" width="100px"/>
         <div className="userInfo">
          <p style={{fontSize: "20px"}}>Hồ Sơ</p>
           {edit ? <input type="text" placeholder={data?.data?.username}onChange={e => setName(e.target.value)} className="editInput"/> : <h1 style={{color: "white", marginRight: "10px"}}>{data?.data?.username}</h1>}
         </div>
        </div>
       <div style={{display: "flex"}} >
      {edit ?              
        <div className="upload-container">
                <label className="upload-btn">
                   <input type="file" accept="image/*,video/*" onChange={e => handleChange(e)} />
      </label>
              </div> : null}
      {edit ? <button className="save" onClick={() => {dispatch(editUser({username: name  , image: image, _id: auth.id}))
  setEdit(false)} } >Lưu</button> : null}
       </div>
      {auth.id === id.id ? null : ( 
      data?.data?.follower?.includes(auth.id) ? <button className="follow" onClick={() => handleFollow()} >Bỏ theo dõi</button> : <button className="notFollow" onClick={() => handleFollow()}>Theo dõi</button>
      
      )}
      <p>Có {data?.data?.follower?.length} người theo dõi</p>
       <div className="playlist-user" >
        <div className="titleTop">
          <h1>Playlist</h1> 
        <button className="all" onClick={() => navigate(`/user/${id.id}/playlist`)}>Chọn tất cả</button>
        </div>
         {playlist?.data?.length > 0 ?
 (
    <div className="playlistList" >
          {playlist?.data?.map(i => (
             <Link to={`/playlist/${i._id}`} className="playlistBox" id={i._id}>
              <img src={i.image} alt="music" />
              <div className="playlistContent" >
              <h2>{i.title}</h2>
              <p>{i.userId.username}</p>
              </div>
            </Link>

          ))}
         
        </div>
 )  : <p> Không có playlist</p> }
         { data?.data?.role === "singer" ? ( <div >
         <div className="titleTop">
           <h1>Nhạc</h1> 
         <button className="all" onClick={() => navigate(`/user/${id.id}/music`)}>Chọn tất cả</button>
         </div>
           {music?.data?.length > 0 ?
 (
    <div className="playlistList" >
          {music?.data?.map(i => (
             <Link to={`/music/${i._id}`} className="playlistBox" id={i._id}>
              <img src={i.image} alt="music" />
              <div className="playlistContent" >
              <h2>{i.title}</h2>
              <p>{i.singerId.username}</p>
              </div>
            </Link>

          ))}
         
        </div>
 )  : <p> Không có nhạc</p> }

           
           <div className="titleTop">
           <h1>Album</h1> 
         <button className="all" onClick={() => navigate(`/user/${id.id}/album`)}>Chọn tất cả</button>
         </div>
           {album?.data?.length > 0 ?
            (
               <div className="playlistList" >
                     {album?.data?.map(i => (
                        <Link to={`/album/${i._id}`} className="playlistBox" id={i._id}>
                         <img src={i.image} alt="music" />
                         <div className="playlistContent" >
                         <h2>{i.title}</h2>
                         <p>{i.singerId.username}</p>
                         </div>
                       </Link>

                     ))}

                   </div>
            )  : <p> Không có Album</p> }
         </div> ) : null}
       </div>
    <Footer />
    </div>
  )
}
function Setting({setting, dispatch,id, navigate, set, role}) {

  return (

         <div className={`dropdownmenu10`} ref={setting}>
           <Link to={`/account`} className="dropdownitem10" >
              
             <p  className="link10" >Tài Khoản</p>
            </Link>
            <div className="dropdownitem10"  onClick={set} >
              <p  className="link10" >Chỉnh sửa thông tin</p>
            </div>
           {role === "singer" ? 
  <Link to="/create" className="dropdownitem10"   >
              <p  className="link10" >Tạo Nhạc & Album</p>
            </Link> : null
}
           {role === "singer" ? 
             <Link to="/singerPanel" className="dropdownitem10"   >
                         <p  className="link10" >Danh sách nhạc/album</p>
             </Link> : null          }
         </div>

  )
}