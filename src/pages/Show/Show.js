import React from "react";
import Header from "../../components/Header";
import SearchBox from "../../components/SearchBox";
import api from "../../services/api";
import normalize from "../../services/normalize";
import Loader from "../../components/Loader";
import GoBackButton from "../../components/GoBackButton";
import "./Show.css";

class Show extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      asset: {},
      isLoading: true,
    };
  }
  componentDidMount() {
    console.log(this.props);
    const {
      match: {
        params: { id },
      },
    } = this.props;

    api
      .asset(id)
      .then((response) => {
        this.setState({ isLoading: false });
        this.setState({ asset: normalize.asset(response) });
        console.log(normalize.asset(response));
      })
      .catch((error) => {
        this.setState({ isLoading: false });
      });
  }

  handleSubmit = (query) => {
    const { history } = this.props;
    history.push(`/search/${query}`);
  };

  render() {
    const {
      isLoading,
      asset: {
        image,
        title,
        description,
        secondaryCreator: author,
        dateCreated: date,
      },
    } = this.state;

    const meta = [new Date(date).toLocaleDateString(), author].filter(
      (n) => !!n
    );

    const assetContent = (
      <div className="Show-content">
        <div className="Show-image">
          <img src={image} alt={title} title={title} />
        </div>
        <div className="Show-data">
          <GoBackButton text="return to search" />
          {title && <h1 className="Show-title">{title}</h1>}
          {meta.length && <p className="Show-meta">{meta.join(", ")}</p>}
          {description && <p className="Show-description">{description}</p>}
        </div>
      </div>
    );

    return (
      <div className="Show">
        <div className="Show-header">
          <Header>
            <SearchBox shadow={false} onSubmit={this.handleSubmit} />
          </Header>
        </div>
        {isLoading && <Loader />}
        {!isLoading && assetContent}
      </div>
    );
  }
}

export default Show;
