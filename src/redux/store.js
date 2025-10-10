import weatherReduce from "./weather/weatherReducer";
import createSagaMiddleware from "redux-saga";
import { weatherGenerate } from "./weather/sagaGenerator";
import { configureStore } from "@reduxjs/toolkit";


const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
    reducer:weatherReduce,
    middleware:(getMiddleware)=> getMiddleware({thunk : false}).concat(sagaMiddleware)
})

sagaMiddleware.run(weatherGenerate)