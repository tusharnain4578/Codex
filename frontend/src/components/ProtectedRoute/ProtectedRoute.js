import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import axios from 'axios'
import LoadingSpinner from '../mini/LoadingSpinner';

let temp = 0;
const ProtectedRoute = ({ children, renderOnAuth }) => {


    // useState hook for authentication
    const [isAuth, setIsAuth] = useState(0);


    const getAuth = async () => {
        try {
            const data = await axios.get("/user/auth");
            setIsAuth(data.status);
        } catch (error) {
            setIsAuth(error.status)
            // console.log(error);
        }
    }


    useEffect(() => {
        getAuth();
    }, []);


    //this will show the loader until the reques is resolved and we got some response
    if (isAuth === 0) return <LoadingSpinner show={true} />;


    if (isAuth === 200) {
        if (renderOnAuth == true) {
            return children;
        } else {
            return <Navigate to="/" />
        }
    } else {
        if (renderOnAuth == false) {
            return children;
        }
    }

    return <Navigate to="/signin" />
}

export default ProtectedRoute;