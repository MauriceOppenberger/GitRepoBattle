import React from "react";
import PropTypes from "prop-types";

const style = {
  content: {
    fontSize: "35px",
    position: "absolute",
    left: "0",
    right: "0",
    marginTop: "20px",
    textAlign: "center"
  }
};

export default function Loading(props) {
  const [content, setContent] = React.useState(props.text);

  const { text, speed } = props;
  React.useEffect(() => {
    console.log("useEffect");
    const interval = window.setInterval(() => {
      setContent(content => {
        return content === `${text}...` ? text : `${content}.`;
      });
    }, speed);
    return () => {
      window.clearInterval(interval);
    };
  }, [text, speed]);

  return <p style={style.content}>{content}</p>;
}

Loading.propTypes = {
  text: PropTypes.string,
  speed: PropTypes.number
};
Loading.defaultProps = {
  text: "Loading",
  speed: 300
};
