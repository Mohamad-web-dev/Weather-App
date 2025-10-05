import { applyMiddleware, createStore } from "redux";
import weatherReduce from "./weather/weatherReducer";
import { thunk } from "redux-thunk";


export const store = createStore(weatherReduce,applyMiddleware(thunk))