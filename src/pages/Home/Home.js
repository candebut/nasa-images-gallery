import React from "react";
import { withRouter } from "react-router-dom";
import SearchBox from "../../components/SearchBox";
import "./Home.css";

export class Home extends React.Component {
  handleSubmit = (query) => {
    const { history } = this.props;
    history.push(`/search/${query}`);
  };

  render() {
    return (
      <div className='Home'>
        <div className="Home-content">
            <h1 className="Home-title">Welcome to the NASA bank of images!</h1>
          <SearchBox onSubmit={this.handleSubmit} />
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
