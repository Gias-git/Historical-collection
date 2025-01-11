import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BiErrorCircle } from 'react-icons/bi';
import { CgGoogle } from 'react-icons/cg';
import { AuthContext } from '../../Authentication/FirebaseAuthContext';
import regLotti from '../../assets/register/register.json'
import Lottie from 'lottie-react';
import axios from 'axios';
import Swal from 'sweetalert2';


const Login = () => {
    const { signInUser, setUser, googleLogin, user } = useContext(AuthContext)
    const [error, setError] = useState(null)
    const location = useLocation()
    const navigate = useNavigate()

    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                setUser(result.user)
                const UserEmail = user?.email

                axios.post(`${import.meta.env.VITE_baseURL}/jwt`, { UserEmail }, {
                    withCredentials: true,
                }).then(res => {
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Login Success",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate(location?.state || '/')
                })

            }
            )
            .catch(error => console.log(error.message))
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        signInUser(email, password)
            .then(result => {
                const user = result.user
                setUser(user)
                const UserEmail = user?.email
                axios.post(`${import.meta.env.VITE_baseURL}/jwt`, { UserEmail }, {
                    withCredentials: true,
                }).then(res => {
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Login Success",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate(location?.state || '/')
                })

            })
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorMessage) {
                    setError('Invalid Email or Password')
                }
            })
    }

    return (

        <div className='bg-tertiaryColor'>

            <div className='flex flex-col lg:flex-row justify-center items-center min-h-screen mx-auto xl:w-8/12 px-7  gap-5 py-10 '>
                <div className='lg:w-6/12'>
                    <Lottie animationData={regLotti} loop={true}></Lottie>
                </div>

                <div className={user ? 'hidden' : 'flex flex-col gap-4 mt-10 border-2 lg:w-6/12 lg:mx-auto  rounded-lg'}>
                    <div className='bg-primaryColor text-white py-3 '>
                        <h1 className='lg:text-2xl font-bold text-center'>LOGIN </h1>
                    </div>

                    <div className='mx-auto'>
                        <button className='px-4 py-3 rounded-md bg-secondaryColor flex text-xl text-white items-center justify-center gap-4' onClick={handleGoogleLogin}><CgGoogle></CgGoogle> Login With Google</button>
                    </div>

                    <hr className=' border-primaryColor w-8/12 mx-auto my-3' />

                    <div className=''>
                        <form onSubmit={handleFormSubmit} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input name='email' type="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input name='password' type="password" placeholder="password" className="input input-bordered" required />
                                <p className='label-text my-2 px-1 underline'>Forget Password </p>

                                <label className="label">
                                    <p>Don't have an account? <span className='text-bold text-primaryColor'> <Link to='/register'>Sign Up</Link> </span>  now</p>
                                </label>


                                <div className={error ? 'block flex justify-center items-center gap-3 text-lg' : 'hidden'}>
                                    <BiErrorCircle className='text-red-500'></BiErrorCircle>  <p className='text-primaryColor'>{error}</p>
                                </div>
                            </div>
                            <div className="form-control mt-6">
                                <button className="py-2 w-4/12 mx-auto text-xl font-bold font-poppins text-white bg-primaryColor">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>


    );
};



export default Login;