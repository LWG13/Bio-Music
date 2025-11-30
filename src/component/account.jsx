import React, { useEffect, useState} from "react"
import { useDispatch, useSelector} from "react-redux"
import { Link, useNavigate} from "react-router-dom"
import { logOutUser } from "./ReduxToolkit/authSlice.js"
import { IoArrowBackSharp } from "react-icons/io5";

import "./account.scss"

export default function Account() {
  const auth = useSelector(state => state.auth)
  const navigate = useNavigate()
  useEffect(() => {
   if(auth.userAuth === false) navigate("/login")
  })
  const dispatch = useDispatch()
  return (
    <div className="account" >
     <Link to="/" >
      <IoArrowBackSharp style={{ width: "40px", height: "40px", color: "white"}}/>
      </Link>
      
      <Link to ="/edit-password" style={{textDecoration: "none"}} >
      <li className="accountBox">
      Đổi mật khẩu
        </li>
      </Link>
        <li className="accountBox" onClick={() => dispatch(logOutUser())}>
          Đăng xuất
          </li>
     
    </div>
  )
}