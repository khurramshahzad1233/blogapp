import React,{Fragment} from 'react'
import {Rating} from "@mui/material"

const Reviewcard = ({review}) => {
    const option={
        value:Number(review.rating),
        precesion:0.5,
        readOnly:true,
        size:"large"
    }
  return (
    <Fragment>
        <div>{review.name}</div>
        <div className="reviewcardrating"><Rating {...option}/></div>
        <div className="reviewcardcomment">{review.comment}</div>
    </Fragment>
  )
}

export default Reviewcard