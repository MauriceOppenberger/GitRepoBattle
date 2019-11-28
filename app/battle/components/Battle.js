import React from "react";
import Instructions from "./Instructions";
import PlayerInput from "./PlayerInput";
import PlayerPreview from "./PlayerPreview";
import Result from "./Result";

import { Link } from "react-router-dom";
import ThemeContext from "../../contexts/ThemeContext";

export default function Battle() {
  const [playerOne, setPlayerOne] = React.useState(null);
  const [playerTwo, setPlayerTwo] = React.useState(null);
  const [battle, setBattle] = React.useState(false);

  const { theme } = React.useContext(ThemeContext);

  // if (battle === true) {
  //   return (
  //     <Result
  //       playerOne={playerOne}
  //       playerTwo={playerTwo}
  //       onReset={() =>
  //         this.setState({ playerOne: null, playerTwo: null, battle: false })
  //       }
  //     />
  //   );
  // }
  return (
    <React.Fragment>
      <Instructions />

      <div className="players-container">
        <h1 className="center-text header-lg">Players</h1>
        <div className="row space-around">
          {playerOne === null ? (
            <PlayerInput
              label="Player One"
              onSubmit={player => setPlayerOne(player)}
              theme={theme}
            />
          ) : (
            <PlayerPreview
              username={playerOne}
              label="Player One"
              onReset={() => setPlayerOne(null)}
              theme={theme}
            />
          )}

          {playerTwo === null ? (
            <PlayerInput
              label="Player Two"
              onSubmit={player => setPlayerTwo(player)}
              theme={theme}
            />
          ) : (
            <PlayerPreview
              username={playerTwo}
              label="Player Two"
              onReset={() => setPlayerTwo(null)}
              theme={theme}
            />
          )}
        </div>

        {playerOne && playerTwo && (
          <Link
            className="btn dark-btn btn-space"
            to={{
              pathname: `/battle/results`,
              search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`
            }}
          >
            Battle
          </Link>
          // <button
          //   className="btn dark-btn btn-space"
          //   onClick={() => this.setState({ battle: true })}
          // >
          //   Battle
          // </button>
        )}
      </div>
    </React.Fragment>
  );
}
