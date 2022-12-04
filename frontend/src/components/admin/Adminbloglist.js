import React,{Fragment,useEffect} from 'react'
import "./Adminbloglist.css"
import Metadata from '../layout/Metadata'
import {useDispatch,useSelector} from "react-redux";
import {allblogadminaction,clearerror,deleteblogaction} from "../../actions/blogaction"
import Sidebar from './Sidebar';
import {useAlert} from "react-alert"
import {DataGrid} from "@mui/x-data-grid"
import {Button} from "@mui/material"
import {Delete} from "@mui/icons-material"

const Adminbloglist = () => {
    const dispatch=useDispatch();
    const alert=useAlert();

    const {allblog,error}=useSelector((state)=>state.alladminblogred);
    const {error:deleteerror,isDeleted}=useSelector((state)=>state.deleteblogred)

    const deleteadminbloghandler=(id)=>{
        dispatch(deleteblogaction(id))

    }

    const columns=[
        {
            field:"id",
            headerName:"blog id",
            minWidth:200,
            flex:1

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
            headerName:"Action",
            minWidth:200,
            flex:1,
            renderCell:(params)=>{
                return(
                    <Fragment>
                        <Button onClick={()=>deleteadminbloghandler((params.row.id))}><Delete/></Button>
                    </Fragment>
                )
            }
        }
    ];
    const rows=[];
    allblog &&
    allblog.forEach((item)=>{
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
        }
        if(deleteerror){
            alert.error(deleteerror);
            dispatch(clearerror())
        };
        if(isDeleted){
            alert.success("deleted successfully");
            dispatch({type:"DELETE_BLOG_RESET"})
        }

        dispatch(allblogadminaction())
    },[dispatch,alert,error,isDeleted,deleteerror])
  return (
    <Fragment>
        <Metadata title={`all blogs`}/>
        <div className="alladminblogcontainer">
            <div className="alladminblogsidebar"><Sidebar/></div>
            <div className="allbloglistdiv">
            <div className="alladminblogheading">All blogs</div>
            <div className="allblogdetail">
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

export default Adminbloglist