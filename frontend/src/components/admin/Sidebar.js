import React, { Fragment } from 'react';
import "./Sidebar.css"
import {Link} from "react-router-dom"

import {Dashboard,People,ListAlt} from "@mui/icons-material"


const Sidebar = () => {
  return (
    <Fragment>
        <div className="sidebarcontainer">
        <div className="sidebardashboardicon">
            <Link to={`/admin/dashboard`}><Dashboard/></Link>
            <span>Admin Dashboard</span>
        </div>
        <div className="adminmenuitems">
            <div className="alluser">
                <Link to={`/admin/user/all`}><People/></Link><span>Alluser</span>
            </div>
            <div className="allblog">
                <Link to={`/admin/blog/all`}><ListAlt/> all blogs</Link><span>All Blogs</span>
            </div>
        </div>
        </div>
        

    </Fragment>
  )
}

export default Sidebar