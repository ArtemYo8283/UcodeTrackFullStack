import { Toolbar, Typography, IconButton, MenuItem, Link, Avatar, CircularProgress } from '@mui/material';
import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import WebsterLogoLight from '../../assets/Layout/LogoLight.png'
import WebsterLogoDark from '../../assets/Layout/LogoDark.png'
import {LinkButton, DivThemeMode, SpanUserInfo, AvatarEl , MainHeader, MenuButton, MainButtons, ToolbarStyled, UserInfo, DrawerEl, LogOutBtn, UpdProfBtn, MyPrjBtn, ManageAccountButton } from '../../styles/HeaderStyles'
import useAuth from '../../hooks/useAuth';
import axios from '../../api/axios';
import { useNavigate } from "react-router-dom";
import route from '../../api/route';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import { BoxEl } from '../../styles/RegisterStyle';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';

import {GoogleLogout} from 'react-google-login'
const clientId = "396282640648-nhgp1dh6eivlu5df4ip60j8ni00jke2e.apps.googleusercontent.com"

const headersData = [
  {
    label: "Sign In",
    href: "/login",
  },
  {
    label: "Sign Up",
    href: "/register",
  },
];

export const Header = () => {
  const [mode, setMode] = useState(localStorage.getItem('themeMode'));
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        }
        ,
      }),
    [mode],
  );

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
    settingsOpen: false
  });

  const handleSettingsClose = () =>
    setState((prevState) => ({ ...prevState, settingsOpen: false }));
  const handleSettingsOpen = () =>
    setState((prevState) => ({ ...prevState, settingsOpen: true }));
  const handleDrawerOpen = () =>
    setState((prevState) => ({ ...prevState, drawerOpen: true }));
  const handleDrawerClose = () =>
    setState((prevState) => ({ ...prevState, drawerOpen: false }));

  const { mobileView, drawerOpen, settingsOpen } = state;
  const { auth, setAuth } = useAuth();
  const currentUser = JSON.parse(localStorage.getItem('autorized'));
  const [userAvatar, setUserAvatar] = useState();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser?.currentUser !== 'guest') {
      if (auth) {
        // checkToken(currentUser.accessToken, setAuth);
        if (currentUser) {
          setAuth({ ...currentUser });
        } else {
          setAuth(false);
        }
      }
    }
  }, []);

  const getUserInfo = async () => {
    try {
      if (currentUser?.currentUser !== 'guest') {
        const response = await axios.get(`/api/users/${currentUser.userId}`);
        // console.log('userAvatar', response);
        setUserAvatar(response.data.values.values.profile_pic);
      }
    }
    catch (e) {
      console.log(e)
      navigate('/500');
    }
  }
  useEffect(() => {
    if (currentUser?.currentUser !== 'guest') {
      getUserInfo();
    }
  }, []);

  async function toLogOut() {
    localStorage.removeItem('autorized');
    setLoading(true);
    navigate('/');
    document.location.reload();
  }
  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  function toggleColorMode() {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    localStorage.getItem('themeMode') === 'light' ?
     localStorage.setItem('themeMode', 'dark') :
     localStorage.setItem('themeMode', 'light')
     window.location.reload(false)

  }

  const displayDesktop = () => {
    return (
      <ToolbarStyled>
        <div style={{display: 'flex', alignItems: "center"}}>
        {femmecubatorLogo}
        <MyPrjBtn className={localStorage.getItem('themeMode') === 'dark' ? "Dark" : "Light"} href='/user-projects'>Projects</MyPrjBtn> 
        </div>
        <DrawerEl {...{
          anchor: "right",
          open: settingsOpen,
          onClose: handleSettingsClose,
        }}>
          <BoxEl>
          <DivThemeMode>
          <p>{theme.palette.mode === 'dark' ? 'Night' : 'Day'}</p>
          <IconButton width = '30px' onClick={toggleColorMode}>
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          </DivThemeMode>
            <UpdProfBtn className={localStorage.getItem('themeMode') === 'dark' ? "Dark" : "Light"} href='update-profile'>Update Profile</UpdProfBtn> 
            {
              isLoading ? <CircularProgress size={24}/> :
                    <LogOutBtn className={localStorage.getItem('themeMode') === 'dark' ? "Dark" : "Light"} onClick={() => toLogOut()}>
                    Logout
                    <ExitToAppOutlinedIcon />
                  </LogOutBtn>
            }
          </BoxEl>
        </DrawerEl>
        <MainButtons>{getMenuButtons()}</MainButtons>
      </ToolbarStyled>
    );
  };

  const displayMobile = () => {
    return (
      <Toolbar>
        <IconButton
          {...{
            edge: "start",
            onClick: handleDrawerOpen,
          }}
        >
          <MenuOutlinedIcon  fontSize="large" />
        </IconButton>

        <DrawerEl
          {...{
            anchor: "left",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div>{getDrawerChoices()}</div>
        </DrawerEl>

        <DrawerEl {...{
          anchor: "right",
          open: settingsOpen,
          onClose: handleSettingsClose,
        }}>
          <SpanUserInfo>
         <DivThemeMode>
          <p>{theme.palette.mode === 'dark' ? 'Night' : 'Day'}</p>
          <IconButton width = '30px' onClick={toggleColorMode}>
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          </DivThemeMode>
          </SpanUserInfo>

          <LogOutBtn className={localStorage.getItem('themeMode') === 'dark' ? "Dark" : "Light"} href='update-profile'>Update Profile</LogOutBtn>
            {
              isLoading ? <LogOutBtn ><CircularProgress size={24} /></LogOutBtn> :
                <>
                  <LogOutBtn className={localStorage.getItem('themeMode') === 'dark' ? "Dark" : "Light"}  onClick={() => toLogOut()}>
                    Logout
                    <ExitToAppOutlinedIcon />
                  </LogOutBtn>
                </>
            }
        </DrawerEl>
        <div>{femmecubatorLogo}</div>
      </Toolbar>
    );
  };

  const getDrawerChoices = () => {
    if (currentUser?.currentUser === 'guest') {
        return (
          <>
          <SpanUserInfo>
          <DivThemeMode>
          <p>{theme.palette.mode === 'dark' ? 'Night' : 'Day'}</p>
          <IconButton width = '30px' onClick={toggleColorMode}>
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          </DivThemeMode>
          </SpanUserInfo>
          <LinkButton
            {...{
              component: RouterLink,
              to: '/login',
              key: 'Sign In',
            }}
          >
          <MenuItem >Sign In</MenuItem>
          </LinkButton>
          <LinkButton
            {...{
              component: RouterLink,
              to: '/register',
              key: 'Sign Up',
            }}
          >
          <MenuItem >Sign Up</MenuItem>
          </LinkButton>
          </>
        );
    }
    else {
      return (
        <>
        <UserInfo>
          <Typography>{currentUser?.login}</Typography>
          <AvatarEl src={userAvatar && userAvatar !== 'undefined' && userAvatar !== undefined ? `${route.serverURL}/avatars/${userAvatar}` : `${route.serverURL}/avatars/default_avatar.png`} width={20} height={20} alt='avatar' />
       <ManageAccountButton {...{
            edge: "start",
            color: "inherit",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: handleSettingsOpen,
          }}>
            <ManageAccountsOutlinedIcon />
          </ManageAccountButton>

        </UserInfo>
        <MyPrjBtn className={localStorage.getItem('themeMode') === 'dark' ? "Dark" : "Light"} href='/user-projects'>Projects</MyPrjBtn> 
        
        </>
      )
    }
  };

  const femmecubatorLogo = (
    <Typography variant="h6" component="a" href='/'>
      {
        localStorage.getItem('themeMode') === 'dark' ?
        <img className="fit-picture" src={WebsterLogoDark} alt="websterLogo" width={165} height={50}></img>
        :
        <img className="fit-picture" src={WebsterLogoLight} alt="websterLogo" width={165} height={50}></img>
      }
    </Typography>
  );

  const getMenuButtons = () => {

    if (currentUser?.currentUser === 'guest') {
        return (
          <>
          <IconButton onClick={toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <MenuButton
            {...{
              key: 'Sign In',
              color: "inherit",
              to: '/login',
              component: RouterLink,
            }}
          >
            Sign In
          </MenuButton>
          <MenuButton
            {...{
              key: 'Sign Up',
              color: "inherit",
              to: '/register',
              component: RouterLink,
            }}
          >
            Sign Up
          </MenuButton>
          </>
        );
    }
    else {
      return (
        <UserInfo>
          <p>{currentUser?.login}</p>
          <Avatar src={userAvatar && userAvatar !== 'undefined' && userAvatar !== undefined ? `${route.serverURL}/avatars/${userAvatar}` : `${route.serverURL}/avatars/default_avatar.png`} width={20} height={20} alt='avatar' />
          <ManageAccountButton {...{
            edge: "start",
            color: "inherit",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: handleSettingsOpen,
          }}>
            <ManageAccountsOutlinedIcon />
          </ManageAccountButton>
        </UserInfo>
      )
    }
  };

  return (
    <div className="wrapper-navbar">
      <MainHeader className={localStorage.getItem('themeMode') === 'dark'  ? "Dark" : "Light"}>
        {mobileView ? displayMobile() : displayDesktop()}
      </MainHeader>
    </div>
  );
}

