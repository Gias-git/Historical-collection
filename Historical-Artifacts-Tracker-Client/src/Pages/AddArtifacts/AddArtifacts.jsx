import React, { useContext, useEffect, useRef, useState } from 'react';
import PageTitle from '../../Componets/PageTitle/PageTitle';
import { AuthContext } from '../../Authentication/FirebaseAuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';

const AddArtifacts = () => {

    const axiosSecure = useAxiosSecure()

    const { user } = useContext(AuthContext)
    const formRef = useRef()
    const navigate = useNavigate()

    // useEffect(async () => {
    //     await axios.get('http://localhost:5000/addArtifactJwtCheck')
    //         .then(res => navigate('/'))
    // }, [])

    useEffect(() => {
        axiosSecure.get(`/addArtifactJwtCheck`)
    }, [])

    const handleAddArtifact = (e) => {
        e.preventDefault()

        const formData = new FormData(formRef.current)
        const data = Object.fromEntries(formData.entries());

        data.count = 0

        formRef.current.reset();


        axiosSecure.post(`/addArtifact`, data)
            .then(res => Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Artifact Added Successfully",
                showConfirmButton: false,
                timer: 1500
            }))
    }

    return (
        <div className='bg-tertiaryColor pb-10'>


            <PageTitle title='Add An Artifact'></PageTitle>

            <div className='lg:w-6/12 w-11/12 mx-auto mt-20 border-2 rounded-lg lg:p-10 p-6 shadow-md'>

                <h1 className='text-2xl font-bold py-6'>Add Your Artifact by proper information</h1>

                <form ref={formRef} onSubmit={handleAddArtifact} className='space-y-5'>
                    {/* Artifacts name */}
                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">What is Artifact name?</span>
                        </div>
                        <input required name='artifactName' type="text" placeholder="Artifact name" className="input input-bordered w-full " />

                    </label>

                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">Artifact Image (valid URL)</span>
                        </div>
                        <input name='validURL' type="text" placeholder="valid URL" className="input input-bordered w-full " />

                    </label>

                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">Artifact Type</span>
                        </div>
                        <select name='artifactType' className="select select-bordered w-full ">
                            <option disabled defaultValue='' >Artifact Type</option>
                            <option value='Tools'>Tools</option>
                            <option value='Weapons'>Weapons</option>
                            <option value='Documents'>Documents</option>
                            <option value='Writings'>Writings</option>
                        </select>

                    </label>

                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">Historical Context</span>
                        </div>
                        <textarea name='historicalContext' className="textarea textarea-bordered" placeholder="Historical Context"></textarea>
                    </label>

                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">Created At</span>
                        </div>
                        <input name='createdAT' type="text" placeholder="string, e.g., '100 BC'" className="input input-bordered w-full " />
                    </label>

                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">Discovered At (string, e.g., "1799")</span>
                        </div>
                        <input name='discoveredAt' type="text" placeholder="string, e.g., '100 BC'" className="input input-bordered w-full " />
                    </label>

                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">Discovered By</span>
                        </div>
                        <input name='discoveredBy' type="text" placeholder="Discovered By" className="input input-bordered w-full " />
                    </label>

                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">Present Location</span>
                        </div>
                        <input name='presentLocation' type="text" placeholder="Present Location" className="input input-bordered w-full " />
                    </label>

                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">Artifact adder name </span>
                        </div>
                        <input name='userName' readOnly value={user?.displayName} type="text" placeholder="Artifact adder name" className="input input-bordered w-full " />
                    </label>

                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">Artifact email</span>
                        </div>
                        <input name='userEmail' readOnly value={user?.email} type="text" placeholder="Type here" className="input input-bordered w-full " />
                    </label>


                    <input type="submit" value="Add Artifact" className='btn bg-primaryColor text-white font-thin' />

                </form>


            </div>

        </div>
    );
};

export default AddArtifacts;