import React,{Fragment,useEffect} from 'react';
import "./Dashboard.css"
import {alluseradminaction} from "../../actions/useraction";
import {allblogadminaction,clearerror} from "../../actions/blogaction"
import Metadata from "../layout/Metadata";
import {useDispatch,useSelector} from "react-redux"
import Sidebar from './Sidebar';


const Dashboard = () => {
    const dispatch=useDispatch();

    const {alluser,error}=useSelector((state)=>state.alladminuserred)
    const {allblog,error:blogerror}=useSelector((state)=>state.alladminblogred)


    useEffect(()=>{
        dispatch(alluseradminaction());
        dispatch(allblogadminaction());

    },[dispatch])
  return (
    <Fragment>
        <Metadata title={`Admin Dashboard`}/>
        <div className="dashboardmaincontainer">
        <div className="sidebardashboard">
          <Sidebar/>
          
        </div>
        <div className="dashboardinfo">
          <div className="allusercount"><span>Totol Users</span>{alluser && alluser.length}</div>
          <div className="allblogcount"><span>Total Blogs</span>{allblog && allblog.length}</div>
        </div>
        </div>
        
    </Fragment>
     
  )
}

export default Dashboard