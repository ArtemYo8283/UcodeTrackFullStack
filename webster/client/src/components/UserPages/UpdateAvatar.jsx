import React, { useEffect, useRef, useState } from 'react'
import { Body, BoxEl, ButtonEl, ErrWarning } from '../../styles/RegisterStyle';
// import { FileInput } from '../../styles/SettingsStyles';
import Avatar from "react-avatar-edit";
import { CircularProgress, Grid } from '@mui/material';
import axios from '../../api/axios';
import { DialogWindow } from '../Other/DialogWIndow';
export const UpdateAvatar = () => {
  const currentUser = JSON.parse(localStorage.getItem('autorized'));
  const errRef = useRef();

  const [prewiew, setPrewiew] = useState(null);
  const [file, setFile] = useState();
  const [uploadFile, setUploadFile] = useState();
  const [errMsg, setErrMsg] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [stateDialog, setStateDialog] = useState(false);

  const setHidden = () => {
    setTimeout(() => setErrMsg(''), 5000);
  }
  const dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });

  }
  useEffect(() => {
    console.log(prewiew)
    if (prewiew) {
      setUploadFile(dataURLtoFile(prewiew ? prewiew : "", `${currentUser.login}_avatar.png`));
    }
  }, [prewiew])
  const addImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", uploadFile);
    console.log(formData);
    try {
      setLoading(true);
      const response = await axios.patch(`/api/users/avatar/${currentUser.userId}/${currentUser.accessToken}`, formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true
        }

      )
      console.log(response);

      setLoading(false);
      setStateDialog(true);
    }
    catch (err) {
      setLoading(false);
      console.log(err);
      setErrMsg('Error')
      setHidden();

      errRef.current.focus();
    }


  }
  const onClose = () => {
    setPrewiew(null);
  }
  const onCrop = (preview) => {
    setPrewiew(preview)

  }
  const onBeforeFileLoad = (elem) => {

    if (elem.target.files[0].size > 716800) {
      setErrMsg('File too lagre')
      elem.target.value = "";
    };
  }
  return (
    <>
      <DialogWindow
        state={stateDialog}
        message={'Your avatar updated'}
      />
      <BoxEl component="form"
        noValidate
        autoComplete="off"
        onSubmit={addImage}
      >
        <h3>Update Avatar</h3>
        <ErrWarning ref={errRef} className={errMsg ? "warning" : "offscreen"} aria-live="assertive">{errMsg}</ErrWarning>
        <Grid
          container
          spacing={10}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <Avatar
              width={390}
              height={295}
              onCrop={onCrop}
              onClose={onClose}
              onBeforeFileLoad={onBeforeFileLoad}
              src={file}
            />
          </Grid>
          <Grid item>
            {prewiew && <img src={prewiew} alt="Preview" />}
          </Grid>
        </Grid>
        <ButtonEl className={localStorage.getItem('themeMode') === 'dark' ? 'Dark' : 'Light'} type="submit" variant="contained">
          {
            isLoading ? <CircularProgress size={24} /> :
              <p>Update Avatar</p>
          }
        </ButtonEl>
      </BoxEl>
    </>
  )
}