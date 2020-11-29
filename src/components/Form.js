import "./Form.css";

const Form = (props) => {
  // const city = props.city;

  return (
    <div id="search-form">
      <form onSubmit={props.callApi}>
        <input type="text" onChange={props.handleSearch} />
        <input type="submit" value="Search" />
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
