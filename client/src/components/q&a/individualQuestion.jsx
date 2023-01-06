import React from "react";
import Answers from "./answers.jsx";

function IndividualQuestion(props) {
  const getKey = function (input) {
    const result = [];
    for (const keys in input) {
      result.push(keys)
    }
    return result;
  }
  return (
    <aside>
      {/* { getKey(props.currentAnswers).map((curr) => (console.log(curr)))} */}
      {console.log(props)}
      <h2> Q: {props.currentQuestion}</h2>
      <div><Answers currentAnswers={props.currentAnswers} /></div>
    </aside>
  )
}

// key={getKey(props.currentAnswers).map((curr) => (curr))}
export default IndividualQuestion;
