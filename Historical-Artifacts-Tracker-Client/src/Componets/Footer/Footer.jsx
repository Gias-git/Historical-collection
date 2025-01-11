import React from 'react';

import logo from '../../assets/logoa11.jpg'

const Footer = () => {
    return (
        <footer className="footer bg-primaryColor text-white  p-10">
            <aside>

                <img src={logo} alt="" />
             
            </aside>
            <nav>
                <h6 className="footer-title">Types</h6>
                <a className="link link-hover">Document</a>
                <a className="link link-hover">Reading</a>
                <a className="link link-hover">writing</a>
                <a className="link link-hover">Advertisement</a>
            </nav>
            <nav>
                <h6 className="footer-title">Special Link</h6>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">History Book</a>
                <a className="link link-hover">Press kit</a>
            </nav>
            <nav>
                <h6 className="footer-title">Legal</h6>
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">Cookie policy</a>
            </nav>
        </footer>
    );
};

export default Footer;