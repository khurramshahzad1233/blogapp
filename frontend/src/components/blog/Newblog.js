import React,{Fragment,useState,useEffect} from 'react'
import "./Newblog.css"
import Metadata from "../layout/Metadata"
import { Spellcheck,AccountTree,Description} from "@mui/icons-material"
import {Button} from "@mui/material";
import {useDispatch,useSelector} from "react-redux";
import {createnewblogaction,clearerror} from "../../actions/blogaction"
import {useAlert} from "react-alert"
import {useNavigate} from "react-router-dom"

const Newblog = () => {

    const dispatch=useDispatch();
    const alert=useAlert();
    const navigate=useNavigate();

    const {loading,error,success}=useSelector((state)=>state.newblogred)

    const [title,setTitle]=useState("");
    const [category,setCategory]=useState("");
    const [images,setImages]=useState([]);
    const [imagespreview,setImagespreview]=useState([]);
    const [description,setDescription]=useState("")

    const categories=[
        "sports",
        "jeans",
        "electric",
        "electronics",
        "smartphones",
    ];

    const addimagehandler=(e)=>{
        const files=Array.from(e.target.files);

        files.forEach((file)=>{
            const reader=new FileReader();

            reader.onload=()=>{
                if(reader.readyState===2){
                    setImages((old)=>[...old,reader.result]);
                    setImagespreview((old)=>[...old,reader.result]);
                }
            };
            reader.readAsDataURL(file)
        })
    }

    const newblogsubmithandler=(e)=>{
        e.preventDefault();

        const myform=new FormData();

        myform.set("title",title);
        myform.set("category",category);
        myform.set("description",description);

        images.forEach((image)=>{
            myform.append("images",image);
        })

        dispatch(createnewblogaction(myform))
    };

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearerror())

        };
        if(success){
            alert.success("new blog created successfully")
            navigate("/")
        }
    },[alert,error,dispatch,success,navigate])
  return (
    <Fragment>
        <Metadata title={`Create New Blog`}/>
        <div className="newblogcontainer">
            <div className="newblogdiv">
                <form
                className='newblogform'
                encType='multipart/form-data'
                onSubmit={newblogsubmithandler}
                >
                    <div>
                        <Spellcheck/>
                        <input type="text"
                        required
                        placeholder='plz enter blog title'
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <AccountTree/>
                        <select onChange={(e)=>setCategory(e.target.value)}>
                            <option value="">Choose Category</option>
                            {
                                categories.map((cat)=>(
                                    <option key={cat} value={cat}>{cat}</option>
                                ))
                            }
                        </select>

                    </div>
                    <div>{
                        imagespreview.map((image,index)=>(
                            <img src={image} alt="product avatar" key={index} width="30px" height="30px"/>
                        ))
                        }</div>
                        <div>
                            <input type="file" 
                            accept='image/*'
                            name="avatar"
                            multiple
                            onChange={addimagehandler}
                            />
                        </div>
                        <div>
                            <Description/>
                            <textarea
                            required
                            placeholder='plz enter your blog here'
                            cols={100}
                            rows={20}
                            value={description}
                            onChange={(e)=>setDescription(e.target.value)}
                            ></textarea>
                        </div>
                        <div>
                            <Button
                            type='submit'
                            disabled={loading?true:false}
                            >Create</Button>
                        </div>
                </form>
            </div>
        </div>

    </Fragment>
  )
}

export default Newblog