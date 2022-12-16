import React from "react";

function Answers (props) {
  const getAnswer = (input) => {
    const results = [];
    for (const key in input.answers) {
      results.push(input.answers[key].body);
    }
    return results;
  }
  return (
    <h1>A: {getAnswer(props)}</h1>
  )
}

export default Answers;
