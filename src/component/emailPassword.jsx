import "./login.scss"
import { Link, useNavigate} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { IoArrowBackSharp } from "react-icons/io5";

import { Form, useForm} from "react-hook-form"
import { emailAuth } from "./ReduxToolkit/authSlice"


export default function EmailPassword() {
  const [user, setUser] = useState({
    email: ""
  })
  const navigate = useNavigate()
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const handleSubmit = () => {
    dispatch(emailAuth(user))
  }
  useEffect(() => {
    if (auth.firstAuth === true) navigate("/otp")
  }, [auth.firstAuth, navigate])
  useEffect(() => {
    if(auth.userAuth === true) navigate("/")
  }, [auth.userAuth, navigate])
  const { control, register, formState: { errors } } = useForm()
return(
  <div className="loginPage" >
                                   <div className="naviDetail1">
        <Link to="/login" >
      <IoArrowBackSharp style={{ width: "40px", height: "40px" }}/>
      </Link>
   
      </div>

                 <div className="wrapper">
      <Form action ="" method="post" onSubmit={handleSubmit} control={control}>
       <h1>Confirm Email</h1> 

       <div className="input-box">
         <input type="email" placeholder="Email" required {...register("email", { required: {value: true, message: "Email is required"}, pattern: {
       value: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/, 
       message: "invalid email format!"
    }})} onChange={(e => setUser({...user, email: e.target.value}))}/>

       </div>
        <span className="error">{errors?.email?.message}</span>
       <p style={{color: "red"}}>{auth.error}</p>
        <br/><br/>
       <button className="btn">Confirm</button>
      </Form>
                 </div>
            </div>
  )
}