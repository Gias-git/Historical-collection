import React, { useContext, useEffect } from 'react';
import PageTitle from '../../Componets/PageTitle/PageTitle';
import Loader from '../../Componets/Loader/Loader';
import { useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Authentication/FirebaseAuthContext';
import { GrDocument } from 'react-icons/gr';
import { TbTrash } from 'react-icons/tb';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import UpdateArtifacts from '../UpdateArtifact/UpdateArtifacts';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const MyArtifacts = () => {

    const [loader, setLoader] = useState(true)
    const { user } = useContext(AuthContext)
    const [myArtifacts, setMyArtifacts] = useState([])
    const navigate = useNavigate()

    const [modalmyArtifact, setmodalmyArtifact] = useState(null)


    const axiosSecure = useAxiosSecure()

    // useEffect(() => {
    //     axios.get(`${import.meta.env.VITE_baseURL}/artifacts/${user?.email}`)
    //         .then(res => {
    //             setMyArtifacts(res.data)
    //             setLoader(false)
    //         })
    // }, [])

    useEffect(() => {
        axiosSecure.get(`/artifacts/${user?.email}`)
            .then(res => {
                setMyArtifacts(res.data)
                setLoader(false)
            })
    }, [])



    const handleArtifactDelete = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",

                });
                axios.delete(`${import.meta.env.VITE_baseURL}/artifacts/${id}`)
                    .then(res => {
                        const filter = myArtifacts.filter(artifact => id !== artifact._id)
                        setMyArtifacts(filter)
                    })
                navigate('/allArtifacts')
            }
        });

        // /artifacts/:id

    }

    return (
        <div className='bg-tertiaryColor'>
            <PageTitle title='My Added Artifacts'></PageTitle>

            <div>
                {
                    loader && <Loader></Loader>
                }

                {myArtifacts?.length === 0 ? <div className='min-h-60 flex justify-center items-center'><p className='text-bold text-4xl'>No data Found</p></div> :
                    <div className="overflow-x-auto w-11/12 lg:8/12 mx-auto py-20">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr className='text-secondaryColor text-lg border-primaryColor'>
                                    <th>Artifact Name</th>
                                    <th>Artifact Type</th>
                                    <th>Discovered By</th>
                                    <th>Created AT</th>
                                    <th> Update/ Delete</th>
                                </tr>
                            </thead>
                            <tbody>



                                {myArtifacts?.map(artifact =>
                                    <tr className='border-secondaryColor' key={artifact._id}>
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
                                        <td >  {artifact.createdAT}</td>
                                        <th>
                                            <button onClick={() => {
                                                const filter = myArtifacts.filter(S_artifact => S_artifact._id == artifact._id)
                                               
                                                setmodalmyArtifact(filter[0])

                                                document.getElementById('my_modal_3').showModal()

                                            }} className="btn btn-ghost btn-xs text-lg font-bold">  <GrDocument></GrDocument> </button>
                                            <button onClick={() => handleArtifactDelete(artifact._id)} className="btn btn-ghost btn-xs text-lg font-bold"> <TbTrash></TbTrash> </button>

                                        </th>
                                    </tr>)
                                }
                                {/* row 1 */}


                            </tbody>
                        </table>


                        <UpdateArtifacts modalmyArtifact={modalmyArtifact}></UpdateArtifacts>

                    </div>
                }




            </div>
        </div>
    );
};

export default MyArtifacts;