import React, { useContext, useEffect, useState } from 'react';
import PageTitle from '../../Componets/PageTitle/PageTitle';
import Loader from '../../Componets/Loader/Loader';
import axios from 'axios';
import { AuthContext } from '../../Authentication/FirebaseAuthContext';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const LikedArtifacts = () => {
    const { user } = useContext(AuthContext)
    const [loader, setLoader] = useState(true)
    const [LikedArtifacts, setLikedArtifacts] = useState([])
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        axiosSecure.get(`/myLikedData/${user?.email}`)
            .then(res => {
                setLikedArtifacts(res.data)
                setLoader(false)
            })
    }, [])

    return (
        <div>
            <PageTitle title='Liked Artifacts'></PageTitle>

            <div className='bg-tertiaryColor'>
                {
                    loader && <Loader></Loader>
                }

                {LikedArtifacts?.length === 0 ? <div className='min-h-60 flex justify-center items-center'><p className='text-bold text-4xl'>No data Found</p></div> :

                    < div className="overflow-x-auto w-8/12 mx-auto py-20">

                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr className='text-primaryColor'>
                                    <th>Artifact Name</th>
                                    <th>Artifact Type</th>
                                    <th>Discovered By</th>
                                    <th>Created AT</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>



                                {LikedArtifacts?.map(artifact => <tr key={artifact._id}>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={artifact.validURL}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">    {artifact.artifactName} </div>

                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {artifact.artifactType}
                                    </td>
                                    <td>
                                        {artifact.discoveredBy}
                                    </td>
                                    <td>  {artifact.createdAT}</td>
                                    <th>
                                        <Link to={`/artifactDetails/${artifact._id}`}> <button> Show Details</button> </Link>
                                    </th>
                                </tr>)
                                }
                                {/* row 1 */}


                            </tbody>
                        </table>
                    </div>
                }


            </div>
        </div >
    );
};

export default LikedArtifacts;