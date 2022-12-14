import React from "react";

function Answers (props) {
  const getAnswer = (input) => {
    const results = [];
    for (const key in input.currentAnswers) {
      // console.log('CURRENT ANSWER:', input.currentAnswers[key].body)
      results.push(input.currentAnswers[key].body);
    }
    console.log(results);
    return results;
  }
  return (
    <small>A: </small>
  )
}

export default Answers;
