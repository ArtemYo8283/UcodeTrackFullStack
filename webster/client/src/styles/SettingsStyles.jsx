import { styled } from '@mui/system'
import { MuiFileInput } from 'mui-file-input'

const FileInput = styled(MuiFileInput)({
    'MuiFileInput-placeholder': { color: '#FFFFFF' },
    label: {color: 'white'},
    input: { color: 'white', margin: '3px' },
    margin: '10px',
    borderRadius: "5px",
})

const FileInputLight = styled(MuiFileInput)({
    'MuiFileInput-placeholder': { color: 'black' },
    label: {color: 'black'},
    input: { color: 'black', margin: '3px' },
    margin: '10px',
    borderRadius: "5px",
})

export { FileInput, FileInputLight }