import React,{Fragment,useEffect,useState} from 'react'
import "./Home.css"
import {useDispatch,useSelector} from "react-redux";
import {searchblogaction,clearerror} from "../../actions/blogaction"
import {useAlert} from "react-alert"
import Blogcard from './Blogcard';
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination"
import Search from './Search';



const Home = () => {
    const dispatch=useDispatch();
    const alert=useAlert();

    const {keyword}=useParams();
    const [category,setCategory]=useState("");
    const [currentpage,setCurrentpage]=useState(1)

    const categories=[
        "all",
        "footwear",
        "laptop",
        "electronics",
        "sports",
        "jeans"
    ]

    const {allblog,error,loading,resultperpage,filterblogcount,blogcount}=useSelector((state)=>state.allblogred)
    const setcurrentpageno=(e)=>{
        setCurrentpage(e)
    }

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearerror())
        }
        dispatch(searchblogaction(keyword,currentpage,category))

    },[alert,dispatch,error,keyword,currentpage,category])
  return (
    <Fragment>
        <div className="banner">
            <div className="homeheading">MY BLOGS</div>
            <div><a href="#blogcontainer">Scrol Down</a></div>
            

        </div>
        <h2 className="blogheading">ALL BLOGS</h2>
        <div className="blogsearchbar">
            <Search/>
        </div>
        <div className='blogcatediv'>
        <div className="homeblogcategory">{
            categories.map((category)=>{
                return(
                    <div 
                    key={category}
                    onClick={(e)=>setCategory(category)}
                    >{category}</div>
                )
            })
        }</div>
        <div className="blogcontainer">{
            allblog &&
            allblog.map((blog)=>(<Blogcard blog={blog} key={blog._id}/>))
        }</div>
        </div>

        <div>
            {resultperpage<blogcount &&
            (<Pagination
            onChange={setcurrentpageno}
            activePage={currentpage}
            totalItemsCount={blogcount}
            itemsCountPerPage={resultperpage}
            firstPageText="first"
            lastPageText="last"
            nextPageText={"next"}
            prevPageText="previous"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass='pageLinkActive'
            />)
            }
        </div>
        
    </Fragment>
  )
}

export default Home