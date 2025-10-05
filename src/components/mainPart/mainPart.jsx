import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const MainPart = ({ handelChangeLang }) => {
  const {i18n} = useTranslation()
  const { data } = useSelector((state) => state);

  return (
    <div className="main-part-container h-100 d-flex flex-column justify-content-between">
      <div className="logo w-100 d-flex flex-row justify-content-between p-4">
        <img src="./public/images/logo.svg" alt="" />

        <button
          onClick={handelChangeLang}
          className="btn-change-ln"
          type="button"
        >
          {i18n.language === "en" ? "فارسی" : "English"}
        </button>
      </div>
      <div className="info-weather p-2 m-5 d-flex flex-row align-items-center justify-align-content-sm-between gap-3">
        <h1 className="title-temp text-color">{Math.round(data.temp)}°</h1>

        <div className="d-flex w-100 flex-row align-items-center justify-content-between gap-3">
          <div className="text-color d-flex flex-column flex-wrap align-items-start justify-content-center">
            <h3 className="title-name text-color">{data.name}</h3>
            <div className="d-flex flex-row gap-2">
              <h4 className="title-weather">{data.weather}</h4>
              <p className="title-weatherDocs">{data.weatherDesc}</p>
            </div>
          </div>
          <img
            src={`http://openweathermap.org/img/wn/${data.weatherIcon}@2x.png`}
            alt=""
          />
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default MainPart;
