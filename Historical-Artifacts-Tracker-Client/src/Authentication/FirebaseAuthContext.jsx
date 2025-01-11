import React, { Children, createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

import { GoogleAuthProvider } from "firebase/auth";
import { auth } from './Firebase.init';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
export const AuthContext = createContext();

const FirebaseAuthContext = ({ children }) => {

    const [modalVisaCardContent, setModaVisaCardContent] = useState({})
    const [dark, setDark] = useState(false);
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [ProfilephotoURL, setProfilephotoURL] = useState(null);
    const [profileName, setprofileName] = useState('');




    const provider = new GoogleAuthProvider();

    const googleLogin = async () => {
        return signInWithPopup(auth, provider)
     

    }

    const newRegisterUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOutUser = async () => {
        return signOut(auth).then(() => setUser(null)).catch((error) => console.log(error))
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser?.email) {
                const UserEmail = currentUser.email
                await axios.post(`${import.meta.env.VITE_baseURL}/jwt`, { UserEmail }, {
                    withCredentials: true,
                })

                setProfilephotoURL(currentUser?.photoURL)
                setprofileName(currentUser?.displayName)
                setUser(currentUser)
            } else {
                await axios.post(
                    `${import.meta.env.VITE_baseURL}/logout`, {},
                    { withCredentials: true }
                )
                setUser(null)
            }
            setLoading(false)

        });
        return () => {
            unsubscribe();
        }
    }, [])



    const contextInfo = {
        newRegisterUser,
        user,
        setUser,
        signInUser,
        logOutUser,
        googleLogin,
        loading,
        setProfilephotoURL,
        ProfilephotoURL,
        setprofileName,
        profileName,
        dark,
        setDark,
        modalVisaCardContent,
        setModaVisaCardContent
    }

    return (



        <div>

            <AuthContext.Provider value={contextInfo}>
                {children}
            </AuthContext.Provider>

        </div>
    );
};

export default FirebaseAuthContext;