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
      currentCity: "Hertford, uk",
      // country: "uk",
      searchString: "Hertford, uk",
      lat: 53.4794892,
      lon: -2.2451148,
      data: null,
    };
  }
  componentDidMount() {
    // const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.lat}&lon=${this.state.lon}&exclude=${this.state.excl}&appid=${apiKey}`;
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.city},${this.state.country}&units=${this.state.currentUnits}&appid=${weatherApiKey}`;
    // fetch(url)
    //   .then((response) => response.json())
    //   .then((json) => {
    //     this.setState({
    //       data: json,
    //     });
    //     console.log(json, this.state.data);
    //   });
    // this.callApi();const { selectedUnits, searchString, lat, lon } = this.state;
    const { currentUnits, selectedUnits, searchString, lat, lon } = this.state;
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

    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${
      selectedUnits ? selectedUnits : currentUnits
    }&appid=${weatherApiKey}`;
    console.log(url);
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=${
    //   selectedUnits ? selectedUnits : currentUnits
    // }&appid=${weatherApiKey}`;

    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.setState({
          data: json,
          currentUnits: selectedUnits,
        });
      });
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

  callApi(event) {
    const { currentUnits, selectedUnits, searchString, lat, lon } = this.state;
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

    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${
      selectedUnits ? selectedUnits : currentUnits
    }&appid=${weatherApiKey}`;
    console.log(url);
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=${
    //   selectedUnits ? selectedUnits : currentUnits
    // }&appid=${weatherApiKey}`;

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
    event.preventDefault();
  }

  render() {
    let { city, currentCity, data, currentUnits, searchString } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Weather Vane</p>
        </header>
        <main id="body-container">
          <Display data={data} units={currentUnits} location={searchString} currentLocation={currentCity} />
          <Form
            city={city}
            setUnits={this.setUnits.bind(this)}
            handleSearch={this.handleSearch.bind(this)}
            callApi={this.callApi.bind(this)}
          />
        </main>
      </div>
    );
  }
}

export default App;
