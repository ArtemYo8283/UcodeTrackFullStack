import '../App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from './Layout/Layout';
import MainPage from "./Layout/MainPage";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import { ThemeProvider, createTheme } from '@mui/material/styles'
import ConfirmEmail from "./Auth/ConfirmEmail";
import ResetPassword from "./Auth/ResetPassword";
import ResetPasswordWT from "./Auth/ResetPasswordWT";
import { NotFound } from './ErrorPages/NotFound';
import { ServerError } from './ErrorPages/ServerError';
import { AccesDenied } from './ErrorPages/AccesDenied';
import RequreAuth from './Auth/RequreAuth';
import { UpdateProfile } from './UserPages/UpdateProfile';
import { UserProjects } from './UserProjects/UserProjects';
import { UpdateAvatar } from './UserPages/UpdateAvatar';
import { CreateProject } from './Project/CreateProject';
import CssBaseline from '@mui/material/CssBaseline';
import { PhotoEditor } from './Project/Photo Editor/PhotoEditor';
import { ProjectMain } from './Project/Photo Editor/ProjectMain/ProjectMain';

import {gapi} from 'gapi-script'
import {clientId} from '../api/routes'

function App() {
  if (!localStorage.getItem('autorized')) {
    localStorage.setItem(
      'autorized',
      JSON.stringify({ currentUser: 'guest' })
    );
  }
  if (!localStorage.getItem('themeMode')) {
    localStorage.setItem('themeMode', 'dark')
  }

  const theme = createTheme({
    palette: {
        mode: localStorage.getItem('themeMode'),
    },
  });

  useEffect(() => {
    function start() {
      gapi.client.init({
        client_id: clientId,
        scope: ''
      })
    }
    gapi.load('client:auth2', start)
  });

  return (
<ThemeProvider theme={theme}>
<CssBaseline />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path='/' element={<MainPage />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='confirm-email/:token' element={<ConfirmEmail />} />
          <Route path='reset-password' element={<ResetPassword />} />
          <Route path='reset-password/:token' element={<ResetPasswordWT />} />
          <Route path='*' element={<NotFound />} />
          <Route path='500' element={<ServerError />} />
          <Route path='403' element={<AccesDenied />} />

          <Route element={<RequreAuth allowedRoles={['user', 'admin']} />} >
            <Route path="update-profile" element={<UpdateProfile />} />
            
            <Route path="user-projects" element={<UserProjects />} />

            <Route path="create-project" element={<CreateProject />} />
            <Route path='editor' element={<PhotoEditor />} />
            <Route path='project/:id' element={<ProjectMain />} />
          </Route>
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
