import { Box, Card, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import {styled} from '@mui/system'
import { MuiColorInput } from 'mui-color-input';

const CreateBox = styled('div')({
    paddingLeft: '7%',
    paddingRight: '7%',
    paddingTop: '2%',
    height: '100%',
});
const Settings = styled('div')({
    display: "flex",
    width: '100%'
});
const TypographyBox = styled('div')({
    borderLeft: '6px solid',
    fontSize: '30px',
    paddingLeft: '1.5%'
});
const CustomToggleButtonGroup = styled(ToggleButtonGroup)({
    marginTop: '30px',
    zIndex: "1",
    marginBottom: "30px",
})
const CustomToggleButton = styled(ToggleButton)({

})

const FormatCard = styled(Card)({
    width: '250px',
    // minWidth: "200px",
    // maxWidth: "340px",
    padding: "15px",
    textAlign: "center",
    transition:  "0.4s ease-in-out",
    ":hover": {
        border: "1px solid",
        transition:  "0.4s ease-in-out"
    }
})

const FormatTitle = styled(Typography)({
    paddingTop: "30px",
    paddingBottom: "30px"
})
const SettingsForm = styled(Box)({
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    width: "26%",
    marginTop: "70px"
})
const UpdateForm = styled(Box)({
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    // width: "26%",
    // marginTop: "70px"
})

const ControlsBox = styled(Box)({
    margin: '10px'
})

const ColorPicker = styled(MuiColorInput)({
    "&.Dark": {
        label: {color: 'white'},
        input: { color: 'white', margin: '3px' },
    },
    "&.Light": {
        label: {color: 'black'},
        input: { color: 'black', margin: '3px' },
    },
    margin: '10px'
})
export {CreateBox, TypographyBox, ControlsBox, CustomToggleButton, CustomToggleButtonGroup, FormatCard, FormatTitle, Settings, SettingsForm, ColorPicker, UpdateForm}