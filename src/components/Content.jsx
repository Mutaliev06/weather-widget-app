import React, { useEffect, useState } from "react";
import { RiNavigationFill } from "react-icons/ri";
import { CgThermometer } from "react-icons/cg";
import Loader from "./Loader";
import axios from "axios";

const Content = ({ item, setOpen }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const tempNum = data.main && Math.floor(data.main.temp - 273.15);
  const humNum = data.main && data.main.humidity;
  const b = (Math.log10(humNum) + (7.5 * tempNum / (235 + tempNum))) - 2;
  const dewNum =  ((235 * b) / (7.5 - b)).toFixed(0);

  const [windSpeed, setWindSpeed] = useState("");
  const [windDeg, setWindDeg] = useState("");
  const windParam = data.wind && (data.wind.speed * 5 / 18 * 10).toFixed(1);
  const degParam = data.wind && data.wind.deg;
  
  useEffect(() => {
    setLoading(true);
    const getWeather = async () => {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${item.name}&appid=7611703e1032af42b08107f48e55e71d`
      );
      setData(res.data);
      setLoading(false);
    };
    getWeather();
  }, [setData]);

  useEffect(() => {
    if (windParam < 1.6) {
      setWindSpeed("Light air.");
    } else if (windParam > 1.6 && windParam <= 3.3) {
      setWindSpeed("Light breeze.");
    } else if (windParam > 3.3 && windParam <= 5.4) {
      return setWindSpeed("Gentle breeze.");
    } else if (windParam > 8.0 && windParam <= 10.7) {
      setWindSpeed("Fresh breeze.");
    }
  }, [data]);

  useEffect(() => {
    if (degParam === 0 && degParam <= 11.25 && degParam > 348.75) {
      setWindDeg("N");
    } else if (degParam > 11.25 && degParam <= 33.75) {
      setWindDeg("NNE");
    } else if (degParam > 33.75 && degParam <= 56.25) {
      setWindDeg("NE");
    } else if (degParam > 56.25 && degParam <= 78.75) {
      return setWindDeg("ENE");
    } else if (degParam > 78.75 && degParam <= 101.25) {
      setWindDeg("E");
    } else if (degParam > 101.25 && degParam <= 123.75) {
      setWindDeg("ESE");
    } else if (degParam > 123.75 && degParam <= 146.25) {
      return setWindDeg("SE");
    } else if (degParam > 146.25 && degParam <= 168.75) {
      setWindDeg("SSE");
    } else if (degParam > 168.75 && degParam <= 191.25) {
      setWindDeg("S");
    } else if (degParam > 191.25 && degParam <= 213.75) {
      setWindDeg("SSW");
    } else if (degParam > 213.75 && degParam <= 236.25) {
      return setWindDeg("SW");
    } else if (degParam > 236.25 && degParam <= 258.75) {
      setWindDeg("WSW");
    } else if (degParam > 258.75 && degParam <= 281.25) {
      setWindDeg("W");
    } else if (degParam > 281.25 && degParam <= 303.75) {
      setWindDeg("WNW");
    } else if (degParam > 303.75 && degParam <= 326.25) {
      return setWindDeg("NW");
    } else if (degParam > 326.25 && degParam <= 348.75) {
      setWindDeg("NNW");
    }
  }, [data]);

  return (
    <div className="content">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="content__title">
            <h2>
              {data.name}, {data.sys && data.sys.country}
            </h2>
          </div>
          <div className="content__body">
            <img
              src={`http://openweathermap.org/img/w/${
                data.weather && data.weather[0].icon
              }.png`}
              alt="icon"
            />
            <h1>{tempNum} &deg;С</h1>
          </div>
          <div className="content__info">
            <div className="content__info__title">
              <span>
                Feels like{" "}
                {data.main && Math.floor(data.main.feels_like - 273.15)}{" "}
                &deg;С.&nbsp;
                {data.weather &&
                  data.weather[0].description[0].toUpperCase() +
                    data.weather[0].description.slice(1)}
                .&nbsp;
                <span>{windSpeed}</span>
              </span>
            </div>
            <div className="content__info__subtitle">
              <div className="subtitle__speed">
                <RiNavigationFill />
                <span>
                  {windParam} m/s {windDeg}
                </span>
              </div>
              <div className="subtitle__therm">
                <CgThermometer />
                <span>{data.main && data.main.pressure} hPa</span>
              </div>
              <div className="subtitle__humidity">
                Humidity: <span>{humNum} %</span>{" "}
              </div>
              <div className="subtitle__dew">Dew point: {dewNum} &deg;С</div>
              <div className="subtitle__visibility">
                Visibility: {(data.visibility * 0.001).toFixed(1)}km
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Content;
