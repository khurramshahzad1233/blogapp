import React,{Fragment,useState} from 'react';
import "./Useroption.css";
import {SpeedDial,SpeedDialAction} from "@mui/material";
import {Dashboard,Face,ExitToApp,ListAlt,Create} from "@mui/icons-material";
import {useNavigate} from "react-router-dom"
import {useAlert } from "react-alert"
import {logoutuseraction} from "../../../actions/useraction";
import {useDispatch} from "react-redux"

const Useroption = ({user}) => {
    const navigate=useNavigate();
    const alert=useAlert();
    const dispatch=useDispatch()

    const [open,setOpen]=useState(false);

    const options=[
        {icon:<Create/>,name:"Create Blog",func:newblog},
        {icon:<ListAlt/>,name:"My blogs", func:blog},
        {icon:<Face/>, name:"profile", func:account},
        {icon:<ExitToApp/>, name:"logout",func:logoutuser}
    ];
    if(user.role==="admin"){
        options.unshift({icon:<Dashboard/>,name:"dashboard",func:dashboard})
    };

    function dashboard(){
      navigate("/admin/dashboard")
    };
    function newblog(){
      navigate("/blog/new")
    };

    function blog(){
      navigate("/blog/me")
    };
    function account(){
      navigate("/account")
    };

    function logoutuser(){
      dispatch(logoutuseraction())
      alert.success("logout successfully")
    }
  return (
    <Fragment>
      <div className="useroptioncontainer">
      <SpeedDial
        ariaLabel='SpeedDial tooltip example'
        open={open}
        onOpen={(e)=>setOpen(true)}
        onClose={(e)=>setOpen(false)}
        direction="down"
        icon={<img className="speedDialIcon" src={user.avatar.url?user.avatar.url:"/profile.png"} alt="Profile"/>}
        >
          {options.map((item)=>(
            <SpeedDialAction
            icon={item.icon}
            tooltipTitle={item.name}
            key={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
            />
          ))}
        </SpeedDial>
      </div>
        
    </Fragment>
  )
}

export default Useroption