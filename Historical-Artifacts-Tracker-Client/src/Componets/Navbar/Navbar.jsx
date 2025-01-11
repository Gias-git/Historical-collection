import React, { useContext, useEffect, useState } from 'react';
// import logo from "../assets/logo.jpg"
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../Authentication/FirebaseAuthContext';
import { BiArrowFromLeft, BiMenu } from 'react-icons/bi';
import logo from '../../assets/logoa11.jpg'
import { GiHamburgerMenu } from 'react-icons/gi';


const Navbar = () => {

    const { user, logOutUser, loading, setUser, ProfilephotoURL, profileName,
        setDark, dark } = useContext(AuthContext)



    const handleLogout = () => {
        logOutUser()
    }

    useEffect(() => {
        setUser(user)
    }, [user])




    const links = <>

        <li><NavLink to='/' className={({ isActive }) => isActive ? 'bg-primaryColor px-4 py-2 rounded-sm text-secondaryColor' : 'px-4 py-2  text-white '}>Home</NavLink> </li>
        <li><NavLink to='/allArtifacts' className={({ isActive }) => isActive ? 'bg-primaryColor px-4 py-2 rounded-sm text-secondaryColor' : 'px-4 py-2  text-white '}>All Artifacts</NavLink> </li>
        <li><NavLink to='/addArtifacts' className={({ isActive }) => isActive ? 'bg-primaryColor px-4 py-2 rounded-sm text-secondaryColor' : 'px-4 py-2  text-white '}>Add Artifacts</NavLink> </li>



    </>

    return (
        <div className={` navbar  py-6 font-poppins md:w-11/12 mx-auto px-2 `} >
            <div className="navbar-start">

                <div className="drawer xl:hidden">
                    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        {/* Page content here */}
                        <label htmlFor="my-drawer" className="bg-tertiaryColor  drawer-button">
                            <BiMenu className='border-2  text-4xl  text-tertiaryColor'></BiMenu>
                        </label>
                    </div>
                    <div className="drawer-side z-10">
                        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay text-6xl"></label>
                        <ul className="menu bg-white/30 backdrop-blur-md pt-28 gap-3  h-[100vh] w-3/4 md:w-5/12 px-4 py-7">
                            {/* Sidebar content here */}
                            {links}
                        </ul>
                    </div>
                </div>
                <a className=" text-xl">
                    <div className='xl:w-8/12 font-bold'>
                        <img src={logo} alt="" />
                    </div>
                </a>
            </div>
            <div className="navbar-center hidden xl:flex">
                <ul className="flex gap-4 mt-4 px-1 font-prata text-white ">
                    {links}
                </ul>
            </div>

            <div className="navbar-end space-x-4">

                {user &&
                    <div className="dropdown dropdown-hover dropdown-end">
                        <div tabIndex={0} role="button" className="btn m-1 bg-secondaryColor text-white font-thin">My Profile</div>
                        <ul tabIndex={0} className="flex flex-col gap-3 z-50 menu-md dropdown-content bg-tertiaryColor  w-44 py-8 px-3 shadow">
                            <li><NavLink to='/myArtifacts' className={({ isActive }) => isActive ? ' px-4 py-2 rounded-sm bg-primaryColor text-white' : 'px-4 py-2  text-primaryColor  '}>My Artifacts</NavLink> </li>
                            <li><NavLink to='/likedArtifacts' className={({ isActive }) => isActive ? ' px-4 py-2 rounded-sm bg-primaryColor text-white' : 'px-4 py-2  text-primaryColor  '}>Liked Artifacts</NavLink> </li>

                            {/* {links} */}
                        </ul>



                    </div>
                }


                {
                    loading == false && user && user?.email ? (


                        <div className='dropdown  dropdown-end'>
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-12 rounded-full border-red-600 border-2">
                                    <img src={user.photoURL !== null ? ProfilephotoURL : 'https://t3.ftcdn.net/jpg/06/17/13/26/360_F_617132669_YptvM7fIuczaUbYYpMe3VTLimwZwzlWf.jpg'} alt="" crossOrigin="anonymous" loading="lazy" />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className=" gap-3 menu-md  dropdown-content bg-base-100  z-50 mt-3 w-52 p-2 shadow">

                                <li><a>Hi!! {profileName}</a></li>
                                <li className='bg-secondaryColor text-white  rounded-lg my-3'><button onClick={handleLogout} className='flex gap-4'> <div> Logout </div> <BiArrowFromLeft className='text-xl'></BiArrowFromLeft> </button></li>
                            </ul>
                        </div>) : <div className='flex'> <Link to='/login' className='btn bg-secondaryColor text-white'>login</Link>   </div>
                }



            </div>
        </div>

    );
};

export default Navbar;