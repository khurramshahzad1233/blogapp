import React from 'react';
import playstore from "../../../images/playstore.png";
import appstore from "../../../images/Appstore.png";
import "./Footer.css";


const Footer = () => {
  return (
    <footer>
        <div className="leftfooter">
            <h4>DOWNLOAD OUR APP</h4>
            <p>Download our app for android and ios mobile system</p>
            <img src={playstore} alt="playstore" />
            <img src={appstore} alt="Appstore" />
        </div>
        <div className="midfooter">
            <h1>logo</h1> 
            <p>High quality is our priorty</p>
            <p>copyrights 2022 &copy; khurramshahzad</p>
        </div>
        <div className="rightfooter">
            <h4>Follow us</h4>
            <a href="http://youtube.com">Youtube</a>
            <a href="http://instagram.com">Instagram</a>
            <a href="http://facebook.com">Facebook</a>
           

        </div>
    </footer>
  )
}

export default Footer