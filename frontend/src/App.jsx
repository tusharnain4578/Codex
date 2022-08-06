import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import ScrollToTop from './components/mini/ScrollToTop'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap'
import 'remixicon/fonts/remixicon.css'
import Header from './components/Header'
import Home from './components/Home'
import Signin from './components/SignIn/Signin'
import Error404 from './components/Error404'
import Playground from './components/Playground'
import LoadingSpinner from './components/mini/LoadingSpinner'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

//axios
import axios from 'axios'


const App = () => {

    // reRenderApp hook ************** //for rerendring the entire app from child component
    const [value, setValue] = useState(0);
    function usereRenderApp() {
        return () => setValue((value) => value + 1);
    }
    const reRenderApp = usereRenderApp();


    //************** ************** ************** ************** 

    // useState hook for authentication
    const [isAuth, setIsAuth] = useState(0);

    // useState hook for user data
    const [data, setData] = useState({
        name: "",
        email: "",
        id: "",
        serverDown: false
    });



    const getAuth = async () => {
        try {
            const res = await axios("/user/auth");
            setIsAuth(res.status);
            setData({
                name: res.data.user.name,
                email: res.data.user.email,
                id: res.data.user.id,
                serverDown: false,
            });
        } catch (error) {
            setIsAuth(error.status);

            console.log(error);

            if (error.message === "Network Error") {
                setData({
                    name: "",
                    email: "",
                    serverDown: true,
                });
            }


            setData({
                name: "",
                email: "",
                id: "",
                serverDown: false,
            });
        }
    }

    useEffect(() => {
        getAuth();
    }, [value]);


    //this will show the loader until the reques is resolved and we got some response
    if (isAuth === 0) return <LoadingSpinner show={true} />;

    if (isAuth !== 0)
        return (
            <>
                <Header name={data.name} email={data.email} serverDown={data.serverDown} reRender={reRenderApp} />
                <ScrollToTop>
                    <Routes>
                        <Route exact path='/' element={<Home />} />
                        <Route exact path='/signin' element={
                            <ProtectedRoute renderOnAuth={false}>
                                <Signin reRender={reRenderApp} />
                            </ProtectedRoute>
                        } />
                        <Route exact path='/playground' element={
                            <ProtectedRoute renderOnAuth={true}>
                                <Playground id={data.id} reRender={reRenderApp} />
                            </ProtectedRoute>
                        } />
                        <Route path='*' element={<Error404 />} />
                    </Routes>
                </ScrollToTop>

            </>
        )
}

export default App