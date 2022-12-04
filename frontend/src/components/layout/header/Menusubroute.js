import React,{Fragment} from 'react';
import {Link} from "react-router-dom"
import "./Header.css"

const Menusubroute = ({route}) => {
  return (
    <Fragment>
        <div className="subroutecontainer">
        <div className='subroutehead' key={route.name}><Link to={route.link} style={{textDecoration:"none"}}>{route.name}</Link>
        <div className='subroutediv'>
            {route.subroutes.map((rout)=>{
                return(
                    <div key={rout.name}><Link to={rout.link} style={{textDecoration:"none"}}>{rout.name}</Link></div>
                )
            })}
        </div>
        </div>
        
        </div>
        

    </Fragment>
  )
}

export default Menusubroute