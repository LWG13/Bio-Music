import React from "react"
import "./editPlaylist.scss"
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { editPlaylist } from "./ReduxToolkit/authSlice.js"
import { useQuery } from "react-query"
import axios from "axios"
import { useForm, Form } from "react-hook-form";

export default function EditPlaylist() {
  const id = useParams()
  const navigate= useNavigate()

  const { data } = useQuery({
    queryKey: ["us", id.id],
    queryFn: () =>
      axios.get(
        `${import.meta.env.VITE_BACKEND}music/playlist/detail/${id.id}`,
      ),
  });
  
     const [public1, setPublic] = useState(data?.data?.isPublic);
    const [title, setTitle] = useState(data?.data?.title);
  const [image, setImage] = useState(data?.data?.image);
    const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch()
    const {
    register,
    control,
    formState: { errors, isSubmitting, isDirty },
  } = useForm();
  const handleSubmit = () => {
    dispatch(editPlaylist({_id: id.id, title, image,isPublic: public1}));
  };
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
 useEffect(() => {
   if(auth.editPlaylist === true) navigate("/libary")
 }, [auth.editPlaylist, navigate])

  return(
         <div className="createProduct">
      
          { data?.data?.userId === auth.id ?  (
          <div className="productBox">
            <div className="productInfo">
              <h1>Chỉnh Playlist của bạn</h1>
             
                  <div className="productImg">
                    <img src={image} alt="avatar" />
          <div className="file-upload">
              <h3>Bấm vào đây để đăng ảnh</h3>

            <input type="file" onChange={(e) => handleChange(e)} accept="image/png, image/jpeg, image/jpg" />
            </div>

                  </div>
              
                  <Form
                    onSubmit={handleSubmit}
                    control={control}
                    method="POST"
                    action=""
                  >
                    <br/>
                    <br/>
                    <label>Tiêu đề</label>
                    <input
                      type="text"
                      {...register("title", {
                        required: {
                          value: true,
                          message: "Title product is required",
                        },
                        minLength: {
                          value: 5,
                          message:
                            "playlist title should be at least 5 characters",
                        },
                      })}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      defaultValue={title}
                    />

                    <p className="error">{errors.title?.message}</p>
                    <label>Chỉnh sửa hiển thị</label>
                    <div className="createCategory">
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={public1}
                        label="Set Public/Private"
                        border="white"
                  
                        sx={{ color: "white", border: "1px solid white"}}
                        color="white"
                        onChange={(e) => setPublic(e.target.value)} defaultValue={public1}
                        required
                      >
                        <MenuItem value="" disabled>
                          <em>Chỉnh sửa hiển thị</em>
                        </MenuItem>
                        <MenuItem value="public">Công khai</MenuItem>
                        <MenuItem value="private">
                          Riêng tư
                        </MenuItem>
                        
                      </Select>
                    </div>
                    <br />
                    
                    <button className="btn-submit" /*disabled={auth.createStatus === "PENDING"}*/ onClick={() => handleSubmit()}><span>Lưu</span>  </button>
                  </Form>
            </div>
          </div>
       ) : ( <p>You enter wrong playlist! </p>) }
       </div>
  )
}