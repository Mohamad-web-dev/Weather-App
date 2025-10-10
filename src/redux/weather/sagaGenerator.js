import { call, put, takeEvery } from "redux-saga/effects";
import { WAxios } from "../../api/WAxios";
import { getData, getError } from "./weatherAction";

const sendRequest = (dataLang, query) => {
    query = query || "london"
  return WAxios.get(
    `?q=${query}&appid=35be6d8b7019818b202bdbee8afc4f35&units=metric&lang=${dataLang}`
  );
};

const handelSetBgName = (res, setNameBgImg) => {
  if (
    res.data.weather[0].main === "Clear" ||
    res.data.weather[0].main === "Sunny"
  ) {
    setNameBgImg("sunny-clear");
  } else if (
    res.data.weather[0].main === "Clouds" ||
    res.data.weather[0].main === "Thunderstorm"
  ) {
    setNameBgImg("clouds-thunderstorm");
  } else if (
    res.data.weather[0].main === "Mist" ||
    res.data.weather[0].main === "Fog" ||
    "Haze" ||
    "Smoke"
  ) {
    setNameBgImg("mist-fog-haze-smoke");
  } else if (
    res.data.weather[0].main === "Rain" ||
    res.data.weather[0].main === "Drizzle"
  ) {
    setNameBgImg("rain-drizzle");
  } else if (res.data.weather[0].main === "snow") {
    setNameBgImg("snow");
  }
};

function* handelGetRequest(action) {
  try {
    const res = yield call(
      sendRequest,
      action.payloadDataLang,
      action.payloadQuery
    );
    yield put(getData(res.data));

    yield handelSetBgName(res, action.payloadSetNI);
  } catch (error) {
    yield put(getError(error.massage));
  }
}

export function* weatherGenerate() {
  yield takeEvery("SEND_REQUEST", handelGetRequest);
}
