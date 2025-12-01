import { Link, useNavigate} from "react-router-dom"
import { FaUser, FaLock } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { Form, useForm} from "react-hook-form"
import "./login.scss"
import { verifyUser, loginUser, googleUser} from "./ReduxToolkit/authSlice"

export default function Login() {
      const [user, setUser] = useState({
    email: "",
    password: "",
  })
  const auth = useSelector(state => state.auth)

  const dispatch = useDispatch()
  const { control, handleSubmit } = useForm()
  const handleSubmit1 = (e) => {
   dispatch(loginUser(user))
  }
  useEffect(() => {
    dispatch(verifyUser())
  },[])
  const navigate = useNavigate()
   useEffect(() => {
    if(auth.userAuth === true) navigate("/")
  }, [navigate, auth.userAuth]) 
      return(
            <div className="loginPage" >
      <div className="wrapper">
      <Form action ="" method="post"  control={control} onSubmit={handleSubmit(handleSubmit1)}>
       <h1>Đăng Nhập</h1> 
       <div className="input-box">
         <input type="email" placeholder="Email" required onChange={(e => setUser({...user, email: e.target.value}))}/>
         <FaUser className="icon"/>
       </div>
       <div className="input-box">
         <input type="password" placeholder="Mật khẩu" required onChange={(e => setUser({...user, password: e.target.value}))}/>
         <FaLock className="icon"/>
       </div>
        {auth.loginStatus === "reject" ? (
       <span style={{color: "red"}}>{auth.loginError} </span>
      )  : null} 
      <br/>
       
       <button className="btn" disabled={auth.loginStatus === "pending" ? true : false}>Login</button>
      <div className="register-link">
       <p>Don't Have An Account?<Link to="/sign-up">.  Register</Link></p>
        <br/>

      </div>
     </Form>
         <button className="google" onClick={() => dispatch(googleUser())}>
         Continue With Google
        </button> 
    </div>  

            </div>
)
}