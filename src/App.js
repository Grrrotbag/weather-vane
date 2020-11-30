import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Display from "./components/Display";
import Form from "./components/Form";

const weatherApiKey = `${process.env.REACT_APP_WEATHER_API}`;
const geocodeApiKey = `${process.env.REACT_APP_GEOCODE_API}`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUnits: "metric",
      selectedUnits: "metric",
      currentCity: "Current Location",
      searchString: "Current Location",
      lat: null,
      lon: null,
      data: null,
    };
  }

  componentDidMount() {
    let latitude, longitude;

    let success = (position) => {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      console.log(latitude, longitude);
      this.setState(
        {
          lat: latitude,
          lon: longitude,
        },
        () => {
          this.getWeatherData();
        }
      );
      console.log(this.state);
    };

    function error() {
      console.log("unable to retrieve location");
    }

    navigator.geolocation.getCurrentPosition(success, error);
  }

  setUnits(event) {
    this.setState({
      selectedUnits: event.target.value,
    });
  }

  handleSearch(event) {
    this.setState({
      searchString: event.target.value,
    });
  }

  getCity(searchString) {
    const geocode = `https://eu1.locationiq.com/v1/search.php?key=${geocodeApiKey}&q=${searchString}&format=json`;

    fetch(geocode)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.setState({
          lat: json[0].lat,
          lon: json[0].lon,
        });
        console.log(this.state.lat, this.state.lon);
      });

    console.log(this.state.lat, this.state.lon);
  }

  getWeatherData() {
    const { currentUnits, selectedUnits, searchString, lat, lon } = this.state;
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${
      selectedUnits ? selectedUnits : currentUnits
    }&appid=${weatherApiKey}`;
    console.log(url);

    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.setState({
          data: json,
          currentUnits: selectedUnits,
          currentCity: searchString,
        });
      });
  }

  clickSearch(event) {
    const { searchString } = this.state;
    this.getCity(searchString);

    this.getWeatherData(event);

    event.preventDefault();
  }

  render() {
    let { currentCity, data, currentUnits, searchString } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Weather Vane</p>
        </header>
        <main id="body-container">
          <Form
            currentLocation={currentCity}
            setUnits={this.setUnits.bind(this)}
            handleSearch={this.handleSearch.bind(this)}
            clickSearch={this.clickSearch.bind(this)}
          />
          <Display data={data} units={currentUnits} location={searchString} currentLocation={currentCity} />
        </main>
      </div>
    );
  }
}

export default App;
