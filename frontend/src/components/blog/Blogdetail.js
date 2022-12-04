import React,{Fragment,useEffect,useState} from 'react';
import "./Blogdetail.css"
import {useParams} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import {blogdetailaction,clearerror,createblogreviewaction} from "../../actions/blogaction"
import Carousel from "react-material-ui-carousel"
import {Typography,Rating,Dialog,DialogTitle,DialogActions,DialogContent,Button} from '@mui/material';
import Reviewcard from './Reviewcard';



const Blogdetail = () => {
    const dispatch=useDispatch();

    const {id}=useParams();
    const [open,setOpen]=useState(false);
    const [comment,setComment]=useState("");
    const [rating,setRating]=useState(0)
    const [name,setName]=useState("");

    const {blogdetail,allreview}=useSelector((state)=>state.blogdetailred)
    const {ratings,username}=useSelector((state)=>state.blogdetailred)

    

    const options={
        value:Number(ratings),
        size:"large",
        readOnly:true,
        precesion:0.5,
    }

    const submitreviewtoggle=(e)=>{
        open?setOpen(false):setOpen(true)
    };

    const submitreviewhandler=(e)=>{
        e.preventDefault();

        const myform=new FormData();
        myform.set("blogid",id);
        myform.set("name",name);
        myform.set("rating",rating);
        myform.set("comment",comment)

        dispatch(createblogreviewaction(myform));
        setOpen(false);
        dispatch({
            type:"CREATE_REVIEW_RESET"
        })
    }

    useEffect(()=>{

        dispatch(blogdetailaction(id))

    },[dispatch,id])


  return (
    <Fragment>
        <div className="blogdetailcontainer">
            <div className="blogdetailcarousel">
            <Carousel>{
                blogdetail.images &&
                blogdetail.images.map((item)=>(
                    <img src={item.url} alt="blog avatar" key={item._id}/>
                ))
                }</Carousel>
            </div>
            <div className="blogdetaildiv">
                <div className="blogdetailid">{blogdetail._id}</div>
                <div className="blogdetailtitle">{blogdetail.title}</div>
                <div className="blogdetailcategory">
                    <span><Typography>Category</Typography></span>
                    <span>{blogdetail.category}</span>
                </div>
                <div className="blogdetailrating">
                    <Rating {...options}/>
                    <span>{blogdetail.numofreview} Reviews</span>
                </div>
                <div className="blogeditor">{username}</div>
                <div className="blogdetaildate">
                    {String(blogdetail.createdAt).substring(0,10)}
                </div>
                <div><button onClick={submitreviewtoggle}>submit review</button></div>
                <div>
                    <Dialog
                    aria-labelledby='dialog-box'
                    open={open}
                    onClose={submitreviewtoggle}
                    >
                        <DialogTitle>submit review box</DialogTitle>
                        <DialogContent>
                            <input type="text"
                            required
                            placeholder='Plz enter your name'
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                            />
                            <textarea
                            rows={10}
                            cols={50}
                            value={comment}
                            onChange={(e)=>setComment(e.target.value)}
                            ></textarea>
                            <Rating 
                            size="large"
                            value={Number(rating)}
                            onChange={(e)=>setRating(e.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={submitreviewtoggle}>cancel</Button>
                            <Button onClick={submitreviewhandler}>submit review</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
            
        </div>
        <div className="blogdetaildescription">{blogdetail.description}</div>
        <div className="allreviewcontainer">
            {
                allreview && allreview[0]?(
                    <div className="allreviewdiv">
                        {allreview.map((review)=>(<Reviewcard key={review._id} review={review}/>))}
                    </div>
                ):(
                    <p>Now Review Yet</p>
                )
            }

        </div>
    </Fragment>
  )
}

export default Blogdetail