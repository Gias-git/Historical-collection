import React from 'react';

const Loader = () => {
    return (
        <div className='min-h-[calc(100vh-200px)] flex justify-center items-center'>
            <span className="loading loading-infinity  w-[70px]"></span>
        </div>
    );
};

export default Loader;