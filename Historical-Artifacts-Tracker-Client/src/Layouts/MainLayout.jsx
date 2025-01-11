import React from 'react';
import Navbar from '../Componets/Navbar/Navbar';
import Footer from '../Componets/Footer/Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div className='font-prata'>

            {/* navbar */}
            <div className='bg-primaryColor sticky top-0 z-50'>
                
                <Navbar></Navbar>
            </div>


            {/* main */}

            <div className="min-h-[calc(100vh-200px)]">
                <Outlet></Outlet>
            </div>

            {/* Footer */}
            <Footer></Footer>

        </div>
    );
};

export default MainLayout;