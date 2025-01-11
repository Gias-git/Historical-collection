import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import PageTitle from '../../Componets/PageTitle/PageTitle';
import { LiaStackExchange } from 'react-icons/lia';
import { BiSolidDislike, BiSolidLike } from 'react-icons/bi';
import axios from 'axios';
import { AuthContext } from '../../Authentication/FirebaseAuthContext';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loader from '../../Componets/Loader/Loader';


const ArtifactDetails = () => {
    const { user } = useContext(AuthContext)
    const [disLike, setDisLike] = useState(false)
    const [likeCount, setLikeCount] = useState(0)
    const axiosSecure = useAxiosSecure();
    const [loadedData, setLoadedData] = useState({})
    const [loading, setLoading] = useState(true)


    const params = useParams()
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_baseURL}/artifactDetail/${params.id}`, {
            withCredentials: true
        }).then(res => {
            setLikeCount(res.data.count)
            setLoadedData(res.data)

            setLoading(false)
        })
    }, [])


    const { artifactName, validURL, artifactType, historicalContext, createdAT, discoveredAt,
        discoveredBy, presentLocation, userName, userEmail, count, _id
    } = loadedData || {}



    useEffect(() => {
        if (_id && user?.email) {
            axios
                .get(`${import.meta.env.VITE_baseURL}/artifactsLikeCheck`, {
                    params: { id: _id, userEmail: user?.email },
                })
                .then(res => setDisLike(res.data.like))
                .catch(err => console.error(err));
        }
    }, [_id, user?.email]);

    // useEffect(() => {
    //     axios.get(`${import.meta.env.VITE_baseURL}/artifactDetail/${params.id}`, {
    //         withCredentials: true
    //     }).then(res => {
    //         setLikeCount(res.data.count)
    //         setLoadedData(res.data)})
    // }, [])






    // handle like count 
    const handleLikeCount = async () => {
        const newLikeCount = likeCount + 1
        const artifactId = _id
        setDisLike(true)
        setLikeCount(newLikeCount)
        const data = { userEmail: user?.email, artifactId }
        data.like = true

        await axios.post(`${import.meta.env.VITE_baseURL}/artifactLike`, data)
        // .then(res => { setLikeCount(newLikeCount) })

    }


    const handleDisLikeCount = () => {
        const newDisLikeCount = likeCount - 1
        setDisLike(false)
        setLikeCount(newDisLikeCount)
        const artifactId = _id
        const like = false
        const dislikedata = { userEmail: user?.email, artifactId, like }

        axios.patch(`${import.meta.env.VITE_baseURL}/artifactDisLike`, dislikedata)
            // .then(res => { setLikeCount(newDisLikeCount) })
        setDisLike(false)
    }




    return (
        <div>


            <PageTitle title={artifactName}></PageTitle>

            <div>
                <div className='flex flex-col justify-center items-center gap-4'>
                    <h1 className='text-4xl text-center pt-20'>About <span className='text-secondaryColor text-center'>{artifactName}</span> </h1>
                    <hr className='border-2 w-2/12 mx-auto border-secondaryColor' />
                </div>

                {
                    loading && <Loader></Loader>
                }

                <div className='flex flex-col lg:flex-row lg:w-10/12 mx-auto py-20'>
                    <div className='lg:w-6/12 bg-tertiaryColor flex flex-col  gap-10  p-6'>
                        <div className='lg:min-h-64 w-full '>

                            <img className='w-full h-full object-cover'
                                src={validURL}
                                alt={validURL} />
                        </div>
                        <div>
                            {historicalContext}
                        </div>
                    </div>
                    <div className="overflow-x-auto flex flex-col gap-8 justify-start items-start lg:w-6/12 lg:px-16">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>Particular</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr>
                                    <td>artifactType</td>
                                    <td>{artifactType}</td>
                                </tr>

                                <tr>
                                    <td>Created At</td>
                                    <td>{createdAT}</td>
                                </tr>


                                <tr>
                                    <td>Discovered At</td>
                                    <td>{discoveredAt}</td>
                                </tr>


                                <tr>
                                    <td>Discovered By</td>
                                    <td>{discoveredBy}</td>
                                </tr>

                                <tr>
                                    <td>presentLocation</td>
                                    <td>{presentLocation}</td>
                                </tr>

                                <tr>
                                    <td>Added By</td>
                                    <td>{userName}</td>
                                </tr>
                            </tbody>


                        </table>

                        <div className='mx-auto flex justify-center items-center gap-4 '>
                            {disLike && <button onClick={handleDisLikeCount} className='text-4xl text-primaryColor'> <BiSolidDislike /> </button > || <button onClick={handleLikeCount} className='text-4xl text-primaryColor'> <BiSolidLike /> </button >}



                            <div className='bg-secondaryColor p-4'>
                                <p className='text-white'>{likeCount}</p>
                            </div>
                        </div>
                    </div>

                    <div>



                    </div>
                </div>
            </div>

        </div>
    );
};

export default ArtifactDetails;