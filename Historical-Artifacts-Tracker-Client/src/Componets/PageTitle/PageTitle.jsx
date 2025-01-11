import React from 'react';
import bgImage from '../../assets/inner-banner-bg-1-1.jpg'

const PageTitle = ({title}) => {
    return (
        <div style={{ backgroundImage: `url(${bgImage})` }} className='md:min-h-72 min-h-40  bg-[url(../../assets/inner-banner-bg-1-1.jpg)] bg-cover bg-center flex justify-center items-center'>

            <div >
                <h1 className='text-3xl md:text-5xl font-medium text-white font-prata'> {title} </h1>
            </div>
        </div>
    );
};

export default PageTitle;