import {styled} from '@mui/system'
import {Link, Button, Toolbar, Drawer, CircularProgress, IconButton, Avatar} from '@mui/material';

const MainHeader = styled('div')({
    "&.Dark": {
        color: 'white',
        backgroundColor: '#101010',
    },
    "&.Light": {
        color: 'black',
        backgroundColor: '#f2f3f4',
    },

    padding: 3,
    width: "100%",
    position: 'fixed',
    overflow: "hidden",
    zIndex: "999",
    text: 'right'
    
    // position: 'fixed',
    // padding: 3,
    // width: "100%",
    // overflow: "hidden",
    // zIndex: "999",
    // text: 'right',
    // height: "50px",
    // flex: "0 0 auto",
});


const MenuButton = styled(Button)({
    padding: '10px',
});

const MainButtons = styled('div')({
    // position: 'relative',
    // left: 'calc(100% - 276px)'
});

const ToolbarStyled = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between"

})

const Logo = styled('span')({
    position:'absolute',
    marginLeft: '10px'
});

const LogOutBtn = styled(Button)({
    "& .Dark": {
        color: 'white',
        border: '0px black',
    },
    "& .Light": {
        color: 'black',
        border: '0px black',
    },
    outline: 'none',
    margin: 0,
    color: "inherit",
    textDecoration: "none",
});

const UpdProfBtn = styled(Button)({
    "& .Dark": {
        color: 'white',
        border: '0px black',
    },
    "& .Light": {
        color: 'black',
        border: '0px black',
    },
    outline: 'none',
    margin: 0,
    color: "inherit",
    textDecoration: "none",
});

const MyPrjBtn = styled(Button)({
    "& .Dark": {
        color: 'white',
        border: '0px black',
    },
    "& .Light": {
        color: 'black',
        border: '0px black',
    },
    outline: 'none',
    marginLeft: '10px',
    color: "inherit",
    textDecoration: "none",
});

const UserInfo = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '5px',
});

const DrawerEl = styled(Drawer)({
    '& MuiDrawer-paper': {   
        backgroundColor: "#000000",
        padding: '10px'
    },
});

const ManageAccountButton = styled(IconButton)({
    marginLeft: '5px'
})
const Spinner = styled(CircularProgress)({
    color: "white"
})

const SpanUserInfo = styled('span')({
    display:'flex',
    alignItems: 'center',
    flexDirection: 'column',
});

const AvatarEl = styled(Avatar)({
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
});

const DivThemeMode = styled('div')({
    display:'flex',
    flexDirection: 'row',
    alignItems: 'center'
});

const LinkButton = styled(Link)({
    color: "inherit",
    textDecoration: "none",
});

export {LinkButton, DivThemeMode, SpanUserInfo, AvatarEl , MainHeader, MenuButton, MainButtons, Logo, ToolbarStyled, LogOutBtn, UpdProfBtn, MyPrjBtn, UserInfo, DrawerEl, Spinner, ManageAccountButton}