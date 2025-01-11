import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../Componets/Loader/Loader';
import { AuthContext } from '../Authentication/FirebaseAuthContext';


const PrivateRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext)

    const location = useLocation()



    if (loading) {
        return <Loader></Loader>
    }

    if (user && user?.email) {
        return children
    }

    return <Navigate state={location?.pathname} to='/login' ></Navigate>


};

export default PrivateRoutes;