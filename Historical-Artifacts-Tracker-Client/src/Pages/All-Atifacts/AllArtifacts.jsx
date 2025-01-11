import React, { useEffect, useState } from 'react';
import PageTitle from '../../Componets/PageTitle/PageTitle';
import axios from 'axios';
import IndividualArtifactsCart from '../../Componets/IndividualArtifactsCart/IndividualArtifactsCart';
import Loader from '../../Componets/Loader/Loader';

const AllArtifacts = () => {

    const [loading, setLoading] = useState(true)
    const [artifactsData, setArtifactsData] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        // axios.get(`${import.meta.env.VITE_baseURL}/artifactCollection/${search}`)
        axios.get(`${import.meta.env.VITE_baseURL}/artifactCollection?searchParms=${search}`)
            .then(res => {
                setLoading(false)
                setArtifactsData(res.data)
            })
    }, [search])


    const handleDataChange = (e) => {
        setSearch(e.target.value)
    }
    return (
        <div className='bg-white'>
            <PageTitle title='All Artifacts'></PageTitle>



            <div className='w-full px-4 md:w-5/12 lg:w-4/12 md:mx-auto pt-10'>
                <label className="input input-bordered flex items-center gap-2">
                    <input onChange={handleDataChange} type="text" className="grow" placeholder="Search" />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd" />
                    </svg>
                </label>
            </div>
            {
                loading && <Loader></Loader>
            }

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 py-14 w-10/12 mx-auto'>
                {
                    artifactsData.map(artifact => <IndividualArtifactsCart key={artifact._id} artifact={artifact}></IndividualArtifactsCart>)
                }
            </div>


        </div>
    );
};

export default AllArtifacts;