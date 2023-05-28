import React, { useEffect, useRef, useState } from 'react'
import { DESCRIPTION_REGEX, NUMBER_REGEX, TITLE_REGEX } from '../../regex/regex';
import { ColorPicker, CreateBox, Settings, TypographyBox } from '../../styles/CreateProjectStyles';
import { ButtonEl, ErrWarning, TextFieldEl } from '../../styles/RegisterStyle';
import { SettingsForm } from '../../styles/CreateProjectStyles';
import { CircularProgress } from '@mui/material';
import axios from '../../api/axios';
import { CREATE_PROJECT_URL } from '../../api/routes';
import { useNavigate } from 'react-router-dom';

export const CreateForm = ({ widthValue, heightValue }) => {
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');
    const [submitClicked, setSubmitClicked] = useState(false);
    const currentUser = JSON.parse(localStorage.getItem('autorized'));
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [width, setWidth] = useState(widthValue)
    const [height, setHeight] = useState(heightValue);
    // const [orientation, setOrientation] = useState()
    const [backgroundColor, setBackgroundColor] = useState()
    useEffect(() => {
        setWidth(widthValue)
        setHeight(heightValue)
    }, [widthValue, heightValue])

    useEffect(() => {
        if (!backgroundColor) {
            setBackgroundColor('rgb(0, 0, 0)')
        }
    }, [])
    const handleSubmit = async (e) => {
        setSubmitClicked(true);
        setErrMsg('');
        e.preventDefault();
        console.log(title, description, +width, +height, backgroundColor);

        try {
            setIsLoading(true)
            //here must be an axios statement and json logic
            const projectCreateInfo =
            {
                project: {
                    mainInfo: {
                        title: title,
                        description: description,
                        width: +width,
                        height: +height,
                        bgColor: backgroundColor,

                    },
                    projectCanvas: {
                        canvas: {
                            background: backgroundColor,
                            objects: [],
                            version: "5.3.0"}
                    }
                }
            }
            console.log(projectCreateInfo);
            const response = await axios.post(CREATE_PROJECT_URL + currentUser.accessToken, JSON.stringify(projectCreateInfo), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            console.log(response);
            document.location.replace(`/project/${response.data.values.values}`)
            setIsLoading(false)
        } catch (error) {
            setErrMsg('Error')
            setIsLoading(false)
        }

    }
    const setColor = (color) => {
        setBackgroundColor(color)
    }
    return (
        <>
            <SettingsForm
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
                        value={height}
                        type="number"
                        onChange={e => setHeight(e.target.value)}
                        error={NUMBER_REGEX.test(height) === false && submitClicked === true}
                        helperText={NUMBER_REGEX.test(height) === false && submitClicked === true ? 'Height must be a number' : ' '}
                    />
                </div>
                <ColorPicker className={localStorage.getItem('themeMode') === 'dark' ? "Dark" : "Light"} value={backgroundColor} label="Background color" onChange={setColor} />
                <ButtonEl type="submit" variant="contained">
                    {
                        isLoading ? <CircularProgress size={24} /> :
                            <p>Create</p>
                    }

                </ButtonEl>
            </SettingsForm></>
    )
}
