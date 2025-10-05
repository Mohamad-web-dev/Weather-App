import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { handelAction } from "../../redux/weather/weatherAction";
import { useContext } from "react";
import { MainContext } from "../context/mainContext";

const InfoPart = () => {
  const { nameLocation, setNameLocation, setNameBgImg } =
    useContext(MainContext);
  const { t, i18n } = useTranslation();
  const { data } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handelSearch = (e) => {
    e.preventDefault();
    const dataLang = i18n.language;
    dispatch(handelAction(nameLocation, dataLang, setNameBgImg));
  };

  return (
    <div className="infoPart h-100 py-5 px-5 d-flex flex-column justify-content-center gap-5">
      <div className="form-part w-100 d-flex flex-column gap-3 align-items-start">
        <form
          onSubmit={handelSearch}
          className="w-100 position-relative"
          action="#"
        >
          <input
            className="input-search w-100"
            type="text"
            value={nameLocation}
            onChange={(e) => setNameLocation(e.target.value)}
            placeholder={`${t("search-location")}...`}
          />
          <button className="submit-btn" type="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
        {data.error !== "" ? (
          <span className="text-danger text-center">
            {t("the location is false 404 ERROR")}
          </span>
        ) : null}
      </div>
      <div className="info-part d-flex flex-column gap-4">
        <div className="title h-auto">
          <p className="info-part-title">{t("weather-details") + "..."}</p>
        </div>
        <div className="weather-desc text-color ">{data.weatherDesc}</div>
        <div className="weather-info">
          <ul className="list list-unstyled d-flex flex-column gap-4">
            <li className="list-item text-color d-flex flex-row align-items-center justify-content-between">
              <span> {t("temp-max")}</span>
              <div className="list-item-info d-flex gap-4">
                <span>{`${Math.round(data.tempMax)}°`}</span>
                <img
                  src="./src/assets/Vector (1).svg"
                  width="12"
                  height="22"
                  alt=""
                />
              </div>
            </li>
            <li className="list-item text-color d-flex flex-row align-items-center justify-content-between">
              <span> {t("temp-main")}</span>
              <div className="list-item-info d-flex gap-4">
                <span>{`${Math.round(Number(data.tempMin))}°`}</span>
                <img
                  src="./src/assets/Vector (2).svg"
                  width="12"
                  height="22"
                  alt=""
                />
              </div>
            </li>
            <li className="list-item text-color d-flex flex-row align-items-center justify-content-between">
              <span> {t("humidity")}</span>
              <div className="list-item-info d-flex gap-4">
                <span>{`${Math.round(Number(data.humidity))}%`}</span>
                <img
                  src="./src/assets/outline (2).svg"
                  width="12"
                  height="22"
                  alt=""
                />
              </div>
            </li>{" "}
            <li className="list-item text-color d-flex flex-row align-items-center justify-content-between">
              <span> {t("clouds")}</span>
              <div className="list-item-info d-flex gap-4">
                <span>{`${Math.round(Number(data.clouds))}%`}</span>
                <img
                  src="./src/assets/outline.svg"
                  width="12"
                  height="22"
                  alt=""
                />
              </div>
            </li>{" "}
            <li className="list-item text-color d-flex flex-row align-items-center justify-content-between">
              <span> {t("wind")}</span>
              <div className="list-item-info d-flex gap-4">
                <span>{`${Math.round(Number(data.wind))}km/h`}</span>
                <img
                  src="./src/assets/outline (1).svg"
                  width="12"
                  height="22"
                  alt=""
                />
              </div>
            </li>{" "}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InfoPart;
