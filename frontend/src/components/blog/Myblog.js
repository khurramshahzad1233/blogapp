import React,{Fragment,useEffect} from 'react';
import "./Myblog.css"
import Metadata from "../layout/Metadata"
import {useDispatch,useSelector} from "react-redux";
import {myblogaction,clearerror} from "../../actions/useraction"
import {deleteblogaction} from "../../actions/blogaction"
import Loader from "../layout/loader/Loader"
import { DataGrid } from '@mui/x-data-grid';
import {useAlert} from "react-alert"
import {Edit,Delete} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {Button} from "@mui/material"



const Myblog = () => {
    const dispatch=useDispatch();
    const alert=useAlert()

    const {loading,myblogs,error}=useSelector((state)=>state.myblogred);
    const {error:deleteerror,isDeleted}=useSelector((state)=>state.deleteblogred)

    const deletebloghandler=(id)=>{
        dispatch(deleteblogaction(id))

    }

    const columns=[
        {
            field:"id",
            headerName:"blog id",
            minWidth:200,
            flex:1,
        },{
            field:"title",
            headerName:"blog title",
            minWidth:200,
            flex:1,
        },{
            field:"category",
            headerName:"category",
            minWidth:200,
            flex:1,
        },{
            field:"action",
            headerName:"action",
            minWidth:200,
            flex:1,
            renderCell:(params)=>{
                return(
                    <Fragment>
                        <Link to={`/blog/edit/${(params.row.id)}`}><Edit/></Link>
                        <Button onClick={()=>deletebloghandler((params.row.id))}><Delete/></Button>
                    </Fragment>
                )
            }
        }
    ];
    const rows=[];
    myblogs &&
    myblogs.forEach((item)=>{
        rows.push({
            id:item._id,
            title:item.title,
            category:item.category,


        })
    })

    useEffect(()=>{

        if(error){
            alert.error(error);
            dispatch(clearerror())
        };
        if(deleteerror){
            alert.error(deleteerror);
            dispatch(clearerror())
        };
        if(isDeleted){
            alert.success("delete successfully");
            dispatch({type:"DELETE_BLOG_RESET"})
        }
        dispatch(myblogaction())
    },[dispatch,alert,error,deleteerror,isDeleted])
  return (
    <Fragment>{loading?(<Loader/>):(
        <Fragment>
        <Metadata title={`my blogs`}/>
        <div className="myblogcontainer">
            <div className="myblogheading">My Blogs</div>
            <div className="myblogdetails">
                <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                autoHeight
                disableSelectionOnClick
                />

            </div>
        </div>
    </Fragment>
    )}</Fragment>
   
  )
}

export default Myblog