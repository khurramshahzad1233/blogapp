import React,{Fragment} from 'react'
import "./Blogcard.css"
import {Link} from "react-router-dom"
import {Rating} from "@mui/material"

const Blogcard = ({blog}) => {
  const options={
    value:blog.ratings,
    readOnly:true,
    precesion:0.5,
    size:"large",
  }
  return (
    <Fragment>
      <Link to={`/blog/${blog._id}`} className="singleblogdiv">
        <div><span>{blog.title}</span> <span>{blog.category}</span></div>
        <div className="homeblogimage"><img src={blog.images[0].url} alt="blog avatar"/></div>
        <div><span><Rating {...options}/></span><span>{blog.numofreview} Reviews</span></div>
        <div>{blog.description}</div>
         </Link>
    </Fragment>
  )
}

export default Blogcard