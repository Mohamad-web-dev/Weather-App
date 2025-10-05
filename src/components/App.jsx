import "@fortawesome/fontawesome-free/css/all.min.css";
import "../style.css";
import MainPart from "./mainPart/mainPart";
import InfoPart from "./infoPart/infoPart";
import { useEffect, useState } from "react";
import "../i18n";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  getData,
  getError,
  handelAction,
  sendRequest,
} from "../redux/weather/weatherAction";
import { MainContext } from "./context/mainContext";

function App() {
  const [direction, setDirection] = useState("rtl");
  const [nameBgImg, setNameBgImg] = useState("");
  const [nameLocation, setNameLocation] = useState("");

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
    dispatch(handelAction(nameLocation, dataLang, setNameBgImg));
  }, [direction]);

  return (
    <div
      className={` container-content ${nameBgImg} ${
        direction === "rtl" ? "d-rtl" : "d-ltr"
      } d-flex flex-row align-items-center `}
    >
      <img
        className="bg-container"
        src={`./public/images/${nameBgImg}.jpg`}
        alt=""
      />
      <MainContext.Provider
        value={{
          handelChangeLang,
          nameLocation,
          setNameLocation,
          setNameBgImg,
        }}
      >
        <MainPart />
        <InfoPart />
      </MainContext.Provider>
    </div>
  );
}

export default App;
