import React from "react";

function Answers (props) {
  const getAnswer = (input) => {
    const results = [];
    for (const key in input.answers) {
      console.log('CURRENT ANSWER:', input.answers[key].body)
      results.push(input.answers[key].body);
    }
    return results;
  }
  return (
    <h1>A: {getAnswer(props)}</h1>
  )
}

export default Answers;
