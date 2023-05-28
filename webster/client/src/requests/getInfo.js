import { Navigate } from "react-router-dom";
import axios from "../api/axios";


export const getInfo = async(state, isLoadingState, URL) => {
    try {
        isLoadingState(true);
        const response = await axios.get(URL)
        // console.log(response);
        state(response.data.values.values);
        isLoadingState(false);
    } catch (error) {
       <Navigate to='/500' state={{ from: window.location }} replace/>
    }
} 

