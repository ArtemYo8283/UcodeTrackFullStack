import {styled} from '@mui/system'

const H1El = styled('h1')({
    "& .Dark": {
        color:"white"
    },
    "& .Light": {
        color:"black"
    },
    textAlign: 'center'
});

const PEl = styled('p')({
    "& .Dark": {
        color:"white"
    },
    "& .Light": {
        color:"black"
    },
    textAlign: 'center'
});


export {H1El, PEl}
