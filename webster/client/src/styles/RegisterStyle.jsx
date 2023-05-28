import {styled} from '@mui/system'
import {Box, TextField, Button} from '@mui/material';

const BoxEl = styled(Box)({
    flexShrink: 1,
    padding: '30px',
    '& .MuiTextField-root': { m: 1, width: '35%' },
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
});

const ErrWarning = styled('p')({
    color: 'red',
    padding: '15px'
});


const Body = styled('div')({
    "& .Dark": {
        backgroundColor: '#131313',
        color: 'white',
    },
    "& .Light": {
        backgroundColor: 'white',
        color: 'black',
    },
    height:"100%"
});


const TextFieldEl = styled(TextField)({
    "& .Dark": {
        label: {color: 'white'},
        input: { color: 'white', margin: '3px' },
    },
    "& .Light": {
        label: {color: 'black'},
        input: { color: 'black', margin: '3px' },
    },
    margin: '10px'
});


const ButtonEl = styled(Button)({
    "&.Dark": {
        backgroundColor: '#171717',
        color:"white"
    },
    "&.Light": {
        backgroundColor: 'white',
        color:"black"
    },
    margin: '15px',
});


const SpanEl = styled('span')({
    "& .Dark": {
        color: 'white',
    },
    "& .Light": {
        color: 'black',
    },
    margin: '10px',
});


const GoogleSign = styled('div')({
    margin:"15px"
});



export {Body, BoxEl,TextFieldEl, ButtonEl, ErrWarning, SpanEl, GoogleSign}

