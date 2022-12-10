import React from "react";
import sampleData from "./fixtures/sampleData"
import IndividualQuestion from "./individualQuestion.jsx"
const getQuestions = require('../../../../helpers/q&a.js');

class QuestionAnswers extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount () {
    getQuestions.getQuestions(1);
  };

  render () {
    return (
      <div>
        <h1>
          Q&A
        </h1>
        <input
          id="QuestionSearch"
          type="text"
          placeholder="Have a Question?"
        />
        <div id="QuestionList">
          {/* <p>{sampleData.results.map((curr) => console.log('1 question', curr))}</p> */}
          <h4 id="Question">
            {sampleData.results.map((current) => (
              <IndividualQuestion key={current.question_id} currentQuestion={current.question_body} currentAnswer={current.answers} />
            ))}
          </h4>
        </div>
        <div id="AdditionalButtons">
          <button>More Answered Questions</button>
          <button>Ask a New Question</button>
        </div>

      </div>
    )
  }
}

export default QuestionAnswers;
