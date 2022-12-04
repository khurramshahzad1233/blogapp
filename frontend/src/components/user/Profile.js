import React,{Fragment,useEffect} from 'react'
import "./Profile.css"
import Metadata from '../layout/Metadata'
import Loader from "../layout/loader/Loader"
import {useSelector} from "react-redux"
import { useNavigate,Link } from 'react-router-dom';


const Profile = () => {
    const navigate=useNavigate()

    const {loading,user,isAuthenticated}=useSelector((state)=>state.userred)

    useEffect(()=>{
        if(isAuthenticated===false){
            navigate("/login")
        }
    },[navigate,isAuthenticated])
  return (
    <Fragment>{loading?(<Loader/>):(
        <Fragment>
            <Metadata title={`${user.name} Profile`}/>
            <div className="profilecontainer">
                <div className="profileimagediv">
                <img src={user.avatar.url} alt="profile"/>
                </div>
                <div className="profileinfodiv">
                <h2>My Profile</h2>

<div>{user.name}</div>
<div>{user.email}</div>
<div>{String(user.createdAt).substring(0,10)}</div>

<div>
    <span><Link to="/me/update">Edit Profile</Link></span>
    <span><Link to="/password/update">Change password</Link></span>
       
</div>
                </div>
            
            
            </div>
        

    </Fragment>
    )}</Fragment>
    
  )
}

export default Profile