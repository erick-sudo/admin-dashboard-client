import React from "react";
import { NavLink } from "react-router-dom";
import { BsLinkedin, BsTwitter, BsFacebook, BsYoutube, BsSlack } from 'react-icons/bs'

function Footer() {
    return (
        <div className="footer">
            <div className="follow-us">
                <NavLink><BsLinkedin /></NavLink>
                <NavLink><BsTwitter /></NavLink>
                <NavLink><BsFacebook /></NavLink>
                <NavLink><BsYoutube /></NavLink>
                <NavLink><BsSlack /></NavLink>
            </div>
            <div>Copyright &copy; 2023 <b>- Scalene -</b> All Rights Reserved</div>
            <div className="h2">Designed By:     <b>CireWagon</b></div>
            <div className="h2">Distributed By: <b>Scalene</b></div>
        </div>
    );
}

export default Footer;