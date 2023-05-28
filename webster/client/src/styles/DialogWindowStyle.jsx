import {Dialog, DialogTitle, IconButton} from '@mui/material';
import {styled} from '@mui/system'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),

    },
    '& .MuiDialogActions-root': {

      padding: theme.spacing(1),
    },
    '& .MuiPaper-root': {
      minWidth: "50%"
    }
  }));

  const DialogTitleEl = styled(DialogTitle)({

    m: 0,
    p: 2
  });

  const IconButtonEl = styled(IconButton)({
        position: 'absolute',
        right: 8,
        top: 8,
  });

  


  export {BootstrapDialog, DialogTitleEl, IconButtonEl}