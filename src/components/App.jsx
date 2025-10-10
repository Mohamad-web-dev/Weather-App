import "@fortawesome/fontawesome-free/css/all.min.css";
import "../style.css";
import MainPart from "./mainPart/mainPart";
import InfoPart from "./infoPart/infoPart";
import { useEffect, useState } from "react";
import "../i18n";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {sendRequest,} from "../redux/weather/weatherAction";
import { MainContext } from "./context/mainContext";

function App() {
  const [direction, setDirection] = useState("rtl");
  const [nameLocation, setNameLocation] = useState("");

  const {nameI} = useSelector(state=>state)
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  const handelChangeLang = () => {
    if (i18n.language === "en") {
      i18n.changeLanguage("fa");
      setDirection("rtl");
      localStorage.setItem("lang", JSON.stringify("fa"));
    } else {
      i18n.changeLanguage("en");
      setDirection("ltr");
      localStorage.setItem("lang", JSON.stringify("en"));
    }
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("lang")) === "en") {
      i18n.changeLanguage("en");
      setDirection("ltr");
    } else {
      i18n.changeLanguage("fa");
      setDirection("rtl");
    }
  }, []);

  useEffect(() => {
    const dataLang = i18n.language;
    // dispatch(handelAction(nameLocation, dataLang, setNameBgImg));
    dispatch(sendRequest(nameLocation, dataLang))
  }, [direction]);

  return (
    <div
      className={` container-content ${nameI} ${
        direction === "rtl" ? "d-rtl" : "d-ltr"
      } main-container d-flex flex-row align-items-center `}
    >
      <img
        className="bg-container"
        src={`./public/images/${nameI}.jpg`}
        alt=""
      />
      <MainContext.Provider
        value={{
          handelChangeLang,
          nameLocation,
          setNameLocation,
          nameI,
        }}
      >
        <MainPart />
        <InfoPart />
      </MainContext.Provider>
    </div>
  );
}

export default App;
