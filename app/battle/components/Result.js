import React from "react";
import { battle } from "../../utils/api";

import Card from "../../shared/Card";
import ProfileList from "./ProfileList";
import PropTypes from "prop-types";
import Loading from "../../shared/Loading";
import queryString from "query-string";
import { Link } from "react-router-dom";

function fetchReducer(state, action) {
  if (action.type === "playersLoaded") {
    return {
      winner: action.players[0],
      loser: action.players[1],
      loading: false,
      error: null
    };
  } else if (action.type === "error") {
    return {
      ...state,
      error: action.message,
      laoding: false
    };
  } else {
    throw new Error("no action type initialized");
  }
}
const initialState = {
  winner: null,
  loser: null,
  error: null,
  loading: true
};

export default function Result({ location }) {
  const [state, dispatch] = React.useReducer(fetchReducer, initialState);

  const { playerOne, playerTwo } = queryString.parse(location.search);

  React.useEffect(() => {
    battle([playerOne, playerTwo])
      .then(players => dispatch({ type: "playersLoaded", players }))
      .catch(({ message }) => dispatch({ type: "error", message }));
  }, [playerOne, playerTwo]);

  const { winner, loser, error, loading } = state;

  if (loading) {
    return <Loading text="Battleing" />;
  }

  if (error) {
    return <p className="center-text error">{error}</p>;
  }
  return (
    <>
      <div className="grid space-around container-sm">
        <Card
          header={winner.score === loser.score ? "Tie" : "Winner"}
          subheader={` Score: ${winner.score.toLocaleString()}`}
          avatar={winner.profile.avatar_url}
          href={winner.profile.html_url}
          name={winner.profile.login}
        >
          <ProfileList profile={winner.profile} />
        </Card>
        <Card
          header={winner.score === loser.score ? "Tie" : "Loser"}
          subheader={` Score: ${loser.score.toLocaleString()}`}
          avatar={loser.profile.avatar_url}
          href={loser.profile.html_url}
          name={loser.profile.login}
        >
          <ProfileList profile={loser.profile} />
        </Card>
      </div>
      <Link to="/battle" className="btn dark-btn btn-space">
        Reset
      </Link>
    </>
  );
}
