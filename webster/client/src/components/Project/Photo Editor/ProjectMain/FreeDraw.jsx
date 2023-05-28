import React, { useEffect, useState } from 'react';
import { fabric } from 'fabric';
import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';




export const FreeDraw = ({canvas}) => {
  const [drawingColor, setDrawingColor] = useState('#000000')
  const [shadowColor, setShadowColor] = useState('#000000')
  const changeColor = (color) => {
    setDrawingColor(color);
  }
  const changeShadowColor = (color) => {
    setShadowColor(color)
  }

  useEffect(() => { 
    fabric.Object.prototype.transparentCorners = false;

    const clearCanvas = () => {
      canvas.clear();
    };
    const toggleDrawingMode = () => {
      canvas.isDrawingMode = !canvas.isDrawingMode;
      const drawingModeEl = document.getElementById('drawing-mode');
      const drawingOptionsEl = document.getElementById('drawing-mode-options');
      if (canvas.isDrawingMode) {
        drawingModeEl.innerHTML = 'Cancel drawing mode';
        drawingOptionsEl.style.display = '';
      } else {
        drawingModeEl.innerHTML = 'Enter drawing mode';
        drawingOptionsEl.style.display = 'none';
      }
    };

    const handleDrawingModeSelectorChange = () => {
      const selectedValue = document.getElementById('drawing-mode-selector').value;

      const vLinePatternBrush = new fabric.PatternBrush(canvas);
      vLinePatternBrush.getPatternSrc = function () {
        const patternCanvas = fabric.document.createElement('canvas');
        patternCanvas.width = patternCanvas.height = 10;
        const ctx = patternCanvas.getContext('2d');
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(0, 5);
        ctx.lineTo(10, 5);
        ctx.closePath();
        ctx.stroke();
        return patternCanvas;
      };

      const hLinePatternBrush = new fabric.PatternBrush(canvas);
      hLinePatternBrush.getPatternSrc = function () {
        const patternCanvas = fabric.document.createElement('canvas');
        patternCanvas.width = patternCanvas.height = 10;
        const ctx = patternCanvas.getContext('2d');
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(5, 0);
        ctx.lineTo(5, 10);
        ctx.closePath();
        ctx.stroke();
        return patternCanvas;
      };

      const squarePatternBrush = new fabric.PatternBrush(canvas);
      squarePatternBrush.getPatternSrc = function () {
        const squareWidth = 10, squareDistance = 2;
        const patternCanvas = fabric.document.createElement('canvas');
        patternCanvas.width = patternCanvas.height = squareWidth + squareDistance;
        const ctx = patternCanvas.getContext('2d');
        ctx.fillStyle = this.color;
        ctx.fillRect(0, 0, squareWidth, squareWidth);
        return patternCanvas;
      };

      const diamondPatternBrush = new fabric.PatternBrush(canvas);
      diamondPatternBrush.getPatternSrc = function () {
        const squareWidth = 10, squareDistance = 5;
        const patternCanvas = fabric.document.createElement('canvas');
        const rect = new fabric.Rect({
          width: squareWidth,
          height: squareWidth,
          angle: 45,
          fill: this.color
        });
        const canvasWidth = rect.getBoundingRect().width;
        patternCanvas.width = patternCanvas.height = canvasWidth + squareDistance;
        rect.set({ left: canvasWidth / 2, top: canvasWidth / 2 });
        const ctx = patternCanvas.getContext('2d');
        rect.render(ctx);
        return patternCanvas;
      };
      const texturePatternBrush = new fabric.PatternBrush(canvas);
      texturePatternBrush.source = new Image();
      texturePatternBrush.source.src = '../assets/honey_im_subtle.png';

      if (selectedValue === 'hline') {
        canvas.freeDrawingBrush = hLinePatternBrush;
      } else if (selectedValue === 'vline') {
        canvas.freeDrawingBrush = vLinePatternBrush;
      } else if (selectedValue === 'square') {
        canvas.freeDrawingBrush = squarePatternBrush;
      } else if (selectedValue === 'diamond') {
        canvas.freeDrawingBrush = diamondPatternBrush;
      } else if (selectedValue === 'texture') {
        canvas.freeDrawingBrush = texturePatternBrush;
      }
      else {
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
      }

      const drawingColorEl = document.getElementById('drawing-color');
      const drawingLineWidthEl = document.getElementById('drawing-line-width');
      const drawingShadowColorEl = document.getElementById('drawing-shadow-color');
      const drawingShadowWidth = document.getElementById('drawing-shadow-width');
      const drawingShadowOffset = document.getElementById('drawing-shadow-offset');

      if (canvas.freeDrawingBrush) {
        const brush = canvas.freeDrawingBrush;
        brush.color = drawingColorEl.value;
        if (brush.getPatternSrc) {
          brush.source = brush.getPatternSrc.call(brush);
        }
        brush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
        brush.shadow = new fabric.Shadow({
          blur: parseInt(drawingShadowWidth.value, 10) || 0,
          offsetX: 0,
          offsetY: 0,
          affectStroke: true,
          color: drawingShadowColorEl.value
        });
      }
    };

    const handleDrawingColorChange = (event) => {
      const brush = canvas.freeDrawingBrush;
      brush.color = event.target.value;
      if (brush.getPatternSrc) {
        brush.source = brush.getPatternSrc.call(brush);
      }
    };

    const handleDrawingShadowColorChange = (event) => {
      canvas.freeDrawingBrush.shadow.color = event.target.value;
    };

    const handleDrawingLineWidthChange = () => {
      canvas.freeDrawingBrush.width = parseInt(document.getElementById('drawing-line-width').value, 10) || 1;
      document.getElementById('drawing-line-width-value').innerHTML = document.getElementById('drawing-line-width').value;
    };

    const handleDrawingShadowWidthChange = () => {
      canvas.freeDrawingBrush.shadow.blur = parseInt(document.getElementById('drawing-shadow-width').value, 10) || 0;
      document.getElementById('drawing-shadow-width-value').innerHTML = document.getElementById('drawing-shadow-width').value;
    };

    const handleDrawingShadowOffsetChange = () => {
      canvas.freeDrawingBrush.shadow.offsetX = parseInt(document.getElementById('drawing-shadow-offset').value, 10) || 0;
      canvas.freeDrawingBrush.shadow.offsetY = parseInt(document.getElementById('drawing-shadow-offset').value, 10) || 0;
      document.getElementById('drawing-shadow-offset-value').innerHTML = document.getElementById('drawing-shadow-offset').value;
    };

    document.getElementById('clear-canvas').addEventListener('click', clearCanvas);
    document.getElementById('drawing-mode').addEventListener('click', toggleDrawingMode);
    document.getElementById('drawing-mode-selector').addEventListener('change', handleDrawingModeSelectorChange);
    document.getElementById('drawing-color').addEventListener('change', handleDrawingColorChange);
    document.getElementById('drawing-shadow-color').addEventListener('change', handleDrawingShadowColorChange);
    document.getElementById('drawing-line-width').addEventListener('change', handleDrawingLineWidthChange);
    document.getElementById('drawing-shadow-width').addEventListener('change', handleDrawingShadowWidthChange);
    document.getElementById('drawing-shadow-offset').addEventListener('change', handleDrawingShadowOffsetChange);

    return () => {
      document.getElementById('clear-canvas').removeEventListener('click', clearCanvas);
      document.getElementById('drawing-mode').removeEventListener('click', toggleDrawingMode);
      document.getElementById('drawing-mode-selector').removeEventListener('change', handleDrawingModeSelectorChange);
      document.getElementById('drawing-color').removeEventListener('change', handleDrawingColorChange);
      document.getElementById('drawing-shadow-color').removeEventListener('change', handleDrawingShadowColorChange);
      document.getElementById('drawing-line-width').removeEventListener('change', handleDrawingLineWidthChange);
      document.getElementById('drawing-shadow-width').removeEventListener('change', handleDrawingShadowWidthChange);
      document.getElementById('drawing-shadow-offset').removeEventListener('change', handleDrawingShadowOffsetChange);
    };}, [canvas])
   return(
    <>
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"

      >
        <Typography>Free Draw</Typography>
      </AccordionSummary>
      <AccordionDetails >
        {/* <div id="controls" className='free-draw-controls'> */}
        <Button id="drawing-mode">Enter drawing mode</Button>
        <div id="drawing-mode-options" className='drawing-options'>
          <div>
            <div className="selectdiv">
              {/* <label htmlFor="drawing-mode-selector">Mode:</label> */}
              <select className="draw-select" id="drawing-mode-selector" defaultValue='pencil'>
                <option value="pencil">Pencil</option>
                <option value="hline">Horizontal Line</option>
                <option value="vline">Vertical Line</option>
                <option value="square">Square</option>
                <option value="diamond">Diamond</option>
                <option value="texture">Texture</option>
              </select>
            </div>
          </div>
          <div>
            <div className="drawFlex">
              <label className="draw-color-picker-label" htmlFor="drawing-color">Color:</label>
              <input type="color" className='draw-color-picker ' id="drawing-color" value={drawingColor} onChange={(e) => changeColor(e.target.value)} />
            </div>
            <div className="drawFlex">
              <label className="draw-color-picker-label" htmlFor="drawing-shadow-color">Shadow Color:</label>
              <input type="color" className='draw-color-picker ' id="drawing-shadow-color" value={shadowColor} onChange={(e) => changeShadowColor(e.target.value)} />

            </div>
          </div>
          <div className="drawFlex">
            <label htmlFor="drawing-line-width">Line Width:</label>
            <input type="range" id="drawing-line-width" min="1" max="150" />
            <span id="drawing-line-width-value"></span>
          </div>
          <div className="drawFlex">
            <label htmlFor="drawing-shadow-width">Shadow Width:</label>
            <input type="range" id="drawing-shadow-width" min="0" max="50" />
            <span id="drawing-shadow-width-value"></span>
          </div>
          <div className="drawFlex" >
            <label htmlFor="drawing-shadow-offset">Shadow Offset:</label>
            <input type="range" id="drawing-shadow-offset" min="0" max="50" />
            <span id="drawing-shadow-offset-value"></span>
          </div>
        </div>
        {/* </div> */}
      </AccordionDetails>
    </Accordion>
    </>
   )
}