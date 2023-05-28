import { Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ButtonDiv } from '../../styles/MainPageStyle';
import { ErrorBox, ErrorBoxLight, ErrorButton, ErrorButtonLight } from '../../styles/ErrorPagesStyles';

export const ServerError = () => {
    const navigate = useNavigate();

    return (
        <>
        {
            localStorage.getItem('themeMode') === 'dark' ?
        <ErrorBox>
        <Typography variant="h1">
            500
        </Typography>
        <Typography variant="h6">
        Internal Server Error. If this error occurs again, contact support.
        </Typography>
        <ButtonDiv>
            <ErrorButton variant="contained" onClick={() => navigate(-1)}>Go back</ErrorButton>
            <ErrorButton variant="contained" href='https://t.me/kossyaak'>Contact Support</ErrorButton>
        </ButtonDiv>
    </ErrorBox>
    :
    <ErrorBoxLight>
    <Typography variant="h1" >
        500
    </Typography>
    <Typography variant="h6">
    Internal Server Error. If this error occurs again, contact support.
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

