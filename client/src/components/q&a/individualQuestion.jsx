import React from "react";
import Answers from "./answers.jsx";

function IndividualQuestion (props) {
  return (
    <aside>
      <p> Q: {props.currentQuestion}</p>
      <small>{}<Answers answers={props.currentAnswer}/></small>
    </aside>
  )
}

export default IndividualQuestion;
