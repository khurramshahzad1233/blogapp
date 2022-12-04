import React,{Fragment,useState} from 'react'
import "./Header.css"
import {Link} from "react-router-dom"
import {FaAngleDown, FaAngleRight} from "react-icons/fa"

const Burgersubroute = ({route}) => {
    const [click,setClick]=useState(false);

    const burgersubroutehandler=(e)=>{
        setClick(!click)
    }

  return (
    <Fragment>
        <div className="burgerroutecontainer">
            <div className="burgerroutehead" onClick={burgersubroutehandler}>
                <Link to={route.link} key={route.name} style={{textDecoration:"none"}}>{route.name}</Link> <span>{click?<FaAngleRight/>:<FaAngleDown/>}</span>
                <div className={click?"burgerroutediv":"closeburgersubroute"}>
                    {
                        route.subroutes.map((burgerrout)=>{
                            return(
                                <div key={burgerrout.name}><Link to={burgerrout.link} style={{textDecoration:"none"}}>{burgerrout.name}</Link></div>
                            )
                        })
                    }
                </div>
            </div>

        </div>
    </Fragment>
  )
}

export default Burgersubroute