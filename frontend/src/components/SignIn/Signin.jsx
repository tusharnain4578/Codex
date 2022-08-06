import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import './Signin.css'
import signinLog from '../images/signin-log.svg'
import signinReg from '../images/signin-reg.svg'
import success from '../images/success.png'
import danger from '../images/danger.png'

//Loading Spinner
import LoadingSpinner from '../mini/LoadingSpinner'





const Signin = (props) => {

    //useNavigate
    const navigate = useNavigate();

    // utility function -> startsWith ---------------------------
    const startsWith = (str, word) => (str.lastIndexOf(word, 0) === 0)
    //-----------------------------------------------------------


    //UseState Hook for loading screen
    const [spin, setSpin] = useState(false);


    //For switching SignUp and Login UI *********************
    const [signupMode, setSignupMode] = useState('');

    // notif hook *********************
    const [showNotif, setShowNotif] = useState({
        mode: "", type: "", message: ""
    });

    //handle functions
    const handleSignupMode = () => {
        setSignupMode('sign-up-mode');
    }

    const handleLoginMode = () => {
        setSignupMode('');
    }



    //************************************************************************************
    //Logic for Signup Compnent and data ******************************************

    //useState Hook For Signup Input Data 
    const signupUserInitialState = { name: "", email: "", password: "", cpassword: "" }
    const [signupUser, setSignupUser] = useState(signupUserInitialState)

    //useState Hook For Signup error messages
    const [signupError, setSignupError] = useState("");



    //Handle function
    const handleSignupData = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setSignupUser({ ...signupUser, [name]: value });
    }

    // Function of Signup Submit
    const handleSignupSubmit = async (e) => {
        e.preventDefault();

        // showing spinner
        setSpin(true);

        const signupApi = "/user/register";
        try {

            await axios.post(signupApi, signupUser)

            // hiding spinner
            setSpin(false);

            //opening login section
            setSignupMode('');

            //showing success notif
            setShowNotif({
                mode: "notif-visible",
                type: success,
                message: "Account created successfully! Now you can log in!"
            });

            //making all signup input fields empty
            setSignupUser(signupUserInitialState);

            setTimeout(() => {
                setShowNotif({})
            }, 7000);

        } catch (error) {

            // hiding spinner
            setSpin(false);

            let currentError = error.response.data.message;

            // if (startsWith(currentError, `"Confirm password"`))
            //     currentError = `"Confirm password" and "Password" are not matching`;

            if (error.response.status === 500) {
                //showing internal server error notif
                setShowNotif({
                    mode: "notif-visible",
                    type: danger,
                    message: "Something went wrong!"
                });

                setTimeout(() => {
                    setShowNotif({})
                }, 6000);

                return;
            }

            //setting SignupError for display under input field
            setSignupError(currentError);

            setTimeout(() => {
                setSignupError('');
            }, 12000);
        }
    }



    // ******************************************




    //************************************************************************************
    //Logic for Login Compnent and data ******************************************

    //useState Hook For Loginup Input Data 
    const [loginUser, setLoginUser] = useState({
        email: "",
        password: ""
    })

    //useState Hook For Login error messages
    const [loginError, setLoginError] = useState("");

    //Handle function
    const handleLoginData = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setLoginUser({ ...loginUser, [name]: value });
    }


    // Function of Login Submit
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setSpin(true);
        try {

            const loginApi = "/user/login";
            const res = await axios.post(loginApi, loginUser)

            // hiding spinner
            setSpin(false);

            console.log(res);
            props.reRender()
            navigate('/');

        } catch (error) {

            // hiding spinner
            setSpin(false);

            let currentError = error.response.data.message;
            console.log(currentError);
            // if (startsWith(currentError, `"Confirm password"`))
            //     currentError = `"Confirm password" and "Password" are not matching`;

            if (error.response.status === 500) {
                //showing internal server error notif
                setShowNotif({
                    mode: "notif-visible",
                    type: danger,
                    message: "Something went wrong!"
                });

                setTimeout(() => {
                    setShowNotif({})
                }, 6000);

                return;
            }

            //setting SignupError for display under input field
            setLoginError(currentError);

            setTimeout(() => {
                setLoginError('');
            }, 12000);
        }
    }




    // ******************************************

    return (
        <>
            <div className={`signin-container ${signupMode}`} style={{ height: "100%", overflow: "hidden" }}>
                <div className="forms-container">
                    <div className="signin-signup">
                        {/* Login */}
                        <form action="POST" className="sign-in-form" onSubmit={handleLoginSubmit}>
                            <h2 className="title">Log in</h2>
                            <div className="input-field">
                                <i className="ri-mail-fill pt-1"></i>
                                <input type="text" name='email' value={loginUser.email} onChange={handleLoginData} placeholder="Email" required />
                            </div>
                            {startsWith(loginError, `"Email"`) && <div className="error-message "><i class="ri-error-warning-fill text-danger h6"></i>{loginError}</div>}
                            <div className="input-field">
                                <i className="ri-lock-fill pt-1"></i>
                                <input type="password" name='password' value={loginUser.password} onChange={handleLoginData} placeholder="Password" required />
                            </div>
                            {(startsWith(loginError, `"Password"`) || startsWith(loginError, `Invalid`)) && <div className="error-message "><i class="ri-error-warning-fill text-danger h6"></i>{loginError}</div>}
                            <button type="submit" className="bbtn solid" >Log in</button>
                            <p className="social-text">Or Log in with social platforms</p>
                            <div className="social-media">
                                <a href="#" className="social-icon">
                                    <i className="ri-facebook-fill"></i>
                                </a>
                                <a href="#" className="social-icon">
                                    <i className="ri-twitter-fill"></i>
                                </a>
                                <a href="#" className="social-icon">
                                    <i className="ri-google-fill"></i>
                                </a>
                                <a href="#" className="social-icon">
                                    <i className="ri-linkedin-fill"></i>
                                </a>
                            </div>
                        </form>

                        {/* Signup */}
                        <form action="POST" className="sign-up-form" onSubmit={handleSignupSubmit}>
                            <h2 className="title">Sign up</h2>
                            <div className="input-field">
                                <i className="ri-user-fill pt-1"></i>
                                <input type="text" name='name' value={signupUser.name} onChange={handleSignupData} placeholder="Name" required />
                            </div>
                            {startsWith(signupError, `"Name"`) && <div className="error-message "><i class="ri-error-warning-fill text-danger h6"></i>{signupError}</div>}

                            <div className="input-field">
                                <i className="ri-mail-fill pt-1"></i>
                                <input type="email" name='email' value={signupUser.email} onChange={handleSignupData} placeholder="Email" required />
                            </div>
                            {startsWith(signupError, `"Email"`) && <div className="error-message"><i class="ri-error-warning-fill text-danger h6"></i>{signupError}</div>}
                            <div className="input-field">
                                <i className="ri-lock-fill pt-1"></i>
                                <input type="password" name='password' value={signupUser.password} onChange={handleSignupData} placeholder="Password" required />
                            </div>
                            {startsWith(signupError, `"Password"`) && <div className="error-message"><i class="ri-error-warning-fill text-danger h6"></i>{signupError}</div>}
                            <div className="input-field">
                                <i className="ri-lock-password-fill pt-1"></i>
                                <input type="password" name='cpassword' value={signupUser.cpassword} onChange={handleSignupData} placeholder="Confirm Password" required />
                            </div>
                            {startsWith(signupError, `"Passwords"`) && <div className="error-message"><i class="ri-error-warning-fill text-danger h6"></i>{signupError}</div>}
                            <button type="submit" className="bbtn solid" >Sign up</button>
                            <p className="social-text">Or Sign up with social platforms</p>
                            <div className="social-media">
                                <a href="#" className="social-icon">
                                    <i className="ri-facebook-fill"></i>
                                </a>
                                <a href="#" className="social-icon">
                                    <i className="ri-twitter-fill"></i>
                                </a>
                                <a href="#" className="social-icon">
                                    <i className="ri-google-fill"></i>
                                </a>
                                <a href="#" className="social-icon">
                                    <i className="ri-linkedin-fill"></i>
                                </a>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="panels-container">
                    <div className="panel left-panel">
                        <div className="content" >
                            <h3>New here ?</h3>
                            <p>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
                                ex ratione. Aliquid!
                            </p>
                            <button className="btn transparent" id="sign-up-btn" onClick={handleSignupMode}>
                                Sign up
                            </button>
                        </div>
                        <img src={signinLog} className="image" alt="" />
                    </div>
                    <div className="panel right-panel">
                        <div className="content">
                            <h3>One of us ?</h3>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                                laboriosam ad deleniti.
                            </p>
                            <button className="btn transparent" id="sign-in-btn" onClick={handleLoginMode}>
                                Sign in
                            </button>
                        </div>
                        <img src={signinReg} className="image" alt="" />
                    </div>
                </div>
            </div>
            {/* Signup Successfull Notifier */}
            <div id="notif" className={showNotif.mode}><img className='mx-2' src={showNotif.type}></img>{showNotif.message}</div>


            {/* Loading Spinner */}
            <LoadingSpinner show={spin} />
        </>
    )
}

export default Signin;