import React from "react";

function Answers(props) {
  const getAnswer = (input) => {
    const results = [];
    for (const key in input.currentAnswers) {
      // console.log('CURRENT PROPS:', input);
      // console.log('CURRENT ANSWER:', input.currentAnswers[key].body)
      results.push(input.currentAnswers[key].body);
    }
    return results;
  }
  // Need to pass Answer Author to props, create an iteratable structure for both Answer & Author pairs
  return (
    <small>
      {/* {console.log(props)} */}
      {getAnswer(props).map((curr) => (
        <div>A: {curr}</div>
      ))}
    </small>
  )
}

export default Answers;
