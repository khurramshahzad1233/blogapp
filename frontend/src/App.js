import React,{useEffect} from 'react'
import "./App.css"
import {Route,Routes,BrowserRouter as Router} from "react-router-dom"
import WebFont from "webfontloader"
import Footer from './components/layout/footer/Footer'
import Header from './components/layout/header/Header'
import Loginsignup from './components/user/Loginsignup'
import store from "./store"
import {loaduseraction} from "./actions/useraction"
import {useSelector} from "react-redux"
import Protectedroute from "./components/route/Protectedroute"
import Profile from './components/user/Profile'
import Useroption from './components/layout/header/Useroption'
import Updateprofile from './components/user/Updateprofile'
import Updatepassword from './components/user/Updatepassword'
import Home from './components/home/Home'
import Blogdetail from './components/blog/Blogdetail'
import Newblog from './components/blog/Newblog'
import Myblog from './components/blog/Myblog'
import Updateblog from './components/blog/Updateblog'
import Dashboard from './components/admin/Dashboard'
import Adminuserlist from './components/admin/Adminuserlist'
import Adminbloglist from './components/admin/Adminbloglist'
import About from './components/about/About';
import Contact from './components/contact/Contact'

const App = () => {

  const {isAuthenticated,user}=useSelector((state)=>state.userred)

  useEffect(()=>{


    WebFont.load({google:{
      families:["Roboto","Droid Sans","Chilanka","Montserrat"]
    }});

    store.dispatch(loaduseraction())
  },[])
  return (
      <Router>
        {isAuthenticated && <Useroption user={user}/>}
        <Header/>
        

        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/:keyword' element={<Home/>}/>
          <Route path='/login' element={<Loginsignup/>}/>
          <Route path='/blog/:id' element={<Blogdetail/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>

          

          <Route element={<Protectedroute/>}>
            <Route path='/account' element={<Profile/>}/>
          </Route>
          <Route element={<Protectedroute/>}>
            <Route path='/me/update' element={<Updateprofile/>}/>
          </Route>
          <Route element={<Protectedroute/>}>
            <Route path='/password/update' element={<Updatepassword/>}/>
          </Route>
          <Route element={<Protectedroute/>}>
            <Route path='/blog/new' element={<Newblog/>}/>
          </Route>
          <Route element={<Protectedroute/>}>
            <Route path='/blog/me' element={<Myblog/>}/>
          </Route>
          <Route element={<Protectedroute/>}>
            <Route path='/blog/edit/:id' element={<Updateblog/>}/>
          </Route>

          <Route element={<Protectedroute isAdmin={true}/>}>
            <Route path='/admin/dashboard' element={<Dashboard/>}/>
          </Route>
          <Route element={<Protectedroute isAdmin={true}/>}>
            <Route path='/admin/user/all' element={<Adminuserlist/>}/>
          </Route>
          <Route element={<Protectedroute isAdmin={true}/>}>
            <Route path='/admin/blog/all' element={<Adminbloglist/>}/>
          </Route>
        </Routes>

        <Footer/>
      </Router>
    
  )
}

export default App