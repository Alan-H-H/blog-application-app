import React from "react";
import Logo from "../img/logo.webp"

const Footer = () =>{
    return(<footer>
        <img src={Logo} alt="" width='80px'/>

        <span>Made it for yourself by
             <a className="write" href='https://alan-hackbartt.netlify.app'>
              Alan </a> with react-router</span>
    </footer>)
}

export default Footer