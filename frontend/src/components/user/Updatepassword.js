import React,{Fragment,useEffect,useState} from 'react'
import "./Updatepassword.css"
import {VpnKey,Lock,LockOpen} from "@mui/icons-material"
import {useDispatch,useSelector } from "react-redux";
import {updatepasswordaction,clearerror} from "../../actions/useraction";
import {useAlert} from "react-alert";
import {useNavigate} from "react-router-dom"
import Loader from "../layout/loader/Loader"
import Metadata from "../layout/Metadata"


const Updatepassword = () => {
    const dispatch=useDispatch();
    const alert=useAlert();
    const navigate=useNavigate()

    const [oldpassword,setOldpassword]=useState("");
    const [newpassword,setNewpassword]=useState("");
    const [confirmpassword,setConfirmpassword]=useState("");

    const {loading,error,isUpdated}=useSelector((state)=>state.updateprofilered)



    const updatepasswordsubmithandler=(e)=>{
        e.preventDefault();

        const myform=new FormData();
        myform.set("oldpassword",oldpassword);
        myform.set("newpassword",newpassword);
        myform.set("confirmpassword",confirmpassword);

        dispatch(updatepasswordaction(myform))

    };

    useEffect(()=>{

        if(error){
            alert.error(error);
            dispatch(clearerror())
        };

        if(isUpdated){
            alert.success("update password successfully");

            navigate("/account");
            dispatch({type:"UPDATE_PASSWORD_RESET"})

        }
    },[alert,dispatch,error,isUpdated,navigate])
  return (
    <Fragment>{loading?(<Loader/>):(
        <Fragment>
            <Metadata title={`Update password`}/>
        <div className="updatepasswordcontainer">
            <div className="updatedpasswordbox">
                <h2 className="updatepasswordheading">Update Password</h2>

                <form
                className='updatepasswordform'
                onSubmit={updatepasswordsubmithandler}
                >
                    <div>
                        <VpnKey/>
                        <input type="password"
                        required
                        placeholder='old password'
                        value={oldpassword}
                        onChange={(e)=>setOldpassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <LockOpen/>
                        <input type="password"
                        required
                        placeholder='plz enter new password'
                        value={newpassword}
                        onChange={(e)=>setNewpassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <Lock/>
                        <input type="password"
                        required
                        placeholder='confirm password'
                        value={confirmpassword}
                        onChange={(e)=>setConfirmpassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <input type="submit"
                        value="Change Password"
                        />
                    </div>
                </form>
            </div>
        </div>
    </Fragment>
    )}</Fragment>
    
  )
}

export default Updatepassword