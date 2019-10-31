import React from "react";
import PropTypes from "prop-types";

export default class PlayerInput extends React.Component {
  static propsTypes = {
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    theme: PropTypes.string.isRequired
  };
  state = {
    username: ""
  };
  handleSubmit = e => {
    event.preventDefault();
    this.props.onSubmit(this.state.username);
  };
  handleChange = e => {
    this.setState({
      username: e.target.value
    });
  };

  render() {
    const { label, theme } = this.props;
    return (
      <form className="column-player" onSubmit={this.handleSubmit}>
        <label htmlFor="username" className="player-label">
          {label}
        </label>
        <div className=" row player-inputs">
          <input
            type="text"
            id="username"
            className={`input-${theme}`}
            placeholder="github-username"
            autoComplete="off"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <button
            className={`btn ${theme === "dark" ? "light-btn" : "dark-btn"}`}
            type="submit"
            disabled={!this.state.username}
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}
