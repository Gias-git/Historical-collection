import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import IndividualArtifactsCart from '../IndividualArtifactsCart/IndividualArtifactsCart';
import { Link } from 'react-router-dom';

const FeaturedArtifacts = () => {

    const [loading, setLoading] = useState(true)
    const [artifactsData, setArtifactsData] = useState([])
    useEffect(() => {
        // axios.get(`${import.meta.env.VITE_baseURL}/artifactLimitCollection`)
        axios.get(`${import.meta.env.VITE_baseURL}/artifactLimitCollection`)
            .then(res => {
                setLoading(false)
                setArtifactsData(res.data)
            })
    }, [])

    return (
        <div>
            <div className='w-10/12 mx-auto'>
                <h1 className='text-2xl mt-10 '> Featured Artifacts </h1>
                <hr className='w-2/12 border-2 border-secondaryColor' />
            </div>

            <div>
                {loading && <Loader></Loader>}
            </div>



            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 py-14 w-10/12 mx-auto'>
                {
                    artifactsData.map(artifact => <IndividualArtifactsCart key={artifact._id} artifact={artifact}></IndividualArtifactsCart>)
                }
            </div>

            <div className=' lg:w-3/12 mx-auto flex justify-center items-center my-10'>

                <Link to='/allArtifacts'>  <button className=' bg-tertiaryColor px-4 py-2 text-center text-2xl '>View More</button> </Link>

            </div>



        </div>
    );
};

export default FeaturedArtifacts;