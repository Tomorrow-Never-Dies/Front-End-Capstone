import React from "react";


function IndividualQuestion(props) {

  const getCurrentAnswer = (input) => {
    var answerKeys = Object.keys(input.currentAnswer);
    for (var i = 0; i < answerKeys.length; i++) {
      var oneAnswer = input.currentAnswer[answerKeys[i]].body
      console.log(oneAnswer);
      return oneAnswer;
    }
  }

  return (
    <aside>
      <p> Q: { props.currentQuestion }</p>
      <small> A: { getCurrentAnswer(props)}</small>
    </aside>
  )
}

export default IndividualQuestion;