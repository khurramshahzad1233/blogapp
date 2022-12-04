import React,{Fragment,useState,useEffect} from 'react';
import "./Updateprofile.css";
import {Face,Mail} from "@mui/icons-material"
import {useDispatch,useSelector} from "react-redux";
import {updateprofileaction,clearerror,loaduseraction} from "../../actions/useraction";
import {useAlert} from "react-alert";
import {useNavigate} from "react-router-dom";
import Loader from "../layout/loader/Loader"
import Metadata from "../layout/Metadata"

const Updateprofile = () => {
    const dispatch=useDispatch();
    const alert=useAlert();
    const navigate=useNavigate();


    const {loading,isUpdated,error}=useSelector((state)=>state.updateprofilered);
    const {user}=useSelector((state)=>state.userred)

    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [avatar,setAvatar]=useState("");
    const [avatarpreview,setAvatarpreview]=useState("/profile.png");

    const updateprofileimage=(e)=>{
        const reader=new FileReader();

        reader.onload=()=>{
            if(reader.readyState===2){
                setAvatar(reader.result);
                setAvatarpreview(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    }

    const updateprofilesubmithandler=(e)=>{
        e.preventDefault();

        const myform=new FormData();

        myform.set("name",name);
        myform.set("email",email);
        myform.set("avatar",avatar);
        dispatch(updateprofileaction(myform))
    };

    useEffect(()=>{
        if(user){
            setName(user.name);
            setEmail(user.email);
            setAvatarpreview(user.avatar.url);
        };

        if(error){
            alert.error(error);
            dispatch(clearerror());
        };

        if(isUpdated){
            alert.success("profile updated successfully");
            dispatch(loaduseraction())

            navigate("/account")
            dispatch({type:"UPDATE_PROFILE_RESET"})
        }
    },[alert,error,dispatch,isUpdated,navigate,user])
  return (
    <Fragment>{loading?(<Loader/>):(
        <Fragment>
            <Metadata title={`Update Profile`}/>
        <div className="updateprofilecontainer">
            <div className="updateprofilebox">
                <h2 className="updateprofileheading">Update Profile</h2>
                <form
                className='updateprofile'
                encType='multipart/form-data'
                onSubmit={updateprofilesubmithandler}
                >
                    <div>
                        <Face/>
                        <input type="text"
                        required
                        placeholder='plz enter your name'
                        name="name"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}

                        />
                    </div>
                    <div>
                        <Mail/>
                        <input type="email"
                        required
                        placeholder='plz enter email'
                        name="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <img src={avatarpreview} alt="update avatar" width="30px"/>
                        <input type="file"
                        accept="image/*"
                        name="avatar"
                        onChange={updateprofileimage}
                        />
                    </div>
                    <div>
                        <input type="submit"
                        value="Update Profile"
                        />
                    </div>
                </form>
            </div>
        </div>
    </Fragment>
    )}</Fragment>
   
  )
}

export default Updateprofile