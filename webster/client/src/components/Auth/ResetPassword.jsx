import React, {  useRef, useState, useEffect  } from 'react';
import {Body, BoxEl, TextFieldEl, ButtonEl, ErrWarning} from '../../styles/RegisterStyle'
import axios from '../../api/axios';
import { CircularProgress } from '@mui/material';
import {RESET_PASSWORD_URL} from '../../api/routes'
// import { useNavigate } from "react-router-dom";
// import useAuth from "../../hooks/useAuth";
import {DialogWindow} from '../Other/DialogWIndow'
import {EMAIL_REGEX} from '../../regex/regex'

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [errMsg, setErrMsg] = useState('');
    // const [success, setSuccess] = useState(false);
    const errRef = useRef();
    const [isLoading, setLoading] = useState(false);
    // const navigate = useNavigate(); 
    // const { setAuth } = useAuth();
    const [submitClicked, setSubmitClicked] = useState(false);
    const [stateDialog, setStateDialog] = useState(false);

    const resetPassword = async (e) =>{
        setSubmitClicked(true)
        setErrMsg('');
        e.preventDefault();
        if (EMAIL_REGEX.test(email)) {
            try{
                setLoading(true);
                console.log(email)
                const response = await axios.post(RESET_PASSWORD_URL, 
                    JSON.stringify({email: email}),
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    }
                )
                console.log(response?.data.status, response?.data.values.message);
                // setSuccess(true);
                setLoading(false);
                setStateDialog(true)
            }
            catch(err){
                setLoading(false);
                if (!err?.response) {
                    setErrMsg('Server is busy');
                }
                else{
                    setErrMsg('Such email does not exist');
                }
                errRef.current.focus();
            }
        }
    }
    return (
        <Body className={localStorage.getItem('themeMode') === 'dark' ? "Dark" : "Light"}>
            <DialogWindow
            state={stateDialog}
            message={'The message was sent to your email, go to link and reset password!'}
            />
            <BoxEl
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={resetPassword}
            >
                <h3>Reset Password</h3>
                <ErrWarning ref={errRef} className={errMsg ? "warning" : "offscreen"} aria-live="assertive">{errMsg}</ErrWarning>
                    <TextFieldEl
                    className={localStorage.getItem('themeMode') === 'dark' ? "Dark" : "Light"}
                    label="Email"
                    variant="standard"
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    error={EMAIL_REGEX.test(email) === false && submitClicked === true}
                    helperText={EMAIL_REGEX.test(email) === false && submitClicked === true ? 'Email must be proper like: example@gmail.com ' : ' '}
                    />
                <div>
                <ButtonEl className={localStorage.getItem('themeMode') === 'dark' ? "Dark" : "Light"} type="submit" variant="contained" color="primary">
                {
                    isLoading ? <CircularProgress size={24}/> :
                    <p>Reset Password</p>
                }
                </ButtonEl>
                </div>
            </BoxEl>
        </Body>
    )
}

export default ResetPassword;
