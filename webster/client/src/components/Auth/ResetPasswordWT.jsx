import React, {  useRef, useState, useEffect  } from 'react';
import {Body, BoxEl, TextFieldEl, ButtonEl, ErrWarning} from '../../styles/RegisterStyle'
import axios from '../../api/axios';
import { CircularProgress } from '@mui/material';
import {RESET_PASSWORD_WT_URL} from '../../api/routes'
import { useParams,useNavigate } from "react-router-dom";
// import useAuth from "../../hooks/useAuth";
import {DialogWindow} from '../Other/DialogWIndow'
import {PWD_REGEX} from '../../regex/regex'

const ResetPasswordWT = () => {
    const {token} = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const errRef = useRef();
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate(); 
    // const { setAuth } = useAuth();
    const [submitClicked, setSubmitClicked] = useState(false);
    // const [stateDialog, setStateDialog] = useState(false);

    const resetPassword = async (e) =>{
        e.preventDefault();
        setErrMsg('');
        setSubmitClicked(true)
        if (PWD_REGEX.test(password) && PWD_REGEX.test(confirmPassword)) {

        try {
            setLoading(true);
            console.log(token)
            const response = await axios.post(RESET_PASSWORD_WT_URL + token,
                JSON.stringify({password: password, confirmPassword: confirmPassword}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response?.data.status, response?.data.values.message);
            setLoading(false);
            setSuccess(true);
            setTimeout(()=> navigate('/login'), 5000);
        }
        catch (err) {
            setLoading(false);
            if (!err?.response) {
                setErrMsg('Сервер спить, вибачте');
            }
            else {
                setErrMsg('Шось не так. Схоже що час для відновлення паролю сплив. Спробуйте ще раз');
                // setTimeout(()=> navigate('/reset-password'), 5000);
            }
            errRef.current.focus();
        }
    }
    }
    return (
        <Body className={localStorage.getItem('themeMode') === 'dark' ? "Dark" : "Light"}>
            <DialogWindow
            state={success}
            message={'Password changed'}
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
                        label="Password"
                        variant="standard"
                        type="password"
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        error={PWD_REGEX.test(password) === false && submitClicked === true}
                        helperText={PWD_REGEX.test(password) === false && submitClicked === true ? 'Password must be not less than 8 symbols, including: digits, capital letter and at least one special symbol' : ' '}
                    />
                    <TextFieldEl
                        className={localStorage.getItem('themeMode') === 'dark' ? "Dark" : "Light"}
                        label="Confirm Password"
                        variant="standard"
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        error={PWD_REGEX.test(confirmPassword) === false && submitClicked === true}
                        helperText={PWD_REGEX.test(confirmPassword) === false && submitClicked === true ? 'Confirm Password must be same like field above' : ' '}
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

export default ResetPasswordWT;
