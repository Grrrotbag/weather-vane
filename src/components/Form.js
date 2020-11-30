import "./Form.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Form = (props) => {
  return (
    <div id="search-form">
      <form onSubmit={props.clickSearch}>
        <input id="search-box" type="text" placeholder={props.currentLocation} onChange={props.handleSearch} />
        <button id="submit-btn" type="submit" value="Search">
          <FontAwesomeIcon icon={faSearch} />
        </button>
        <div id="unit-select" onChange={props.setUnits}>
          <input type="radio" value="metric" defaultChecked name="units" /> Metric
          <input type="radio" value="imperial" name="units" /> Imperial
          <input type="radio" value="scientific" name="units" /> Scientific
        </div>
      </form>
    </div>
  );
};

export default Form;
