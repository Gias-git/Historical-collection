import React from 'react';
import { Link } from 'react-router-dom';

const IndividualArtifactsCart = ({ artifact }) => {

    const { artifactName, validURL, _id, historicalContext, count } = artifact
    return (
        <div className=" bg-tertiaryColor overflow-auto ">
            <figure className='min-h-40 w-full'>

                <img className='w-full h-52 object-cover'
                    src={validURL}
                    alt={validURL} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{artifactName}</h2>
                <div className='space-y-3 font-serif'>

                    <p>   {historicalContext} </p>
                    <p>  Like: {count} </p>


                </div>
                <div className="card-actions justify-start">
                    <Link to={`/artifactDetails/${_id}`}>  <button className=" py-2 px-3 bg-secondaryColor text-white">View Detail</button> </Link>
                </div>
            </div>
        </div>
    );
};

export default IndividualArtifactsCart;