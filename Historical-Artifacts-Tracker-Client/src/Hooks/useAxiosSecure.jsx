import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import FirebaseAuthContext, { AuthContext } from '../Authentication/FirebaseAuthContext';
import { useNavigate } from 'react-router-dom';

const AxiosSecure = axios.create({
    baseURL: import.meta.env.VITE_baseURL,
    withCredentials: true
})

const useAxiosSecure = () => {

    const navigate = useNavigate()

    const { logOutUser } = useContext(AuthContext)

    useEffect(() => {

        AxiosSecure.interceptors.response.use(
            res => {
                return res
            },
            error => {
                console.log(error.response)
                if (error.response.status === 401 || error.response.status === 403) {
                    logOutUser()
                    navigate('/')
                }
            }


        )

    }, [])

    return AxiosSecure
}
export default useAxiosSecure;