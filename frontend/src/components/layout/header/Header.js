import React,{Fragment,useState} from 'react'
import "./Header.css"
import {routes} from "./constant"
import {Link} from "react-router-dom"
import {FaBars} from "react-icons/fa"
import Menusubroute from './Menusubroute'
import Burgersubroute from './Burgersubroute'


const Header = () => {

    const [open,setOpen]=useState(false);
    

    const togglebtn=(e)=>{
        setOpen(!open)

    }
  return (
    <Fragment>
        <div className="navcontainer">
        <div className="drawarbtn" onClick={togglebtn}><FaBars/></div>
            <div className="logo">LOGO</div>
            <div className="navbar">
                {routes.map((route)=>{

                    if(route.subroutes){

                        return(<Menusubroute route={route} key={route.name}/>)
                    }
                    return(
                        <div key={route.name}>
                            <Link to={route.link} style={{textDecoration:"none"}}>{route.name}</Link>
                        </div>
                    )
                })}

            </div>
           
        </div>

        {/* {open && <div className="backdrop" onClick={togglebtn}></div>} */}
        <div className={open?"backdrop":"backdrop closebackdrop"} onClick={togglebtn}></div>

        <div className= {open?"burgermenu":"burgermenu closemenu"}>
            {routes.map((route)=>{
                if(route.subroutes){
                    return(<Burgersubroute route={route} key={route.name}/>)
                }
                return(
                    <div key={route.name}>
                        <Link to={route.link} style={{textDecoration:"none"}}>{route.name}</Link>
                    </div>
                )
            })}
        </div>
    </Fragment>
  )
}

export default Header