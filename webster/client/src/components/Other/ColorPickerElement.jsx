import React, { useEffect } from 'react'
import { ColorPicker } from '../../styles/CreateProjectStyles'

export const ColorPickerElement = ({colorStateValue, setColorState, label, defaultValue}) => {
    useEffect(() => {
        if (!colorStateValue) {   
            setColorState(defaultValue)
        }
      }, [])
    const setColor = (color) => {
        setColorState(color);
      }
    return (
        <ColorPicker className={localStorage.getItem('themeMode') === 'dark' ? "Dark" : "Light"} value={colorStateValue} label={label} onChange={setColor} />

  )
}
