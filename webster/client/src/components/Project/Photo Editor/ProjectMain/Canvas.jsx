import React, { useEffect, useRef, useState } from 'react'
import axios from '../../../../api/axios';
import { UPDATE_PROJECT_URL } from '../../../../api/routes';
import { fabric } from 'fabric';
import { Accordion, AccordionDetails, AccordionSummary, Button, ButtonGroup, CircularProgress, Grid, Paper, Slider, Typography } from '@mui/material';
import { ControlsBox, UpdateForm } from '../../../../styles/CreateProjectStyles';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, letterSpacing } from '@mui/system';
import { saveAsPNG } from '../../../../scripts/saveAsPng';
import { ColorPickerElement } from '../../../Other/ColorPickerElement';
import { FreeDraw } from './FreeDraw';
import { BoxEl, ButtonEl, ErrWarning, TextFieldEl } from '../../../../styles/RegisterStyle';
import { DESCRIPTION_REGEX, NUMBER_REGEX, TITLE_REGEX } from '../../../../regex/regex';
import RectangleOutlinedIcon from '@mui/icons-material/RectangleOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import TextFieldsOutlinedIcon from '@mui/icons-material/TextFieldsOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import LayersClearOutlinedIcon from '@mui/icons-material/LayersClearOutlined';
export const Canvas = ({ projectId, projectInfo }) => {
  const currentUser = JSON.parse(localStorage.getItem('autorized'));
  const [canvas, setCanvas] = useState();
  const [color, setColor] = useState()
  const [canvasBackgroundColor, setCanvasBackgroundColor] = useState();
  const [outlineColor, setOutlineColor] = useState();
  const [showDrawOptions, setShowDrawOption] = useState(false);
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState('');
  const [submitClicked, setSubmitClicked] = useState(false);
  const [title, setTitle] = useState(projectInfo.project.mainInfo.title)
  const [description, setDescription] = useState(projectInfo.project.mainInfo.description)
  const [isLoading, setIsLoading] = useState(false);
  const [width, setWidth] = useState(projectInfo.project.mainInfo.width)
  const [height, setHeight] = useState(projectInfo.project.mainInfo.height);
  const [outlineWidth, setOutlineWidth] = useState(5);

  const [filterBlur,setFilterBLur] = useState(0);
  const [filterBrightness,setFilterBrightness] = useState(0);
  const [filterContrast,setFilterContrast] = useState(0);
  const [filterGrayScale,setFilterGrayScale] = useState(0);
  const [filterSepia,setFilterSepia] = useState(0);
  const [filterSaturation,setFilterSaturation] = useState(0);


  const handleChange = (event, newValue) => {
    setOutlineWidth(newValue);
  };

  const removeFilters = (canvas) => {
    setFilterBLur(0);
    setFilterBrightness(0);
    setFilterContrast(0);
    setFilterGrayScale(0);
    setFilterSepia(0);
    setFilterSaturation(0);

    let activeObject = canvas.getActiveObject();
    if (activeObject && activeObject?.type === 'image') {
      activeObject.filters = [];
      activeObject.applyFilters();
      canvas.renderAll();
    }
  }

  const filterCanvas = (canvas, value, type) => {
    let obj = canvas.getActiveObject();
    const ctx = canvas.getContext(obj);

    switch(type) {
      case 'blur':
        if (obj && obj?.type === 'image') {
          obj.filters = obj.filters.filter(function(filter) {
            return !(filter instanceof fabric.Image.filters.Blur);
          });
          obj.applyFilters();
          canvas.renderAll();
        }

        setFilterBLur(value);
        if (obj?.type === 'image') {
          obj.filters.push(new fabric.Image.filters.Blur({
            blur: filterBlur 
          }));
          obj.applyFilters();
        }
        break;
      case 'brightness': 
        if (obj && obj?.type === 'image') {
        obj.filters = obj.filters.filter(function(filter) {
          return !(filter instanceof fabric.Image.filters.Brightness);
        });
        obj.applyFilters();
        canvas.renderAll();
      }
        setFilterBrightness(value);
        if (obj?.type === 'image') {
          obj.filters.push(new fabric.Image.filters.Brightness({
            brightness: filterBrightness 
          }));
          obj.applyFilters();
        }
        break;    
      case 'contrast': 
        if (obj && obj?.type === 'image') {
          obj.filters = obj.filters.filter(function(filter) {
            return !(filter instanceof fabric.Image.filters.Contrast);
          });
          obj.applyFilters();
          canvas.renderAll();
        }
        setFilterContrast(value);
          if (obj?.type === 'image') {
            obj.filters.push(new fabric.Image.filters.Contrast({
              contrast: filterContrast 
            }));
            obj.applyFilters();
          }
        break;
      case 'sepia': 
        if (obj && obj?.type === 'image') {
          obj.filters = obj.filters.filter(function(filter) {
            return !(filter instanceof fabric.Image.filters.Sepia);
          });
          obj.applyFilters();
          canvas.renderAll();
        }
        setFilterSepia(value);
          if (obj?.type === 'image') {
            obj.filters.push(new fabric.Image.filters.Sepia({
              sepia: filterSepia 
            }));
            obj.applyFilters();
          }
        break;
      case 'grayscale': 
        if (obj && obj?.type === 'image') {
          obj.filters = obj.filters.filter(function(filter) {
            return !(filter instanceof fabric.Image.filters.Grayscale);
          });
          obj.applyFilters();
          canvas.renderAll();
        }
        setFilterGrayScale(value);
          if (obj?.type === 'image') {
            obj.filters.push(new fabric.Image.filters.Grayscale({
              grayscale: filterGrayScale 
            }));
            obj.applyFilters();
          }
        break;
      case 'saturation': 
        if (obj && obj?.type === 'image') {
          obj.filters = obj.filters.filter(function(filter) {
            return !(filter instanceof fabric.Image.filters.Saturation);
          });
          obj.applyFilters();
          canvas.renderAll();
        }
        setFilterSaturation(value);
          if (obj?.type === 'image') {
            obj.filters.push(new fabric.Image.filters.Saturation({
              saturation: filterSaturation 
            }));
            obj.applyFilters();
          }
        break;
      default:
        break;
    }
    canvas.renderAll();
  }

  const addFigure = (canvi, figureName) => {
    let figure = null;

    switch (figureName) {
      case 'rect':
        figure = new fabric.Rect({
          height: 280,
          width: 200,
          stroke: outlineColor,
          strokeWidth: outlineWidth,
          fill: color
        });

        canvi.add(figure)

        break;
      case 'circle':
        figure = new fabric.Circle({
          radius: 50,
          fill: color,
          stroke: outlineColor,
          strokeWidth: outlineWidth,

        });

        canvi.add(figure)

        break;
      case 'text':
        figure = new fabric.Textbox('Sample text', {
          width: 200,
          height: 150,
          stroke: outlineColor,
          strokeWidth: outlineWidth,
          fill: color,
        });

        canvi.add(figure)
        break;
      case "image":
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (event) => {
          const file = event.target.files[0];
          const reader = new FileReader();
          reader.onload = () => {
            const img = new Image();
            img.onload = () => {
              const fabricImage = new fabric.Image(img);
              canvi.add(fabricImage);
              canvi.renderAll();
            };
            img.src = reader.result;
          };
          reader.readAsDataURL(file);
        };
        input.click();

        break;
      default:
        break;
    }
    // canvi.add(figure);
    canvi.renderAll();
  }
  const deleteObject = (event) => {
    canvas.remove(canvas.getActiveObject());
  }


  const loadJson = (canvi) => {
    console.log(projectInfo);
    canvi.clear();
    const json = projectInfo.project.projectCanvas.canvas;
    canvi.loadFromJSON(json, canvi.renderAll.bind(canvi));

  }

  useEffect(() => {
    if (projectInfo) {
      initCanvas(projectInfo);
    }
  }, [projectInfo]);



  useEffect(() => {
    if (canvas) {
      loadJson(canvas)
    }
  }, [canvas])

  const initCanvas = (projectInfo) => {
    setCanvas(new fabric.Canvas('c', {
      height: projectInfo.project.mainInfo.height,
      width: projectInfo.project.mainInfo.width,
      backgroundColor: projectInfo.project.mainInfo.bgColor,
      isDrawingMode: false
    }))
  }

  const saveProgres = async (canvi) => {
    const projectJSON = JSON.stringify(canvi);
    const parsedProject = JSON.parse(projectJSON)
    parsedProject.background = canvasBackgroundColor;
    // console.log(parsedProject);
    const preview = canvi.toDataURL('png')
    const updatedInfo = {
      preview: preview, 
      project: {
        mainInfo: {
          title: title,
          description: description,
          width: width,
          height: height,
          bgColor: canvasBackgroundColor,

        },
        projectCanvas: {
          canvas: parsedProject
        }
      }
    }
    // console.log(updatedInfo)
    try {
      const response = await axios.patch(`${UPDATE_PROJECT_URL}/${projectId}/${currentUser.accessToken}`, JSON.stringify(updatedInfo), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      })
      // console.log(response)

    } catch (error) {
      console.log(error)
    }


  }

