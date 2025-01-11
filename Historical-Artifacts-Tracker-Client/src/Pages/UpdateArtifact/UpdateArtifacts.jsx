import React, { useContext, useRef } from 'react';
import { AuthContext } from '../../Authentication/FirebaseAuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const UpdateArtifacts = ({ modalmyArtifact }) => {

    const { user } = useContext(AuthContext)
    const formRef = useRef()

    const navigate = useNavigate()


    const handleUpdateArtifact = (e) => {
        e.preventDefault()

        const formData = new FormData(formRef.current)
        const data = Object.fromEntries(formData.entries());

        formRef.current.reset();

        axios.patch(`${import.meta.env.VITE_baseURL}/updateArtifacts/${modalmyArtifact._id}`, data)
            .then(res => {
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Artifact Update Successfully",
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate('/allArtifacts')
            })


    }

    const { artifactName, validURL, artifactType, historicalContext, createdAT, discoveredAt,
        discoveredBy, presentLocation, userName, userEmail, count, _id
    } = modalmyArtifact || {}


    return <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
            <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>


            <form ref={formRef} onSubmit={handleUpdateArtifact} className='space-y-5'>
                {/* Artifacts name */}
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text">What is Artifact name?</span>
                    </div>
                    <input required defaultValue={modalmyArtifact?.artifactName} name='artifactName' type="text" placeholder="Artifact name" className="input input-bordered w-full " />

                </label>

                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text">Artifact Image (valid URL)</span>
                    </div>
                    <input defaultValue={modalmyArtifact?.validURL} name='validURL' type="text" placeholder="valid URL" className="input input-bordered w-full " />

                </label>

                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text">Artifact Type</span>
                    </div>
                    <select defaultValue={modalmyArtifact?.artifactType} name='artifactType' className="select select-bordered w-full ">
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
                    <textarea defaultValue={modalmyArtifact?.historicalContext} name='historicalContext' className="textarea textarea-bordered" placeholder="Historical Context"></textarea>
                </label>

                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text">Created At</span>
                    </div>
                    <input defaultValue={modalmyArtifact?.createdAT} name='createdAT' type="text" placeholder="string, e.g., '100 BC'" className="input input-bordered w-full " />
                </label>

                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text">Discovered At (string, e.g., "1799")</span>
                    </div>
                    <input defaultValue={modalmyArtifact?.discoveredAt} name='discoveredAt' type="text" placeholder="string, e.g., '100 BC'" className="input input-bordered w-full " />
                </label>

                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text">Discovered By</span>
                    </div>
                    <input defaultValue={modalmyArtifact?.discoveredBy} name='discoveredBy' type="text" placeholder="Discovered By" className="input input-bordered w-full " />
                </label>

                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text">Present Location</span>
                    </div>
                    <input defaultValue={modalmyArtifact?.presentLocation} name='presentLocation' type="text" placeholder="Present Location" className="input input-bordered w-full " />
                </label>




                <input type="submit" value="Update Artifact" className='btn bg-primaryColor text-white font-thin' />

            </form>
        </div>
    </dialog>
};

export default UpdateArtifacts;