import React from "react";
import LanguagesNav from "./LanguagesNav";
import ReposGrid from "./ReposGrid";
import { fetchPopularRepos } from "../../utils/api";
import Loading from "../../shared/Loading";

export default class Popular extends React.Component {
  state = {
    activeLanguage: "All",
    repos: {},
    error: null
  };

  componentDidMount() {
    this.handleChangeLanguage(this.state.activeLanguage);
  }
  handleChangeLanguage = activeLanguage => {
    this.setState({
      activeLanguage,
      error: null
    });

    if (!this.state.repos[activeLanguage]) {
      fetchPopularRepos(activeLanguage)
        .then(data => {
          this.setState(({ repos }) => ({
            repos: {
              ...repos,
              [activeLanguage]: data
            }
          }));
        })
        .catch(() => {
          console.warn("Error fetching rpos: ", error);

          this.setState({
            error: "There was an error fetching the repositories"
          });
        });
    }
  };
  isLoading = () => {
    const { activeLanguage, repos, error } = this.state;
    return !repos[activeLanguage] && error === null;
  };
  render() {
    const { activeLanguage, repos, error } = this.state;

    return (
      <React.Fragment>
        <LanguagesNav
          selected={activeLanguage}
          onUpdatedLanguage={this.handleChangeLanguage}
        />
        {this.isLoading() && <Loading text="Fetching data" />}

        {error && <p className="center-text error">{error}</p>}

        {repos[activeLanguage] && <ReposGrid repos={repos[activeLanguage]} />}
      </React.Fragment>
    );
  }
}
