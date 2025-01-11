
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout';
import ErrorLayout from '../Layouts/ErrorLayout';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login-Register/Login';
import Register from '../Pages/Login-Register/Register';
import AddArtifacts from '../Pages/AddArtifacts/AddArtifacts';
import AllArtifacts from '../Pages/All-Atifacts/AllArtifacts';
import PrivateRoutes from './PrivateRoutes';
import MyArtifacts from '../Pages/MyProfile.jsx/MyArtifacts';
import LikedArtifacts from '../Pages/MyProfile.jsx/LikedArtifacts';
import axios, { Axios } from 'axios';
import ArtifactDetails from '../Pages/ArtifactDetail/ArtifactDetails';
import AboutUs from '../Pages/AboutUs/AboutUs';
import ContactUs from '../Pages/ContactUs/ContactUs';

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorLayout></ErrorLayout>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "login",
                element: <Login></Login>
            },
            {
                path: "register",
                element:
                    <Register></Register>

            },
            {
                path: "addArtifacts",
                element:
                    <PrivateRoutes>
                        <AddArtifacts></AddArtifacts>
                    </PrivateRoutes>

            },
            {
                path: "allArtifacts",
                element:

                    <AllArtifacts></AllArtifacts>

            },
            {
                path: "myArtifacts",
                element:
                    <PrivateRoutes>
                        <MyArtifacts></MyArtifacts>
                    </PrivateRoutes>
            },
            {
                path: "likedArtifacts",
                element:
                    <PrivateRoutes>
                        <LikedArtifacts></LikedArtifacts>
                    </PrivateRoutes>
            },
            {
                path: "aboutUs",
                element: <AboutUs></AboutUs>
                    
            },
            {
                path: "contactUs",
                element: <ContactUs></ContactUs>
                    
            },
            {
                path: "artifactDetails/:id",
                element:
                    <PrivateRoutes>
                        <ArtifactDetails></ArtifactDetails>
                    </PrivateRoutes>,
                // loader: async ({ params }) => await axios.get(`${import.meta.env.VITE_baseURL}/artifactDetail/${params.id}`, {
                //     withCredentials: true
                // }),
            },

        ]

    },
]);

export default router;