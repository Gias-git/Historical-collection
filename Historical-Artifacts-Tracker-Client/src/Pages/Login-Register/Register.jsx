import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BiErrorCircle } from 'react-icons/bi';
import { updateProfile } from 'firebase/auth';
import { AuthContext } from '../../Authentication/FirebaseAuthContext';
import regLotti from '../../assets/register/register.json'
import Lottie from 'lottie-react';
import Swal from 'sweetalert2';

const Register = () => {

    const { newRegisterUser, setUser, setProfilephotoURL, setprofileName } = useContext(AuthContext)
    const location = useLocation()
    const navigate = useNavigate()

    const [error, setError] = useState(null)

    const handleRegister = (e) => {
        e.preventDefault()

        setError(null)

        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const PhotoUrl = e.target.PhotoURL.value;

        if (password.length < 6) {
            return setError('Password should be at least 6 characters')
        }

        const upperCasePasswordRegex = /^(?=.*[A-Z]).+$/;

        if (!upperCasePasswordRegex.test(password)) {
            return setError('Password should be used an Uppercase')
        }

        const lowerCasePasswordRegex = /.*[a-z].*/;


        if (!lowerCasePasswordRegex.test(password)) {
            return setError('Password should be used a Lowercase')
        }

        newRegisterUser(email, password)
            .then(userCredential => {
                // Set the photo URL
                const updateduser = userCredential.user;
                updateProfile(updateduser, { photoURL: PhotoUrl, displayName: name })
                    .then(() => {

                        setUser(updateduser)
                        setProfilephotoURL(updateduser.photoURL)
                        setprofileName(updateduser.displayName)
                        Swal.fire({
                            position: "top-center",
                            icon: "success",
                            title: "Login Success",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate(location?.state ? location.state : '/')
                    })
                    .catch((error) => {

                        console.error("Error updating profile:", error);

                    });
            })
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError('Email already Used')

            })

    }

    return (


        <div className='bg-tertiaryColor'>

            <div className='flex flex-col lg:flex-row justify-center items-center min-h-screen lg:mx-auto xl:w-8/12 px-7  gap-5 py-10 '>

                <div className='lg:w-6/12'>
                    <Lottie animationData={regLotti} loop={true}></Lottie>
                </div>

                <div className='flex flex-col gap-4 border-2   lg:mx-auto shadow-lg rounded-lg lg:w-6/12'>
                    <div className='bg-primaryColor text-white py-3 '>
                        <h1 className='text-2xl font-bold text-center'>USER REGISTER</h1>
                    </div>

                    <div className=''>
                        <form onSubmit={handleRegister} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input name='name' type="text" placeholder="name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo-URL</span>
                                </label>
                                <input name='PhotoURL' type="text" placeholder="Photo-URL" className="input input-bordered" required />
                            </div>
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
                                <label className="label">
                                    <p>Already have an account? <span className='text-bold text-primaryColor'> <Link to='/login'>Sign in</Link> </span>  now</p>
                                </label>

                                <label className="label">



                                    <div className={error ? 'block flex justify-center items-center gap-3 text-lg' : 'hidden'}>
                                        <BiErrorCircle className='text-red-500'></BiErrorCircle>  <p className='text-primaryColor'>{error}</p>
                                    </div>


                                </label>
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

export default Register;