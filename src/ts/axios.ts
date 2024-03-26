import axios from "axios";
import {PATHS} from "./constants.ts";



const instance = axios.create({
    baseURL: PATHS.MAIN
})

instance.interceptors.response.use((resp)=>{
    return resp.data
})

export default instance