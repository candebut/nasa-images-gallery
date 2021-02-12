import React from "react";
import api from "../../services/api";
import normalize from "../../services/normalize";
import Header from "../../components/Header";
import SearchBox from "../../components/SearchBox";
import Gallery from "../../components/Gallery";
import GalleryItem from "../../components/GalleryItem";
import Loader from "../../components/Loader";
import moment from "moment";
import "./Search.css";

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      assets: [],
      isLoading: true,
      startDate: undefined,
      endDate: undefined,
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { query, startDate, endDate },
      },
    } = this.props;

    this.searchAssets(query, startDate, endDate);
  }

  searchAssets(query, startDate, endDate) {
    this.setState({ isLoading: true });

    api
      .search(query)
      .then((response) => {
        this.setState({ isLoading: false });

        if (
          startDate > 0 &&
          startDate !== undefined &&
          startDate !== "" &&
          (endDate === undefined || endDate === "")
        ) {
          let result = normalize.search(response);
          result = result.filter(
            (res) => res.dateCreated.slice(0, 4) >= startDate
          );
          this.setState({ assets: result });
        } else if (
          endDate !== undefined &&
          endDate !== "" &&
          (startDate === undefined || startDate === "")
        ) {
          let result = normalize.search(response);
          result = result.filter(
            (res) => res.dateCreated.slice(0, 4) <= endDate
          );

          this.setState({ assets: result });
        } else if (
          startDate > 0 &&
          startDate !== undefined &&
          startDate !== "" &&
          endDate !== "" &&
          endDate !== undefined
        ) {
          let result = normalize.search(response);
          result = result.filter(
            (res) => res.dateCreated.slice(0, 4) >= startDate
          );
          result = result.filter(
            (res) => res.dateCreated.slice(0, 4) <= endDate
          );

          this.setState({ assets: result });
        } else {
          console.log("hi");
          this.setState({ assets: normalize.search(response) });
        }
      })
      .catch((error) => {
        this.setState({ isLoading: false });
      });
  }

  handleSubmit = (query, startDate, endDate) => {
    const { history } = this.props;
    history.push(`/search/${query}`);
    this.searchAssets(query, startDate, endDate);
  };

  render() {
    const {
      match: {
        params: { query = "" },
      },
    } = this.props;
    const { assets, isLoading } = this.state;

    const galleryItems = assets.map(({ image, nasaId, title }) => {
      return (
        <GalleryItem image={image} id={nasaId} key={nasaId} title={title} />
      );
    });

    const seachContent = () => {
      if (isLoading) return <Loader />;

      if (assets.length > 0) return <Gallery>{galleryItems}</Gallery>;

      if (assets.length === 0)
        return (
          <p className="search-error">
            Ooops, we haven't found anything in the space, please search with
            other term.
          </p>
        );
    };

    return (
      <div className="search">
        <div className="search-header">
          <Header>
            <SearchBox
              onSubmit={this.handleSubmit}
              shadow={false}
              query={query}
              startDate={this.state.startDate}
              endDate={this.state.end}
            />
          </Header>
        </div>
        <div className="search-content">{seachContent()}</div>
      </div>
    );
  }
}

export default Search;
