import {styled} from '@mui/system'
import {Button} from '@mui/material';


const Container = styled('div')({
    "& .Dark": {
        color: 'white',
        backgroundColor: "black",
        border: '2px solid white'
    },
    "& .Light": {
        color: 'black',
        backgroundColor: 'white',
        border: '2px solid black'
    },
    textAlign: 'center',
    display: "flex",
    alignItems: "center",
    justifyContent:"space-around",
});


const TextBlock = styled('div')({
    // position: 'absolute',
    // top: '8px',
    // left: '16px',
    width: '300px'
});

const TextDiv = styled('div')({
    // padding: '5px'
});

const ButtonDiv = styled('div')({
    // position: 'absolute',
    // top: '50%',
    // left: '75%',
    // transform: 'translate(-50%, -75%)',
});

const StartButton = styled(Button)({
    "& .Dark": {
        color: 'white',
        border: '2px solid white'
    },
    "& .Light": {
        color: 'black',
        border: '2px solid black'
    },
    width: '300px',
    height: '50px',
    letterSpacing: '1.2rem',
    fontSize: '2em',
});


export {Container, TextBlock, TextDiv, ButtonDiv, StartButton}
