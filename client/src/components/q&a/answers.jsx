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
    <div>
      {getAnswer(props).map((curr) => (
        <div className='answers'>
          A: {curr.body}
          <div>
            <sub className='subscript'>
              by {curr.answerer_name}, {new Date(curr.date).toLocaleDateString('en-US', { year: "numeric", month: "long", day: "numeric" })} | Helpful? <span>Yes</span> {'(' + curr.helpfulness + ')'}
            </sub>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Answers;
