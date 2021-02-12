import React from "react";
import PropTypes from "prop-types";
import SearchBoxIcon from "./SearchBoxIcon";
import "./SearchBox.css";

class SearchBox extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    query: PropTypes.string,
    shadow: PropTypes.bool,
  };

  static defaultProps = {
    onSubmit: () => {},
    query: "",
    shadow: true,
    startDate: undefined,
    endDate: undefined,
  };

  constructor(props) {
    super(props);
    const { query } = this.props;

    this.state = {
      query: query || "",
    };
  }

  handleChange = (e) =>
    this.setState({
      query: e.target.value,
    });

  handleStartDate = (e) =>
    this.setState({
      startDate: e.target.value,
    });

  handleEndDate = (e) =>
    this.setState({
      endDate: e.target.value,
    });

  handleSubmit = (e) => {
    if (e) e.preventDefault();

    const { onSubmit } = this.props;
    const { query, startDate, endDate } = this.state;

    if (query) {
      onSubmit(query, startDate, endDate);
    }
  };

  render() {
    const { query } = this.state;
    const { shadow } = this.props;

    return (
      <form
        className={`SearchBox ${shadow ? "SearchBox--withShadow" : ""}`}
        onSubmit={this.handleSubmit}
      >
        <input
          value={query}
          onChange={this.handleChange}
          className="SearchBox-input"
          placeholder="Lets discover the space!"
        />
        <button className="SearchBox-submitButton">
          <SearchBoxIcon />
        </button>
        <div className="date-box">
          <input
            className="date-input"
            value={this.state.startDate}
            type="number"
            placeholder="From"
            onChange={this.handleStartDate}
          />
          <input
            className="date-input"
            value={this.state.endDate}
            type="number"
            placeholder="To"
            onChange={this.handleEndDate}
          />
        </div>
      </form>
    );
  }
}

export default SearchBox;
