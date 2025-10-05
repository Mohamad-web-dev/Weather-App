import { createContext } from "react";


export const MainContext = createContext({
    handelChangeLang : ()=>{},
    nameLocation:"",
    setNameLocation:()=>{},
    setNameBgImg:()=>{}
})