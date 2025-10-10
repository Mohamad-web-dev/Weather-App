import { all, call, fork, put, takeEvery, takeLatest } from "redux-saga/effects";
import { WAxios } from "../../api/WAxios";
import { getData, getError } from "./weatherAction";

let currentBgImage = null

const sendRequest = (dataLang, query) => {
  query = query || "london";
  return WAxios.get(
    `?q=${query}&appid=35be6d8b7019818b202bdbee8afc4f35&units=metric&lang=${dataLang}`
  );
};

const handelSetBgName = (res, setNameBgImg) => {

  if (
    res.data.weather[0].main === "Clear" ||
    res.data.weather[0].main === "Sunny"
  )
  setNameBgImg="sunny-clear";

  if (
    res.data.weather[0].main === "Clouds" ||
    res.data.weather[0].main === "Thunderstorm"
  )
   setNameBgImg="clouds-thunderstorm";
  if (
    res.data.weather[0].main === "Mist" ||
    res.data.weather[0].main === "Fog" ||
    res.data.weather[0].main === "Haze" ||
    res.data.weather[0].main === "Smoke"
  )
   setNameBgImg="mist-fog-haze-smoke";
  if (
    res.data.weather[0].main === "Rain" ||
    res.data.weather[0].main === "Drizzle"
  )
   setNameBgImg="rain-drizzle";
  if (res.data.weather[0].main === "snow") setNameBgImg="snow";

  currentBgImage = setNameBgImg

};

function* handelGetRequest(action) {
  try {
    const res = yield call(
      sendRequest,
      action.payloadDataLang,
      action.payloadQuery
    );
    console.log(res);
    yield handelSetBgName(res, action.payloadSetNI);
    
    yield put(getData(res.data,currentBgImage));

        

  } catch (error) {
    yield put(getError(error.massage));
  }
}

function* weatherGenerate() {
  yield takeLatest("SEND_REQUEST", handelGetRequest);
}


export function* multipleGenerator (){
  yield all([
    fork(weatherGenerate)
    ////// // another generator ....
    //fork(...)
    //fork(...)
  ])
}
