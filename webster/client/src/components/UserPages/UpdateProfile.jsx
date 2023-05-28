import { CircularProgress } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { GET_USER_BY_ID_URL, UPDATE_PROFILE_DATA_URL } from '../../api/routes';
import { EMAIL_REGEX, FULLNAME_REGEX, USER_REGEX } from '../../regex/regex';
import { Body, BoxEl, ButtonEl, ErrWarning, TextFieldEl } from '../../styles/RegisterStyle';
import { DialogWindow } from '../Other/DialogWIndow';
import { InfoLoadingSpinner } from '../Other/InfoLoadingSpinner';
import { UpdateAvatar } from './UpdateAvatar';

export const UpdateProfile = () => {
  const currentUser = JSON.parse(localStorage.getItem('autorized'));
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const errRef = useRef();
  const [isLoading, setLoading] = useState(false);
  const [stateDialog, setStateDialog] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [submitClicked, setSubmitClicked] = useState(false);
  const getUserInfo = async () => {
    try {
      setIsLoadingPage(true);
      if (currentUser?.currentUser !== 'guest') {
        const response = await axios.get(`${GET_USER_BY_ID_URL}/${currentUser.userId}`);
        // console.log(response);
        setLogin(response.data.values.values.login);
        setFullName(response.data.values.values.full_name);
        setEmail(response.data.values.values.email);
        setIsLoadingPage(false);
      }
      
    }
    catch (e) {
      console.log(e)
      navigate('/500');
    }
  }
  useEffect(() => {
    if (currentUser?.currentUser !== 'guest') {
      getUserInfo();
    }
  }, []);

  const setHidden = () => {
    setTimeout(() => setErrMsg(''), 5000);
}
  const handleSubmit = async (e) => {
    setSubmitClicked(true)
    setErrMsg('');
    e.preventDefault();
    if (FULLNAME_REGEX.test(fullName) && EMAIL_REGEX.test(email) && USER_REGEX.test(login)) {
      try {
        setLoading(true);
        console.log(login, email, fullName);
        const response = await axios.patch(`${UPDATE_PROFILE_DATA_URL}${currentUser.userId}/${currentUser.accessToken}`,
          JSON.stringify({ login: login, email: email, full_name: fullName }),
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
          }
        );
        console.log(response);
        setLoading(false);
        localStorage.setItem('autorized', JSON.stringify({ accessToken: currentUser.accessToken, role: currentUser.role, login: login, userId: currentUser.userId }))
        setStateDialog(true);
      }
      catch (err) {
        setLoading(false);
        console.log(err)
        if (err?.response.status === 409) {
          setErrMsg('Такий логін або емейл існує');
          setHidden();
      }
      else if (err?.response.status === 404) {
          navigate('/404');
      }
      else if(err?.response.status === 400){
        setErrMsg('Неправильний формат логіну, повного ім\'я або пошти')
      }
      else {
          navigate('/500')
      }
        errRef.current.focus();
      }
    }
  }
  return isLoadingPage ? <InfoLoadingSpinner size={56} /> : (
    <Body>
      <UpdateAvatar/>
      <DialogWindow
        state={stateDialog}
        message={'Profile data updated succefully'}
      />

      <BoxEl
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <h3>Update Profile</h3>
        <ErrWarning ref={errRef} className={errMsg ? "warning" : "offscreen"} aria-live="assertive">{errMsg}</ErrWarning>
        <TextFieldEl
          label="Full Name"
          variant="standard"
          required
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          error={FULLNAME_REGEX.test(fullName) === false && submitClicked === true}
          helperText={FULLNAME_REGEX.test(fullName) === false && submitClicked === true ? 'Full Name must be not less than 2 symbols and not more than 23 symbols' : ' '}
        />
        <TextFieldEl
          label="Login"
          variant="standard"
          required
          value={login}
          onChange={e => setLogin(e.target.value)}
          error={USER_REGEX.test(login) === false && submitClicked === true}
          helperText={USER_REGEX.test(login) === false && submitClicked === true ? 'Login must be not less than 4 symbols and not more than 24 symbols' : ' '}
        />
        <TextFieldEl
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
          <ButtonEl className={localStorage.getItem('themeMode') === 'dark' ? 'Dark' : 'Light'}  type="submit" variant="contained">
            {
              isLoading ? <CircularProgress size={24} /> :
                <p>Update profile</p>
            }

          </ButtonEl>
        </div>

      </BoxEl>
    </Body>
  )
}