import axios from "axios";


export const WAxios = axios.create({
    baseURL:"https://api.openweathermap.org/data/2.5/weather",
    // headers:{

    // }
    timeout:5000,
    timeoutErrorMessage:"the action will be over the 5 seconds"
})