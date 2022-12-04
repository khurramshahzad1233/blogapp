import React,{Fragment,useEffect,useState} from 'react'
import './Updateblog.css'
import Metadata from "../layout/Metadata"
import {updateblogaction,clearerror,blogdetailaction} from "../../actions/blogaction";
import {Spellcheck,AccountTree,Description} from "@mui/icons-material"
import { Typography,Button } from '@mui/material';
import {useDispatch,useSelector} from "react-redux";
import {useAlert} from "react-alert"
import {useParams,useNavigate} from "react-router-dom"

const Updateblog = () => {
    const dispatch=useDispatch();
    const alert=useAlert();
    const navigate=useNavigate()

    const {id}=useParams();
    const [title,setTitle]=useState("");
    const [category,setCategory]=useState("")
    const [description,setDescription]=useState("");
    const [oldimages,setOldimages]=useState([]);
    const [images,setImages]=useState([]);
    const [imagespreview,setImagespreview]=useState([]);

    const {error,blogdetail}=useSelector((state)=>state.blogdetailred);
    const {error:updateerror,isUpdated}=useSelector((state)=>state.updateblogred)

    const categories=[
        "sports",
        "jeans",
        "electric",
        "electronics",
        "smartphones",
    ];

    const updateimagehandler=(e)=>{
        const files=Array.from(e.target.files);

        setImages([]);
        setImagespreview([]);
        setOldimages([])

        files.forEach((file)=>{
            const reader=new FileReader();
            reader.onload=()=>{
                if(reader.readyState===2){
                    setImages((old)=>[...old,reader.result]);
                    setImagespreview((old)=>[...old,reader.result])
                }
            };
            reader.readAsDataURL(file)
        })

    };

    useEffect(()=>{
        if(blogdetail && blogdetail._id!==id){
            dispatch(blogdetailaction(id))
        }else{
            setTitle(blogdetail.title);
            setCategory(blogdetail.category);
            setDescription(blogdetail.description);
            setOldimages(blogdetail.images)
        };

        if(error){
            alert.error(error);
            dispatch(clearerror())
        };

        if(updateerror){
            alert.error(updateerror);
            dispatch(clearerror())
        };

        if(isUpdated){
            alert.success("updated successfully");
            navigate("/");
            dispatch({type:"UPDATE_BLOG_RESET"})
        }
    },[blogdetail,dispatch,id,alert,error,isUpdated,navigate,updateerror])

    const updateblogsubmithandler=(e)=>{
        e.preventDefault();

        const myform=new FormData();

        myform.set("title",title);
        myform.set("category",category);
        myform.set("description",description);
        images.forEach((img)=>{
            myform.append("images",img)
        });
        dispatch(updateblogaction(id,myform))

    }
  return (
    <Fragment>
        <Metadata title={`Update blog`}/>
        <div className="updateblogcontainer">
            <div className="updateblogdiv">
                <form
                className='updateblogform'
                encType='multipart/form-data'
                onSubmit={updateblogsubmithandler}
                >
                    <Typography>Update Blog Form</Typography>
                    <div>
                        <Spellcheck/>
                        <input type="text"
                        required
                        placeholder='update blog title'
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <AccountTree/>
                        <select 
                        value={category}
                        onChange={(e)=>setCategory(e.target.value)}
                        >
                            <option value="">Choose Category</option>
                            {
                                categories.map((cate)=>(
                                    <option value={cate} key={cate}>{cate}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div>{
                        oldimages && oldimages.map((image,index)=>(
                            <img src={image.url} key={index} alt="oldimages" width="30px" height="30px"/>
                        ))
                        }</div>
                        <div>{
                            imagespreview && imagespreview.map((image,index)=>(
                                <img key={index} alt="avatar preview" src={image} width="30px" height="30px"/>
                            ))
                            }</div>
                        <div>
                            <input type="file"
                            accept='image/*'
                            name="avatar"
                            required
                            multiple
                            onChange={updateimagehandler}
                            />
                        </div>
                        <div>
                            <Description/>
                            <textarea
                            required
                            placeholder='update blog content'
                            rows={20}
                            cols={50}
                            value={description}
                            onChange={(e)=>setDescription(e.target.value)}
                            ></textarea>
                        </div>
                        <div>
                            <Button
                            type="submit"
                            // disabled={loading?true:false}
                            >Update Blog</Button>
                        </div>


                </form>
            </div>
        </div>

    </Fragment>
  )
}

export default Updateblog