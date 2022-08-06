import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom'
import axios from "axios";
import App from "./App";

import './index.css'

axios.defaults.baseURL = "http://localhost:8000";
// axios.defaults.baseURL = "https://orange-rooms-sip-42-109-222-16.loca.lt";
axios.defaults.withCredentials = true;


ReactDOM.render(
    <BrowserRouter forceRefresh={true}>
        <App />
    </BrowserRouter>,
    document.getElementById('root'));