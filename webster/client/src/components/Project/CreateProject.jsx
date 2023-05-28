import React, { useState } from 'react'

import { CreateBox, Settings, TypographyBox } from '../../styles/CreateProjectStyles';
import { ButtonEl, ErrWarning, TextFieldEl } from '../../styles/RegisterStyle';
import { SettingsForm } from '../../styles/CreateProjectStyles';
import { GetFomats } from './GetFomats';
import { CircularProgress } from '@mui/material';
import { CreateForm } from './CreateForm';


export const CreateProject = () => {

  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [chosenFormatWidth, setChosenFormatWidth] = useState(0)
  const [chosenFormatHeight, setChosenFormatHeight] = useState(0)


  return (
    <CreateBox>
      <TypographyBox>Create Project</TypographyBox>
      <Settings>
        <div style={{ width: '74%' }}>
          <GetFomats chosenWidthState={setChosenFormatWidth} chosenHeightState={setChosenFormatHeight} />
        </div>
        <CreateForm widthValue={chosenFormatWidth} heightValue={chosenFormatHeight} />
      </Settings>
    </CreateBox>
  )
}
