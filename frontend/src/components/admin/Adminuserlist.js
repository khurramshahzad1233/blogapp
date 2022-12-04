import React,{Fragment,useEffect} from 'react'
import "./Adminuserlist.css"
import Metadata from '../layout/Metadata'
import {useDispatch,useSelector} from "react-redux"
import { useAlert } from 'react-alert'
import {alluseradminaction,clearerror,adminuserdeleteaction} from "../../actions/useraction"
import Sidebar from "./Sidebar"
import {DataGrid} from "@mui/x-data-grid";
import {Delete} from "@mui/icons-material"
import {Button} from "@mui/material"


const Adminuserlist = () => {
  const dispatch=useDispatch();
  const alert=useAlert();

  const {error,alluser}=useSelector((state)=>state.alladminuserred);
  const {error:deleteerror,isDeleted}=useSelector((state)=>state.deleteuserred)

  const deleteadminuserhandler=(id)=>{
    dispatch(adminuserdeleteaction(id))

  }

  const columns=[
    {
      field:"id",
      headerName:"user id",
      minWidth:150,
      flex:1,
    },{
      field:"email",
      headerName:"user email",
      minWidth:200,
      flex:1,
    },{
      field:"name",
      headerName:"user name",
      minWidth:200,
      flex:1,
    },{
      field:"action",
      headerName:"Action",
      minWidth:100,
      flex:0.5,
      renderCell:(params)=>{
        return(
          <Fragment><Button onClick={(e)=>deleteadminuserhandler((params.row.id))}><Delete/></Button></Fragment>
        )
      }
    }
  ];
  const rows=[];
  alluser &&
  alluser.forEach((item)=>{
    rows.push({
      id:item._id,
      email:item.email,
      name:item.name,
    })
  })

  useEffect(()=>{
    if(error){
      alert.error(error);
      dispatch(clearerror())
    };
    if(deleteerror){
      alert.error(deleteerror);
      dispatch(clearerror)
    };
    if(isDeleted){
      alert.success("user deleted successfully");
      dispatch({type:"DELETE_USER_RESET"})
    }

    dispatch(alluseradminaction())
  },[dispatch,alert,error,deleteerror,isDeleted])
  return (
    <Fragment>
      <Metadata title={`all user list`}/>
      <div className="alladminusercontainer">
        <div className="usersidebar">
          <Sidebar/>
        </div>
        <div className="alladminuserdetail">
          <div className="alladminuserheading">
            All users
          </div>
          <div className="alluserdetailblock">
            <DataGrid
            rows={rows}
            columns={columns}
            autoHeight
            disableSelectionOnClick
            pageSize={10}
            />
          </div>
        </div>
      </div>

    </Fragment>
  )
}

export default Adminuserlist