useEffect(() => {
  const timer = setInterval(() => {
    saveProgres(canvas)
    console.log('autosave')
  }, 60000);

  return () => {
    clearTimeout(timer);
  };
}, [canvas])
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitClicked(true)
    setErrMsg('');
    try {
      setIsLoading(true)
      await saveProgres(canvas);
      setIsLoading(false);
      document.location.reload()
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }

  }

  return (
    <>
      <Grid container spacing={2} direction="row" justifyContent={'center'}>
        <Grid item>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"

            >
              <Typography>Controls</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ControlsBox>
                <Typography>Figures</Typography>
                <ButtonGroup variant="outlined" aria-label="outlined button group">
                  <Button onClick={() => addFigure(canvas, 'rect')}><RectangleOutlinedIcon /></Button>
                  <Button onClick={() => addFigure(canvas, 'circle')}><CircleOutlinedIcon /></Button>
                  <Button onClick={() => addFigure(canvas, 'text')}><TextFieldsOutlinedIcon /></Button>
                  <Button onClick={() => addFigure(canvas, 'image')}><ImageOutlinedIcon /></Button>
                  <Button onClick={() => deleteObject()}><DeleteOutlinedIcon /></Button>
                </ButtonGroup>
              </ControlsBox>

              <Box>
                <ColorPickerElement colorStateValue={color} setColorState={setColor} label="Color" defaultValue={'rgb(0, 0, 0)'} />
                <ColorPickerElement colorStateValue={outlineColor} setColorState={setOutlineColor} label="Outline color" defaultValue={'rgb(0, 0, 0)'} />
                <ControlsBox>
                  <Typography>Outline width</Typography>

                  <Slider aria-label="Temperature" valueLabelDisplay="auto" value={outlineWidth} onChange={handleChange} />
                </ControlsBox>
              </Box>

              <ControlsBox>
              <Button onClick={() => removeFilters(canvas)}>Remove all filters</Button>
                <Typography>Blur</Typography>
                <Slider
                    aria-label="Blur"
                    valueLabelDisplay="auto"
                    value={filterBlur}
                    step={0.2}
                    min={0}
                    max={15}
                    onChange={e => filterCanvas(canvas,e.target.value, 'blur')}
                  />
                <Typography>Brightness</Typography>
                <Slider
                    aria-label="Brightness"
                    valueLabelDisplay="auto"
                    value={filterBrightness}
                    step={0.01}
                    min={-1}
                    max={1}
                    onChange={e => filterCanvas(canvas,e.target.value, 'brightness')}
                  />
                <Typography>Contrast</Typography>
                <Slider
                    aria-label="Contrast"
                    valueLabelDisplay="auto"
                    value={filterContrast}
                    step={0.01}
                    min={-1}
                    max={1}
                    onChange={e => filterCanvas(canvas,e.target.value, 'contrast')}
                  />
                  <Typography>Grayscale</Typography>
                <Slider
                    aria-label="Grayscale"
                    valueLabelDisplay="auto"
                    value={filterGrayScale}
                    step={0.01}
                    min={0}
                    max={1}
                    onChange={e => filterCanvas(canvas,e.target.value, 'grayscale')}
                  />
                 <Typography>Sepia</Typography>
                <Slider
                    aria-label="Sepia"
                    valueLabelDisplay="auto"
                    value={filterSepia}
                    step={0.01}
                    min={0}
                    max={1}
                    onChange={e => filterCanvas(canvas,e.target.value, 'sepia')}
                  />
                 <Typography>Saturation</Typography>
                <Slider
                    aria-label="Saturation"
                    valueLabelDisplay="auto"
                    value={filterSaturation}
                    step={0.02}
                    min={0}
                    max={2}
                    onChange={e => filterCanvas(canvas,e.target.value, 'saturation')}
                  />
              </ControlsBox>

              <ControlsBox>
                <Typography>Save and Donwload</Typography>
                <ButtonGroup variant="outlined" aria-label="outlined button group">
                  <Button id="clear-canvas"><LayersClearOutlinedIcon /></Button>
                  <Button onClick={() => saveProgres(canvas)}><SaveOutlinedIcon /></Button>
                  <Button onClick={() => saveAsPNG(canvas, projectInfo)}><SaveAltOutlinedIcon /></Button>
                </ButtonGroup>
              </ControlsBox>



            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item>
          <FreeDraw canvas={canvas} />
        </Grid>
        <Grid item >
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Project Settings</Typography>
            </AccordionSummary>
            <AccordionDetails>

              <UpdateForm
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
              >
                <ErrWarning ref={errRef} className={errMsg ? "warning" : "offscreen"} aria-live="assertive">{errMsg}</ErrWarning>
                <TextFieldEl
                  label="Title"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  error={TITLE_REGEX.test(title) === false && submitClicked === true}
                  helperText={TITLE_REGEX.test(title) === false && submitClicked === true ? 'Title required (minimum 3 characters)' : ' '}
                />
                <TextFieldEl
                  label="Description"
                  required
                  multiline
                  rows={4}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  error={DESCRIPTION_REGEX.test(description) === false && submitClicked === true}
                  helperText={DESCRIPTION_REGEX.test(description) === false && submitClicked === true ? 'Description required (minimum 10 characters)' : ' '}
                />
                <div style={{ display: "flex" }}>
                  <TextFieldEl
                    label="Width"
                    required
                    value={width}
                    type="number"
                    onChange={e => setWidth(e.target.value)}
                    error={NUMBER_REGEX.test(width) === false && submitClicked === true}
                    helperText={NUMBER_REGEX.test(width) === false && submitClicked === true ? 'Width must be a number' : ' '}
                  />
                  <TextFieldEl
                    label="Height"
                    required
                    type="number"
                    value={height}
                    onChange={e => setHeight(e.target.value)}
                    error={NUMBER_REGEX.test(height) === false && submitClicked === true}
                    helperText={NUMBER_REGEX.test(height) === false && submitClicked === true ? 'Height must be a number' : ' '}
                  />
                </div>
                <ColorPickerElement colorStateValue={canvasBackgroundColor} setColorState={setCanvasBackgroundColor} label="BG color 1" defaultValue={projectInfo.project.mainInfo.bgColor} />

                <ButtonEl type="submit" variant="contained">
                  {
                    isLoading ? <CircularProgress size={24} /> :
                      <p>Save</p>
                  }

                </ButtonEl>
              </UpdateForm>

            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>

      <BoxEl>
        <canvas id="c" ></canvas>
      </BoxEl>
    </>
  )
}