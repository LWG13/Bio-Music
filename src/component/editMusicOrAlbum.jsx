import React from "react"
import "./createMusic.scss"
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { editMusicOrAlbum } from "./ReduxToolkit/authSlice.js"
import { useQuery } from "react-query"
import axios from "axios"
import { useForm, Form } from "react-hook-form";
import { IoArrowBackSharp } from "react-icons/io5"

export default function EditMusicOrAlbum() {
  const {typed, id } = useParams()
  const { data } = useQuery({
    queryKey: ["singer", id],
    queryFn: () => axios.get(`${import.meta.env.VITE_BACKEND}music/musicAndAlbum`, {
      params: { _id: id, type: typed}
    })
  })
  const [image, setImage] = useState(data?.data?.image)
  const navigate= useNavigate()
  const auth = useSelector(state => state.auth)
  const [title, setTitle] = useState(data?.data?.title)
  
  const {
    register,
    control,
    formState: { errors, isSubmitting, isDirty },
  } = useForm();
  const dispatch = useDispatch()
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
  const [type, setType] = useState(data?.data?.type)
  const [category, setCategory] = useState(data?.data?.category)
  const handleSubmit = () => {
    dispatch(editMusicOrAlbum({_id: data?.data?._id, role: auth.role, title: title, image: image, category: category, type: type}))
  }
  useEffect(() => {
   if(auth.editMusicOrAlbum === true) navigate("/singerPanel")
    
  },[auth.editMusicOrAlbum, navigate])
  return (
    <div className="createMusic" >
      <Link to="/singerPanel" >
      <IoArrowBackSharp style={{ width: "40px", height: "40px", color: "white"}}/>
      </Link>
      <h1>Chỉnh sửa Nhạc & Album</h1>
      <br/>
      <img src={image ? image : data?.data?.image} alt="image" />
          <div className="file-upload">
              <h3>Bấm vào đây để đăng ảnh</h3>

            <input type="file" onChange={(e) => handleChange(e)} accept="image/png, image/jpeg, image/jpg" />
            </div>
          <br/>
           <Form
                    onSubmit={handleSubmit}
                    control={control}
                    method="POST"
                    action=""
                  > 
               <label>Tiêu Đề</label>
             <br/><br/>
                <input
                      type="text"
                    placeholder="Ghi tiêu đề..." value={data?.data?.title}   
                  {...register("title", {
                        required: {
                          value: true,
                          message: "Title is required",
                        },
                        minLength: {
                          value: 5,
                          message:
                            "title should be at least 5 characters",
                        },
                      })}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      defaultValue={title}
                    />

                    <p className="error">{errors.title?.message}</p>
             <br/><br/>
             {data?.data?.type === "music" ? (
                  <div >
                    <label>Chọn Loại nhạc</label><br/><br/>
                    <div style={{display: "flex", flexDirection:"column", textAlign: "center"}}>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                      value={data?.data?.category}
                        label="Chọn loại nhạc"
                        border="white"
                        className="select"
                          sx={{ color: "white", border: "1px solid white", textAlign: "center"}}

                        color="white"
                        onChange={(e) => setCategory(e.target.value)} defaultValue={
                          category
                        }
                        required
                      >
                        <MenuItem value="" disabled>
                          <em>Chọn loại nhạc</em>
                        </MenuItem>
                        <MenuItem value="anime">Anime</MenuItem>
                        <MenuItem value="phonk">
                          Phonk/Funk
                        </MenuItem>
                        <MenuItem value="rock">
                          Nhạc Rock
                        </MenuItem>
                      </Select>
                    </div>
                    <br/><br/>
                  
                  </div>
                  ) : null}


            <br/><br/>
             <button className="btn-submit" >Lưu</button>
           </Form>
    </div>
  )
  }
