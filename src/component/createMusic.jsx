import React from "react"
import "./createMusic.scss"
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { createMusicOrAlbum } from "./ReduxToolkit/authSlice.js"
import { useQuery } from "react-query"
import axios from "axios"
import { useForm, Form } from "react-hook-form";
import { IoArrowBackSharp } from "react-icons/io5"

export default function CreateMusic() {
  const id = useParams()
  const [image, setImage] = useState("https://s.widget-club.com/samples/aIdkSyXiunfsNZUT4p0Dp3M3lEF2/FI3N4EInBcr4RsBGKImj/F78AF6FB-AF40-4187-86BA-7316F0544BCE.jpg?q=70")
  const navigate= useNavigate()
  const auth = useSelector(state => state.auth)
  const [title, setTitle] = useState("")
  
  const {
    register,
    control,
    formState: { errors, isSubmitting, isDirty },
  } = useForm();
  const dispatch = useDispatch()
 useEffect(() => {
  if(auth.role !== "singer") navigate("/")
 })
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
  const [audioFile, setAudioFile] = useState(null)
  const [audioPreviewUrl, setAudioPreviewUrl] = useState("")
  const [type, setType] = useState("music")
  const [category, setCategory] = useState("anime")
  const handleChangeAudio = (e) => {
  const file = e.target.files[0];

  // Preview
  const url = URL.createObjectURL(file);
  setAudioPreviewUrl(url);

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    setAudioFile(reader.result); 
  };
};
  const handleSubmit = () => {
    dispatch(createMusicOrAlbum({role: auth.role, singerId: auth.id, title: title, image: image, category: category, type: type, audio: audioFile}))
  }
  useEffect(() => {
   if(auth.createMusic === true) navigate("/")
    
  },[auth.createMusic, navigate])
  return (
    <div className="createMusic" >
      <Link to="/" >
      <IoArrowBackSharp style={{ width: "40px", height: "40px", color: "white"}}/>
      </Link>
      <h1>Tạo Nhạc & Album</h1>
      <br/>
      <img src={image} alt="image" />
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
                    placeholder="Ghi tiêu đề..."    
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

              <label>Chọn dạng sản phẩm</label><br/><br/>
                <div style={{display: "flex", flexDirection:"column", textAlign: "center"}}>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={type}
                        
                        border="white"
                        className="select"
                          sx={{ color: "white", border: "1px solid white", textAlign: "center"}}
                      
                        color="white"
                        onChange={(e) => setType(e.target.value)} defaultValue={type}
                        required
                      >
                        <MenuItem value="" disabled>
                          <em>Chọn loại sản phẩm</em>
                        </MenuItem>
                        <MenuItem value="music">Nhạc</MenuItem>
                        <MenuItem value="album">
                         Album
                        </MenuItem>
                                              </Select>
                    </div>
             <br/><br/>
             {type === "music" ? (
                  <div >
                    <label>Chọn Loại nhạc</label><br/><br/>
                    <div style={{display: "flex", flexDirection:"column", textAlign: "center"}}>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                      value={category}
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
              <label>Chọn File nhạc</label>
                     <div className="file-upload">
              <h3>Bấm vào đây để đăng nhạc</h3>

            <input type="file" accept="audio/*"  {...register("audio", {
                        required: {
                          value: true,
                          message: "audio is required",
                        },
                  })}onChange={(e) => handleChangeAudio(e)} />
            </div>
<p className="error">{errors.audio?.message}</p>
            {audioPreviewUrl && (
              <div className="audio-preview">
                <p>Preview bài nhạc:</p>
                <audio controls src={audioPreviewUrl} />
                  </div>
                  )}
                  </div>
                  ) : null}
             
             
            <br/><br/>
             <button className="btn-submit" >Tạo</button>
           </Form>
    </div>
  )
}