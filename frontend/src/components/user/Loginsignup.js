import React,{Fragment,useRef,useState,useEffect} from 'react'
import "./Loginsignup.css"
import {Mail,Lock,Face,LockOpen} from "@mui/icons-material"
import {loginuseraction,clearerror,registeruseraction} from "../../actions/useraction"
import {useDispatch,useSelector} from "react-redux";
import {useAlert} from "react-alert"
import {useLocation, useNavigate} from "react-router-dom"
import Metadata from "../layout/Metadata";


const Loginsignup = () => {
    const switchertab=useRef(null);
    const logintab=useRef(null)
    const registertab=useRef(null);

    const dispatch=useDispatch()
    const alert=useAlert()
    const navigate=useNavigate();
    const location=useLocation();

    const [loginemail,setLoginemail]=useState("");
    const [loginpassword,setLoginpassword]=useState("");

    const [user,setUser]=useState({
        name:"",
        email:"",
        password:"",
    });
    const {name,email,password}=user;

    const [avatar,setAvatar]=useState("");
    const [avatarpreview,setAvatarpreview]=useState("/profile.png")

    const {error,isAuthenticated}=useSelector((state)=>state.userred)

    const switchtab=(tab)=>{
        if(tab==="login"){
            switchertab.current.classList.remove("shifttoright")
            switchertab.current.classList.add("shifttoneutral")

            registertab.current.classList.remove("neutralform")
            logintab.current.classList.remove("shifttoleft")
            
        };
        if(tab==="register"){
            switchertab.current.classList.remove("shifttoneutral")
            switchertab.current.classList.add("shifttoright")

            registertab.current.classList.add("neutralform")
            logintab.current.classList.add("shifttoleft")


        };
    }

    const loginsubmithandler=(e)=>{
        e.preventDefault();
        dispatch(loginuseraction(loginemail,loginpassword))
        
    };

    const registersubmithandler=(e)=>{
        e.preventDefault();
        const myform=new FormData();

        myform.set("name",name)
        myform.set("email",email)
        myform.set("password",password)
        myform.set("avatar",avatar)

        dispatch(registeruseraction(myform))
    }

    const registerhandler=(e)=>{
        if(e.target.name==="avatar"){
            const reader=new FileReader();

            reader.onload=()=>{
                if(reader.readyState===2){
                    setAvatar(reader.result);
                    setAvatarpreview(reader.result)
                }
            };
            reader.readAsDataURL(e.target.files[0])
        }else{
            setUser({...user,[e.target.name]:e.target.value})
        }
    }

    const redirect=location.search?location.search.split("=")[1]:"/account"

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearerror())
        }

        if(isAuthenticated){
            navigate(redirect)
        }
    },[alert,dispatch,error,isAuthenticated,redirect,navigate])
  return (
    <Fragment>
        <Metadata title={`login/signUp`}/>
        <div className="loginsignupcontainer">
            <div className="loginsignupbox">
                <div className="loginsignuptoggle">
                    <p onClick={(e)=>switchtab("login")}>Login</p>
                    <p onClick={(e)=>switchtab("register")}>Register</p>
                </div>
                <div><button className='togglebtn' ref={switchertab}></button></div>

                <form
                ref={logintab}
                onSubmit={loginsubmithandler}
                className="loginform"
                >
                    <div>
                        <Mail/>
                        <input type="email" 
                        required
                        placeholder='plz enter your email address'
                        value={loginemail}
                        onChange={(e)=>setLoginemail(e.target.value)}
                        />

                    </div>
                    <div>
                        <Lock/>
                        <input type="password"
                        required
                        placeholder='plz enter your password'
                        value={loginpassword}
                        onChange={(e)=>setLoginpassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <input type="submit"
                        value="Login"
                        />
                    </div>
                </form>

                <form
                ref={registertab}
                encType="multipart/form-data"
                onSubmit={registersubmithandler}
                className="registerform"
                >
                    <div>
                        <Face/>
                        <input type="text"
                        required
                        placeholder='plz enter your name'
                        value={name}
                        name="name"
                        onChange={registerhandler}
                        />
                    </div>
                    <div>
                        <Mail/>
                        <input type="email"
                        required
                        placeholder='plz enter your email address'
                        value={email}
                        name="email"
                        onChange={registerhandler}
                         />
                    </div>
                    <div>
                        <LockOpen/>
                        <input type="password"
                        required
                        placeholder='plz enter your password'
                        value={password}
                        name="password"
                        onChange={registerhandler}
                        />
                    </div>

                    <div>
                        <img src={avatarpreview} alt="avatar preview" width="30px"/>

                        <input type="file"
                        required
                        accept='image/*'
                        name="avatar"
                        onChange={registerhandler}
                        />
                    </div>
                    <div>
                        <input type="submit"
                        value="Register"
                        />
                    </div>
                </form>
            </div>
        </div>
    </Fragment>
    
  )
}

export default Loginsignup