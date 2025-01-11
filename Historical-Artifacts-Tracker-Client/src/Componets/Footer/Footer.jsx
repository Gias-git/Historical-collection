import React from 'react';

import logo from '../../assets/logoa11.jpg'
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer bg-primaryColor text-white  p-10">
            <aside>

                <img src={logo} alt="" />
             
            </aside>
            <nav>
                <h6 className="footer-title">Types</h6>
               <Link to='/allArtifacts' className="link link-hover">Document</Link>
               <Link to='/allArtifacts' className="link link-hover">Reading</Link>
               <Link to='/allArtifacts' className="link link-hover">writing</Link>
               <Link to='/allArtifacts' className="link link-hover">Advertisement</Link>
            </nav>
            <nav>
                <h6 className="footer-title">Special Link</h6>
               <Link to='/aboutUs' className="link link-hover">About us</Link>
               <Link to='/contactUs' className="link link-hover">Contact</Link>
               <Link to='/allArtifacts' className="link link-hover">History Book</Link>
               
            </nav>
            <nav>
                <h6 className="footer-title">Legal</h6>
               <Link className="link link-hover">Terms of use</Link>
               <Link className="link link-hover">Privacy policy</Link>
               <Link className="link link-hover">Cookie policy</Link>
            </nav>
        </footer>
    );
};

export default Footer;