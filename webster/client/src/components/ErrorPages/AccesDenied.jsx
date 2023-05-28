import { Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ButtonDiv } from '../../styles/MainPageStyle';
import { ErrorBox, ErrorBoxLight, ErrorButton, ErrorButtonLight } from '../../styles/ErrorPagesStyles';

export const AccesDenied = () => {
    const navigate = useNavigate();

    return (
        <>
        {
            localStorage.getItem('themeMode') === 'dark' ?
        <ErrorBox>
        <Typography variant="h1">
            403
        </Typography>
        <Typography variant="h6">
        Access denied. It looks like you are trying to perform an action without the appropriate access. 
        Contact support if this is an error.
        </Typography>
        <ButtonDiv>
            <ErrorButton variant="contained" onClick={() => navigate(-1)}>Go back</ErrorButton>
            <ErrorButton variant="contained" href='https://t.me/kossyaak'>Contact Support</ErrorButton>
        </ButtonDiv>
    </ErrorBox>
    :
    <ErrorBoxLight>
    <Typography variant="h1" >
        403
    </Typography>
    <Typography variant="h6">
    Access denied. It looks like you are trying to perform an action without the appropriate access. 
    Contact support if this is an error.
    </Typography>
    <ButtonDiv>
        <ErrorButtonLight variant="contained" onClick={() => navigate(-1)}>Go back</ErrorButtonLight>
        <ErrorButtonLight variant="contained" href='https://t.me/kossyaak'>Contact Support</ErrorButtonLight>
    </ButtonDiv>
</ErrorBoxLight>
    }
    </>
    )
}
