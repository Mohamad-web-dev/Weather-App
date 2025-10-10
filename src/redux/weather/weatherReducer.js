const weatherState = {
  loading: false,
  data: {
    name: "",
    weather: "",
    weatherIcon: "",
    weatherDesc: "",
    temp: 0,
    tempMax: 0,
    tempMin: 0,
    humidity: 0,
    clouds: 0,
    wind: 0,
    error: "",
  },
  error: "",
  nameI:""
};

const weatherReduce = (state = weatherState, action) => {
  switch (action.type) {
    case "SEND_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_DATA":
      return {
        ...state,
        loading: false,
        data: {
          name: action.payload.name,
          weather: action.payload.weather[0].main,
          weatherIcon: action.payload.weather[0].icon,
          weatherDesc: action.payload.weather[0].description,
          temp: action.payload.main.temp,
          tempMax: action.payload.main.temp_max,
          tempMin: action.payload.main.temp_min,
          humidity: action.payload.main.humidity,
          clouds: action.payload.clouds.all,
          wind: action.payload.wind.speed,
          error:""
        },
        nameI: action.payloadImage
      };
    case "GET_ERROR":
      return {
        ...state,
        loading:false,
        data:{
          ...state.data,
          error:action.payload
        }
      }

    default:
      return state;
  }
};

export default weatherReduce;
