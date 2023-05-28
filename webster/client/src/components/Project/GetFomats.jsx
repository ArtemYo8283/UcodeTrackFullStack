import { Card, CardContent, Grid, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { GET_CATEGORIES_URL, GET_FORMATS_URL } from '../../api/routes';
import { getInfo } from '../../requests/getInfo';
import { CustomToggleButtonGroup, FormatCard, FormatTitle, TypographyBox } from '../../styles/CreateProjectStyles';
import { InfoLoadingSpinner } from '../Other/InfoLoadingSpinner';

export const GetFomats = ({chosenWidthState, chosenHeightState}) => {
  const [formats, setFormats] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [showFormats, setShowFormats] = useState([]);
  const [alignment, setAlignment] = useState('All');
  const navigate = useNavigate();
  useEffect(() => {
    getInfo(setFormats, setIsLoadingPage, GET_FORMATS_URL);
    getInfo(setCategories, setIsLoadingPage, GET_CATEGORIES_URL);
  }, [])
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    console.log(newAlignment);
    if (newAlignment === 'All') {
      setShowFormats(formats);
    }
    else if(newAlignment){
      setShowFormats(formats.filter((format) => format.category_id === newAlignment.id))
    }
  };
  const setFormatStates = (formatWidth, formatHeight) => {
    chosenWidthState(formatWidth);
    chosenHeightState(formatHeight);
  }
  return isLoadingPage ? <InfoLoadingSpinner size={56} /> : (
    <>
      <CustomToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton value='All'>All</ToggleButton>
        {
          categories ? categories.map((category) => {
            return (
              <ToggleButton key={category.id} value={category}>{category.title}</ToggleButton>
            )
          }) : <></>
        }
      </CustomToggleButtonGroup>
      <Grid container spacing={1}
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      >
        {
          alignment === "All" ? formats.map((format) => {
            return (
              <>
                <Grid item key={format.id}>
                  <FormatCard variant="outlined" onClick={() => setFormatStates(format.width, format.height)}>
                    <FormatTitle variant="h1">{format.title_short}</FormatTitle>
                    <Typography>{format.title}</Typography>
                    <Typography variant="caption">{`${format.width} x ${format.height}`}</Typography>
                  </FormatCard>
                </Grid>
              </>
            )
          }) : showFormats ? showFormats.map((format) => {
            return (
              <>
                <Grid item key={format.id}>
                  <FormatCard variant="outlined"  onClick={() => setFormatStates(format.width, format.height)}>
                    <FormatTitle variant="h1" color="white">{format.title_short}</FormatTitle>
                    <Typography>{format.title}</Typography>
                    <Typography variant="caption">{`${format.width} x ${format.height}`}</Typography>
                  </FormatCard>
                </Grid>
              </>
            )
          }) : <></>




        }
      </Grid>
    </>
  )
}
