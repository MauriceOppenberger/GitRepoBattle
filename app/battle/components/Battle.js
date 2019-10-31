import React from "react";
import Instructions from "./Instructions";
import PlayerInput from "./PlayerInput";
import PlayerPreview from "./PlayerPreview";
import Result from "./Result";
import { ThemeConsumer } from "../../contexts/Theme";
import { Link } from "react-router-dom";

export default class Battle extends React.Component {
  state = {
    playerOne: null,
    playerTwo: null,
    battle: false
  };

  handleSubmit = (id, player) => {
    this.setState({
      [id]: player
    });
  };
  handleReset = id => {
    this.setState({
      [id]: null
    });
  };
  render() {
    const { playerOne, playerTwo } = this.state;

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
      <ThemeConsumer>
        {({ theme }) => (
          <React.Fragment>
            <Instructions theme={theme} />

            <div className="players-container">
              <h1 className="center-text header-lg">Players</h1>
              <div className="row space-around">
                {playerOne === null ? (
                  <PlayerInput
                    label="Player One"
                    onSubmit={player => this.handleSubmit("playerOne", player)}
                    theme={theme}
                  />
                ) : (
                  <PlayerPreview
                    username={playerOne}
                    label="Player One"
                    onReset={() => this.handleReset("playerOne")}
                    theme={theme}
                  />
                )}

                {playerTwo === null ? (
                  <PlayerInput
                    label="Player Two"
                    onSubmit={player => this.handleSubmit("playerTwo", player)}
                    theme={theme}
                  />
                ) : (
                  <PlayerPreview
                    username={playerTwo}
                    label="Player Two"
                    onReset={() => this.handleReset("playerTwo")}
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
        )}
      </ThemeConsumer>
    );
  }
}
