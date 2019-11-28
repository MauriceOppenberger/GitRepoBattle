import React from "react";
import LanguagesNav from "./LanguagesNav";
import ReposGrid from "./ReposGrid";
import { fetchPopularRepos } from "../../utils/api";
import Loading from "../../shared/Loading";

function fetchReducer(state, action) {
  if (action.type === "dataLoaded") {
    return {
      ...state,
      repos: {
        ...state.repos,
        [action.activeLanguage]: action.data
      },
      error: null
    };
  } else if (action.type === "error") {
    return {
      ...state,
      error: action.message
    };
  } else {
    throw new Error("no action type initialized");
  }
}

export default function Popular() {
  const [state, dispatch] = React.useReducer(fetchReducer, {
    repos: {},
    error: null
  });
  const [activeLanguage, setActiveLanguage] = React.useState("All");

  const fetchedLanguages = React.useRef([]);

  React.useEffect(() => {
    console.log("useEffect");
    if (fetchedLanguages.current.includes(activeLanguage) === false) {
      fetchedLanguages.current.push(activeLanguage);
      fetchPopularRepos(activeLanguage)
        .then(data => dispatch({ type: "dataLoaded", activeLanguage, data }))
        .catch(({ message }) => dispatch({ type: "error", message }));
    }
  }, [fetchedLanguages, activeLanguage]);

  const { repos, error } = state;

  const isLoading = () => {
    return !repos[activeLanguage] && error === null;
  };

  console.log(state);
  return (
    <React.Fragment>
      <LanguagesNav
        selected={activeLanguage}
        onUpdatedLanguage={setActiveLanguage}
      />
      {isLoading() && <Loading text="Fetching data" />}

      {error && <p className="center-text error">{error}</p>}

      {repos[activeLanguage] && <ReposGrid repos={repos[activeLanguage]} />}
    </React.Fragment>
  );
}
