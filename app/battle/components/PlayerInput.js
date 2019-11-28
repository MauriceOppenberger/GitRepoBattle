import React from "react";
import PropTypes from "prop-types";

export default function PlayerInput(props) {
  const [username, setUsername] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    props.onSubmit(username);
  };
  const { label, theme } = props;
  return (
    <form className="column-player" onSubmit={handleSubmit}>
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
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <button
          className={`btn ${theme === "dark" ? "light-btn" : "dark-btn"}`}
          type="submit"
          disabled={!username}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
PlayerInput.propsTypes = {
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired
};
