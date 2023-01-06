import React, { useState } from "react";
import './q&a.css';

function Answers(props) {
  // console.log('Answer props:', props)
  const getAnswer = (input) => {
    const results = [];
    for (const key in input.currentAnswers) {
      results.push(input.currentAnswers[key]);
    }
    return results;
  }
  // Need to pass Answer Author to props, create an iteratable structure for both Answer & Author pairs
  return (
    <p>
      {getAnswer(props).map((curr) => (
        <div className='answers'>
          A: {curr.body}
          <div>
            <small>
              by {curr.answerer_name}, {new Date(curr.date).toLocaleDateString('en-US', { year: "numeric", month: "long", day: "numeric" })} | Helpful? <span>Yes</span> {'(' + curr.helpfulness + ')'}
            </small>
          </div>
        </div>

      ))}
    </p>
  )
}


export default Answers;
