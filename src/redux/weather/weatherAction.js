import axios from "axios";

export const sendRequest = () => {
  return {
    type: "SEND_REQUEST",
  };
};
export const getData = (data) => {
  return {
    type: "GET_DATA",
    payload: data,
  };
};
export const getError = (data) => {
  return {
    type: "GET_ERROR",
    payload: data,
  };
};

export const handelAction = (location,dataLang,setNameBgImg) => {
  if (location === "") location = "london"
  return (dispatch) => {
    dispatch(sendRequest());
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=35be6d8b7019818b202bdbee8afc4f35&units=metric&lang=${dataLang}`
      )
      .then((res) => {
        dispatch(getData(res.data));
        console.log(res);
        
        if (res.data.weather[0].main === "Clear" ||res.data.weather[0].main ===  "Sunny") {
          setNameBgImg("sunny-clear")
        }else if (res.data.weather[0].main === "Clouds" ||res.data.weather[0].main ===  "Thunderstorm") {
          setNameBgImg("clouds-thunderstorm")
        }else if (res.data.weather[0].main === "Mist" ||res.data.weather[0].main ===  "Fog"||"Haze"||"Smoke") {
          setNameBgImg("mist-fog-haze-smoke")
        }else if (res.data.weather[0].main === "Rain" ||res.data.weather[0].main ===  "Drizzle") {
          setNameBgImg("rain-drizzle")
        }else if (res.data.weather[0].main === "snow") {
          setNameBgImg("snow")
        }
      })
      .catch((err) => {

        if (err.status === 404)  dispatch(getError("the location is false 404 ERROR"));
      });
  };
};
