import React from 'react';
import { Link } from 'react-router-dom';

const ErrorLayout = () => {
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <div className='w-6/12 text-center mx-auto space-y-10'>
                <h1 className='text-8xl text-red-700 font-extrabold '>OOPS!!</h1>
                <p className='text-3xl font-semibold'>404 Page Not Found</p>
                <div>    <Link to='/'><button className='btn bg-red-700 text-white'>Go to Home</button></Link> </div>


            </div>

        </div>
    );
};

export default ErrorLayout;