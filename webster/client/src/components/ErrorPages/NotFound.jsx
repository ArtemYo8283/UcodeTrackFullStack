import React from 'react'
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ErrorBox, ErrorBoxLight, ErrorButton, ErrorButtonLight } from '../../styles/ErrorPagesStyles';
export const NotFound = () => {
    const navigate = useNavigate();
    return (
        <>
        {
            localStorage.getItem('themeMode') === 'dark' ?
            <ErrorBox>
            <Typography variant="h1">
                404
            </Typography>
            <Typography variant="h6">
                The page you’re looking for doesn’t exist.
            </Typography>
            <ErrorButton variant="contained" onClick={() => navigate(-1)}>Go back</ErrorButton>
            </ErrorBox>
            :
            <ErrorBoxLight>
            <Typography variant="h1">
                404
            </Typography>
            <Typography variant="h6">
                The page you’re looking for doesn’t exist.
            </Typography>
            <ErrorButtonLight variant="contained" onClick={() => navigate(-1)}>Go back</ErrorButtonLight>
            </ErrorBoxLight>
        }
        </>
    )
}
