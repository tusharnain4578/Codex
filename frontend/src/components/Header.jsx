import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './Header.css'

//danger icon
import danger from './images/danger.png';

//Loading Spinner
import LoadingSpinner from './mini/LoadingSpinner'

//axios
import axios from 'axios'

const Header = (props) => {


    //UseState Hook for loading screen
    const [spin, setSpin] = useState(false);

    // notif hook *********************
    const [showNotif, setShowNotif] = useState({
        mode: "", type: "", message: ""
    });


    //useEffect for showing notification if the server is down
    useEffect(() => {
        if (props.serverDown) {
            //showing danger notification
            setShowNotif({
                mode: "notif-visible",
                type: danger,
                message: "Server is currently down! Contact admin to fix this."
            });

            //hiding danger notificatioin
            setTimeout(() => {
                setShowNotif({})
            }, 20000);
        }
    })

    //useNavigate Hook
    const navigate = useNavigate();


    const handleLogOut = async () => {
        // showing spinner
        setSpin(true);
        try {
            const data = await axios.get("/user/logout");
            console.log(data);
            navigate("/");
            // showing spinner
            setSpin(false);

            props.reRender();
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
                <div className="container">
                    <NavLink to="/" className="navbar-brand" >Code X</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to='/' activeClassName="active" className="nav-link" aria-current="page">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/playground' activeClassName="active" className="nav-link">Playground</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/none2' activeClassName="active" className="nav-link" >Contact Us</NavLink>
                            </li>
                            <li className="nav-item">
                                {/* <NavLink to='/signin' activeClassName="active" className="nav-link" >Sign in</NavLink> */}
                            </li>

                            {
                                (props.name == "")
                                    ?
                                    <li className="nav-item">
                                        <NavLink to='/signin' activeClassName="active" className="nav-link" >Sign in</NavLink>
                                    </li>
                                    :

                                    <div className="nav-item dropdown upper-div">
                                        <div className="nav-link user " role="button" data-bs-toggle="dropdown" aria-expanded="false" >
                                            {props.name[0].toUpperCase()}
                                        </div>
                                        <ul className="dropdown-menu" style={{
                                            right: "-80px",
                                            left: "auto",
                                            marginTop: "10px",
                                            padding: "0"
                                        }}>
                                            <li><span className='dropdown-item' type='button'>{props.name}</span></li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li type='button' style={{
                                                // height: "100px"
                                            }} ><span className='logout dropdown-item fw-bold h4' onClick={handleLogOut} >Log out</span></li>
                                        </ul>
                                    </div>

                            }




                        </ul>

                    </div>
                </div>
            </nav>
            {/* Loading Spinner */}
            <LoadingSpinner show={spin} />

            {/* Signup Successfull Notifier */}
            <div id="notif" className={showNotif.mode}><img className='mx-2' src={showNotif.type}></img>{showNotif.message}</div>
        </>
    )
}

export default Header