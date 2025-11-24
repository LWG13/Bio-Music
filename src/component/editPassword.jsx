import React, { useState, useEffect} from "react"
import "./editPassword.scss"
import { useDispatch, useSelector } from "react-redux"
import { useForm, Form } from "react-hook-form"

import { Link, useNavigate} from "react-router-dom"
import { IoArrowBackSharp } from "react-icons/io5"
import { editPassword } from "./ReduxToolkit/authSlice"
export default function EditPassword () {
  const { register, control, handleSubmit , formState: { errors, isSubmitting, isDirty } } = useForm();
  
  const [passwordUser, setPasswordUser] = useState("")
   const [newPassword, setNewPassword] = useState("")
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const navigate = useNavigate()
  useEffect(() => {
   if(auth.editPassword === true) navigate("/")
  }, [auth.editPassword])
  const handleSubmit1 = (e) => {
  dispatch(editPassword({_id: auth.id, passwordUser: passwordUser, newPassword: newPassword}))
  }
  return (
    <div className="editPassword" >
       <Link to="/" >
      <IoArrowBackSharp style={{ width: "40px", height: "40px", color: "white"}}/>
      </Link>
 <Form action="" method="PUT" control={control} onSubmit={handleSubmit(handleSubmit1)} >
     
    <h1>Đổi mật khẩu</h1>
    <br/>
   <label> 
   Xác thực mật khẩu
   </label>
      <br/><br/><br/>
  <input type="password" placeholder="Nhập mật khẩu của tài khoản" onChange={e => setPasswordUser(e.target.value)}
    />
   <p style={{color: 'red'}}>{auth.editPasswordError}</p>
       <label> 
         Đổi mật khẩu
         </label>
      <br/>
      <br/>
   <br/>
        <input type="password" placeholder="Nhập mật khẩu mới"  {...register("password", { minLength:{ value: 6, message: "Mật khẩu không được dưới 6 chữ cái" },pattern: {
            value: /^[A-Za-z0-9]+$/i,
            message: "Chỉ có thể đặt chữ cái và số",
          },  required: {
      value: true,
      message: "Mật khẩu không được để trống"
         }, })} 
          onChange={e => setNewPassword(e.target.value)}  />
      <span style={{color: "red"}}>{errors.password?.message}</span>   
    <button  style={{height: "50px", width: "120px", outline: "none", border: "none", borderRadius: "10px", background: "#32CD32", color: "white"}}>Lưu</button>
 </Form>
    </div>
  )
}