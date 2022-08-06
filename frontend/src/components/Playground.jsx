import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import AceEditor from 'react-ace';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import LoadingSpinner from './mini/LoadingSpinner';
import './Playground.css'

import danger from './images/danger.png';


// Import a Mode (language)
import 'brace/mode/java';
import 'brace/mode/c_cpp';
import 'brace/mode/python';
import 'brace/mode/php';
import 'brace/mode/golang'
import 'brace/mode/javascript';

//language tool for snippet suggestion
import 'brace/ext/language_tools'

// Import a Theme (okadia, github, xcode etc)
import 'brace/theme/monokai';
import 'brace/theme/github';
import 'brace/theme/tomorrow';
import 'brace/theme/kuroir';
import 'brace/theme/twilight';
import 'brace/theme/xcode';
import 'brace/theme/textmate';
import 'brace/theme/solarized_dark';
import 'brace/theme/solarized_light';
import 'brace/theme/dracula';
import 'brace/theme/eclipse';
import 'brace/theme/vibrant_ink';
import 'brace/theme/terminal';



const Playground = (props) => {

    //useEffect Hook

    //useEffect Hook for getting user settings
    useEffect(() => { getSettings() }, []);

    // notif hook *********************
    const [showNotif, setShowNotif] = useState({
        mode: "", type: "", message: ""
    });

    //UseState Hook for language
    const [lang, setLang] = useState('c_cpp');

    //UseState Hook for Theme
    const [theme, setTheme] = useState('eclipse');

    //UseState Hook for font size
    const [fontSize, setFontSize] = useState(15);

    //UseState Hook for tab size
    const [tabSize, setTabSize] = useState(4);

    //UseState Hook for code data
    const [code, setCode] = useState("");

    //UseState Hook for std input data
    const [input, setInput] = useState("");

    //UseState Hook for console
    const [output, setOutput] = useState("Output : \n");

    //Hook for Settings Modal show/hide
    const [isOpen, setIsOpen] = useState(false);

    //Hook for Input Modal show/hide
    const [modalShow, setModalShow] = useState(false);

    //UseState Hook for loading screen
    const [spin, setSpin] = useState(false);


    //One additional hook for just c and c++ issue of same mode c_cpp
    const [cLang, setCLang] = useState("c");

    //useNavigate Hook
    const navigate = useNavigate();

    const showModal = () => {
        setIsOpen(true);
    };

    const hideModal = () => {
        setIsOpen(false);
    };

    const changeLanguage = e => {
        if (e.target.value === "c" || e.target.value === "cpp") {
            setCLang(e.target.value);
            setLang("c_cpp");
        }
        else {
            setCLang("");
            setLang(e.target.value);
        }

        syncSettings(e, "language");
    };

    const changeTheme = e => {
        setTheme(e.target.value);
        syncSettings(e, "theme")
    };

    const changeFontSize = e => {
        setFontSize(Number(e.target.value));
        syncSettings(e, "fontsize");
    };

    const changeTabSize = e => {
        setTabSize(Number(e.target.value));
        syncSettings(e, "tabsize");
    };

    const changeCode = value => setCode(value);

    const changeInput = value => setInput(value);

    const changeOutput = value => setOutput(value);




    //get settings
    const getSettings = async () => {
        try {
            const settingsAPI = "/user/settings";

            const res = await axios(settingsAPI);

            console.log(res);

            const userSettings = res.data;

            if (userSettings === "")
                return;

            if (userSettings.theme)
                setTheme(userSettings.theme);

            if (userSettings.fontsize)
                setFontSize(userSettings.fontsize);

            if (userSettings.tabSize)
                setTabSize(userSettings.tabsize);

            if (userSettings.language) {
                const userLang = userSettings.language;
                if (userLang === "c" || userLang === "cpp") {
                    setCLang(userLang);
                    setLang("c_cpp");
                } else {
                    setLang(userLang)
                }
            }

        } catch (error) {
            console.log(error);

            if (error.response.status === 401) {
                navigate('/');
                props.reRender();
            }
        }
    }



    //function for settings update
    const syncSettings = async (e, type) => {
        try {
            const setting = e.target.value;

            let settingObj;

            switch (type) {
                case "language": settingObj = { language: setting };
                    break;
                case "theme": settingObj = { theme: setting };
                    break;
                case "fontsize": settingObj = { fontsize: setting };
                    break;
                case "tabsize": settingObj = { tabsize: setting };
                    break;
                default: break;
            }

            const settingsUpdateAPI = "/user/settings/update";
            await axios.post(settingsUpdateAPI, settingObj);

        } catch (error) {
            console.log(error);

            console.log(error);

            if (error.response.status === 401) {
                navigate('/');
                props.reRender();
            }
        }

    }



    //Function for Compile API call
    const handleCodeSubmit = async () => {
        //closing the input modal
        setModalShow(false);

        //showing spinner
        setSpin(true);

        //if code is empty
        if (code === undefined || code.trim() === "") {
            //showing  notif
            setShowNotif({
                mode: "notif-visible",
                type: danger,
                message: "Please type some code!"
            });

            //hiding notif
            setTimeout(() => {
                setShowNotif({})
            }, 7000);

            //hiding spinner
            setSpin(false);

            return;
        }


        let codeLang = lang;

        switch (lang) {
            case "c_cpp": codeLang = "cpp";
                break;
            case "python": codeLang = "py";
                break;
            case "javascript": codeLang = "js";
                break;
            case "golang": codeLang = "go";
                break;
            default: break;
        }


        try {
            const data = await axios.post("compiler", {
                language: codeLang,
                code: code,
                input: input
            });
            setOutput("Output : \n" + (data.data.output || data.data.error));
            console.log(data);
            setInput("")

        } catch (error) {
            console.log(error);

            if (error.response.status === 401) {
                navigate('/');
                props.reRender();
            }
        }

        //hiding spinner
        setSpin(false);
    }




    return (
        <>
            <div className="header d-flex align-items-center justify-content-center">
                <button class="btnn" onClick={() => setModalShow(true)} > Run </button>

                <div className='watermark mx-auto opacity-25'>
                    CodeX IDE
                </div>

                <div className="control-panel">
                    &nbsp; &nbsp;
                    <select id="languages" onChange={changeLanguage}>
                        <option selected={(cLang === "c") ? `selected` : ``} value="c">  C </option>
                        <option selected={(cLang === "cpp") ? `selected` : ``} value="cpp"> C++ </option>
                        <option selected={(lang === "java") ? `selected` : ``} value="java"> Java</option>
                        <option selected={(lang === "php") ? `selected` : ``} value="php"> PHP </option>
                        <option selected={(lang === "python") ? `selected` : ``} value="python"> Python </option>
                        <option selected={(lang === "javascript") ? `selected` : ``} value="javascript"> Javascript </option>
                        <option selected={(lang === "golang") ? `selected` : ``} value="golang"> Golang </option>
                    </select>
                </div>
                {/* Settings Modal Button */}
                <i className='settings ri-settings-3-fill h2 mt-2 mx-2' type='button' onClick={showModal}></i>
            </div>

            <AceEditor
                value={code}
                onChange={changeCode}
                mode={lang}
                theme={theme}
                fontSize={fontSize}
                width='100%'
                height='83.4vh'
                tabSize={tabSize}
                wrapEnabled={true}
                enableSnippets={true}
                placeholder="Code here"
                showPrintMargin={false}
                showGutter={true}
                // highlightActiveLine={true}
                name="UNIQUE_ID_OF_DIV"
                editorProps={{
                    $blockScrolling: true
                }}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    showLineNumbers: true,
                    copyWithEmptySelection: true,
                }}
            />

            <AceEditor
                value={output}
                onChange={changeOutput}
                mode=""
                theme="terminal"
                fontSize={16}
                readOnly={true}
                width='100%'
                height='25vh'
                showGutter={false}
                wrapEnabled={true}
                setOptions={{
                    showLineNumbers: true,
                    copyWithEmptySelection: true,
                    highlightActiveLine: false,
                }}
            />






            {/* *******
            *************** Modal for Settings
            ******* */}

            <Modal show={isOpen} onHide={hideModal}>
                <Modal.Header>
                    <Modal.Title><div className='d-flex pt-1'>
                        <i className='ri-settings-3-fill h3'></i><p className='h4 mx-2 mt-1'>Editor Settings</p>
                    </div>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div>
                        <div className="row modal-row" >
                            <div className='col-8' >
                                <p className='h5'>Theme</p>
                                <p style={{
                                    fontSize: "13px",
                                    marginTop: "-7px"
                                }}>Tired of the white background? Try different styles and syntax highlighting.</p>
                            </div>
                            <div className='col-4'>
                                <select id="themes" onChange={changeTheme} >

                                    <option selected={(theme === 'eclipse') ? `selected` : ``} value="eclipse"> Eclipse </option>
                                    <option selected={(theme === 'monokai') ? `selected` : ``} value="monokai"> Monokai </option>
                                    <option selected={(theme === 'dracula') ? `selected` : ``} value="dracula"> Dracula </option>
                                    <option selected={(theme === 'kuroir') ? `selected` : ``} value="kuroir"> Kuroir </option>
                                    <option selected={(theme === 'twilight') ? `selected` : ``} value="twilight"> Twilight </option>
                                    <option selected={(theme === 'textmate') ? `selected` : ``} value="textmate"> Textmate </option>
                                    <option selected={(theme === 'solarized_dark') ? `selected` : ``} value="solarized_dark"> Solarized dark </option>=
                                    <option selected={(theme === 'solarized_light') ? `selected` : ``} value="solarized_light"> Solarized light </option>=
                                    <option selected={(theme === 'vibrant_ink') ? `selected` : ``} value="vibrant_ink"> Vibrant ink </option>
                                    <option selected={(theme === 'terminal') ? `selected` : ``} value="terminal"> Terminal </option>
                                </select>
                            </div>
                        </div>
                        <div className="row modal-row">
                            <div className='col-8'><p className='h5'>Font size</p>
                                <p style={{
                                    fontSize: "13px",
                                    marginTop: "-7px"
                                }}>Choose your preferred font size for the code editor.</p>
                            </div>
                            <div className='col-4 '>
                                <select id="fontSize" onChange={changeFontSize}>
                                    <option selected={(fontSize === 12) ? `selected` : ``} value="12">  12px </option>
                                    <option selected={(fontSize === 12) ? `selected` : ``} value="13">  13px </option>
                                    <option selected={(fontSize === 14) ? `selected` : ``} value="14">  14px </option>
                                    <option selected={(fontSize === 15) ? `selected` : ``} value="15">  15px </option>
                                    <option selected={(fontSize === 16) ? `selected` : ``} value="16">  16px </option>
                                    <option selected={(fontSize === 17) ? `selected` : ``} value="17">  17px </option>
                                    <option selected={(fontSize === 18) ? `selected` : ``} value="18">  18px </option>
                                    <option selected={(fontSize === 19) ? `selected` : ``} value="19">  19px </option>
                                    <option selected={(fontSize === 20) ? `selected` : ``} value="20">  20px </option>
                                    ?`selected`:``
                                </select>
                            </div>
                        </div>
                        <div className="row modal-row mt-4 pt-2" >
                            <div className='col-8' >
                                <p className='h5'>Tab size</p>
                                <p style={{
                                    fontSize: "13px",
                                    marginTop: "-7px"
                                }}>Choose the width of a tab character.</p>
                            </div>
                            <div className='col-4'>
                                <select id="themes" onChange={changeTabSize}>
                                    <option selected={(tabSize === 2) ? `selected` : ``} value="2"> 2 spaces </option>
                                    <option selected={(tabSize === 4) ? `selected` : ``} value="4"> 4 spaces </option>
                                    <option selected={(tabSize === 8) ? `selected` : ``} value="8"> 8 spaces </option>

                                </select>
                            </div>
                        </div>
                    </div>
                </Modal.Body>

            </Modal>





            {/* *******
            *************** Modal for Input
            ******* */}


            <Modal show={modalShow} onHide={() => setModalShow(false)} className="stdinput" centered>
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter"><div className='d-flex pt-1'>
                        <i class="ri-terminal-box-fill h3 mt-1"></i><p className='h4 mx-2 mt-1'>std input</p>
                    </div>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div>
                        <AceEditor
                            value={input}
                            onChange={changeInput}
                            mode=""
                            theme="terminal"
                            fontSize={15}
                            width='100%'
                            height='280px'
                            showGutter={false}
                            wrapEnabled={true}
                            setOptions={{
                                showLineNumbers: true,
                                copyWithEmptySelection: true,
                                highlightActiveLine: false,
                            }}
                        />

                    </div>
                </Modal.Body>
                <Modal.Footer style={{
                    paddingBottom: "0"
                }}>
                    <Button
                        style={{
                            marginTop: "-8px",
                            borderRadius: "5px",
                            backgroundColor: "#002D62",

                        }}
                        onClick={handleCodeSubmit}
                    >Run</Button>
                </Modal.Footer>

            </Modal>



            {/* Signup dangerfull Notifier */}
            <div id="notif" className={showNotif.mode}><img className='mx-2' src={showNotif.type}></img>{showNotif.message}</div>

            {/* Loading Spinner */}
            <LoadingSpinner show={spin} />

        </>
    )
}

export default Playground