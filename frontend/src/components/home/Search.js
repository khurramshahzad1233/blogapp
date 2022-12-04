import React,{Fragment,useState} from 'react'
import "./Search.css"
import {useNavigate} from "react-router-dom"

const Search = () => {
    const navigate=useNavigate()

    const [keyword,setKeyword]=useState("")

    const searchsubmithandler=(e)=>{
        e.preventDefault();

        if(keyword.trim()){
            navigate(`/${keyword}`)

        }else{
            navigate(`/`)
        }
    }
  return (
    <Fragment>
        <form
        onSubmit={searchsubmithandler}
        >
            <input type="text"
            required
            placeholder='search blog by title'
            value={keyword}
            onChange={(e)=>setKeyword(e.target.value)}
            />
            <input type="submit"
            value="Search"
            />
        </form>
    </Fragment>
  )
}

export default Search