import { styled } from '@mui/system';
import { Box, Button } from '@mui/material';

const ErrorBox = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    color: 'white'
})

const ErrorBoxLight = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    color: 'black'
})

const ErrorButton = styled(Button)({
    backgroundColor: '#171717',
    margin: '15px',
    color: 'white',
}) 

const ErrorButtonLight = styled(Button)({
    backgroundColor: 'white',
    color: 'black',
    margin: '15px'
}) 

export {ErrorBox, ErrorBoxLight, ErrorButton, ErrorButtonLight}