import React from "react";
import PropTypes from "prop-types";

export default function LanguagesNav({ selected, onUpdatedLanguage }) {
  const languages = ["All", "Javascript", "Ruby", "Java", "Python", "Css"];
  return (
    <ul className="flex-center">
      {languages.map(language => {
        return (
          <li key={language}>
            <button
              style={language === selected ? { color: "orange" } : null}
              className="btn-clear nav-link"
              onClick={() => onUpdatedLanguage(language)}
            >
              {language}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
LanguagesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdatedLanguage: PropTypes.func.isRequired
};
