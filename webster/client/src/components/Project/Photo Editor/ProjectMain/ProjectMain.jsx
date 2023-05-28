import React, { useEffect, useState } from 'react'
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'
import { BoxEl } from '../../../../styles/RegisterStyle'
import { fabric } from 'fabric';
import { Button } from '@mui/material';
import axios from '../../../../api/axios';
import { GET_PROJECT_URL } from '../../../../api/routes';
import { useLocation } from 'react-router-dom';
import { getInfo } from '../../../../requests/getInfo';
import { InfoLoadingSpinner } from '../../../Other/InfoLoadingSpinner';
import { Canvas } from './Canvas';
import { Container } from '@mui/system';
export const ProjectMain = () => {
    const location = useLocation().pathname.split('/');
    const currentId = location[2];
    console.log(currentId);
    const [mainProjectInfo, setMainProjectInfo] = useState();
    const [isLoadingPage, setIsLoadingPage] = useState(true);


    const currentUser = JSON.parse(localStorage.getItem('autorized'));

    useEffect(() => {
        getInfo(setMainProjectInfo, setIsLoadingPage, `${GET_PROJECT_URL}/${currentId}/${currentUser.accessToken}`)
    }, [])

    return isLoadingPage ? <InfoLoadingSpinner size={56} /> : (
        <>
            <Canvas projectId={currentId} projectInfo={mainProjectInfo} />
        </>
    )
}