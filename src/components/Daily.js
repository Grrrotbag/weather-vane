import "./Daily.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThermometerFull,
  faThermometerEmpty,
  faThermometerHalf,
  faWind,
  faCompass,
} from "@fortawesome/free-solid-svg-icons";

const Daily = (props) => {
  const data = props.data;
  const units = props.units;

  return (
    data && (
      <div id="daily">
        {data.daily.map((day) => {
          var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
          return (
            <div className="weather-card">
              <h4 className="title">{days[new Date(day.dt * 1000).getDay()]}</h4>
              <div className="container">
                <img alt="weather-icon" src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`} />
                <div className="low">
                  <FontAwesomeIcon icon={faThermometerEmpty} /> {Math.round(day.temp.min)}{" "}
                  {units === "metric" ? "°C" : units === "imperial" ? "°F" : "°K"}
                </div>
                <div className="high">
                  <FontAwesomeIcon icon={faThermometerFull} /> {Math.round(day.temp.max)}{" "}
                  {units === "metric" ? "°C" : units === "imperial" ? "°F" : "°K"}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    )
  );
};

export default Daily;
