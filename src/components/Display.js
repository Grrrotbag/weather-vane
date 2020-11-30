import Daily from "./Daily";
import "./Display.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThermometerFull,
  faThermometerEmpty,
  faThermometerHalf,
  faWind,
  faCompass,
} from "@fortawesome/free-solid-svg-icons";

const Display = (props) => {
  const data = props.data;
  const units = props.units;
  const location = props.currentLocation;

  return (
    data && (
      <div id="weather-display">
        <div id="location">{location}</div>
        <div id="current">
          <div id="curr-weather">
            <div id="curr-desc">{data.current.weather[0].description}</div>
            <img alt="weather-icon" src={`http://openweathermap.org/img/w/${data.current.weather[0].icon}.png`} />
          </div>
          <div id="curr-temp">
            <FontAwesomeIcon icon={faThermometerHalf} />
            <span>&nbsp;</span>
            {Math.round(data.current.temp)}
            {units === "metric" ? "°C" : units === "imperial" ? "°F" : "°K"}
          </div>
          <div id="feels-temp">
            Feels like: {Math.round(data.current.feels_like)}
            {units === "metric" ? "°C" : units === "imperial" ? "°F" : "°K"}
          </div>
          <div id="high-low-temp">
            <span id="low">
              <FontAwesomeIcon icon={faThermometerEmpty} /> {Math.round(data.daily[0].temp.min)}
              {units === "metric" ? "°C" : units === "imperial" ? "°F" : "°K"}
            </span>
            <span>&nbsp;&nbsp;&nbsp;</span>
            <span id="high">
              <FontAwesomeIcon icon={faThermometerFull} /> {Math.round(data.daily[0].temp.max)}
              {units === "metric" ? "°C" : units === "imperial" ? "°F" : "°K"}
            </span>
          </div>
          <div id="wind">
            <FontAwesomeIcon icon={faWind} />
            {data.current.wind_speed} {units === "metric" ? "m/sec" : units === "imperial" ? "mph" : "m/sec"}
            <span>&nbsp;</span>
            <FontAwesomeIcon icon={faCompass} />
            {data.current.wind_deg}°
          </div>
        </div>
        <div id="alerts">
          {data.alerts && data.alerts.sender_name}
          {data.alerts && data.alerts.event}
          {data.alerts && data.alerts.start}
          {data.alerts && data.alerts.end}
          {data.alerts && data.alerts.description}
        </div>
        <Daily data={props.data} units={props.units} />
      </div>
    )
  );
};

export default Display;
