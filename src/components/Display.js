import "./Display.css";

const Display = (props) => {
  const data = props.data;
  const units = props.units;
  const location = props.location;
  const currLocation = props.currentLocation;

  return (
    data && (
      <div id="weather-display">
        <div id="location">
          {/* {data.name}, {data.sys.country} */}
          {/* {location} */}
          {currLocation}
        </div>
        <div id="curr-weather">
          <div id="curr-desc">{data.current.weather[0].description}</div>
          <img alt="weather-icon" src={`http://openweathermap.org/img/w/${data.current.weather[0].icon}.png`} />
        </div>
        <div id="curr-temp">
          {Math.round(data.current.temp)}
          {units === "metric" ? "°C" : units === "imperial" ? "°F" : "°K"}
        </div>
        <div id="feels-temp">
          Feels like: {Math.round(data.current.feels_like)}
          {units === "metric" ? "°C" : units === "imperial" ? "°F" : "°K"}
        </div>
        {/* <div id="high-low-temp">
          High: {Math.round(data.main.temp_max)}
          {units === "metric" ? "°C" : units === "imperial" ? "°F" : "°K"} Low: {Math.round(data.main.temp_min)}
          {units === "metric" ? "°C" : units === "imperial" ? "°F" : "°K"}
        </div> */}
        <div id="wind">
          Wind speed: {data.current.weather[0].wind_speed}{" "}
          {units === "metric" ? "m/sec" : units === "imperial" ? "ft/sec" : "°K"}
        </div>
      </div>
    )
  );
};

export default Display;
