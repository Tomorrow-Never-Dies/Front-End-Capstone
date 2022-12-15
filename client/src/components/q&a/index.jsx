import React from "react";
import sampleData from "./fixtures/sampleData"
import IndividualQuestion from "./individualQuestion.jsx"
import Answers from "./answers.jsx"
const getQuestions = require('../../../../helpers/q&a.js');
const getAnswers = require('../../../../helpers/q&a.js');

class QuestionAnswers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      item_id: 71699,
      questions: []
    }
  }

  componentDidMount () {
    getQuestions.getQuestions(this.state.item_id)
      .then((result) => {
        this.setState({
          questions: result.data.results
        })
      });
    // getAnswers.getAnswers(this.state.item_id)
    //   .then((result) => {
    //     console.log('HERE ARE ANSWER RESULTS:', result)
    //   })
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
          {/* {console.log('WE HAVE QUESTIONS:', this.state.questions)} */}
          <h4 id="Question">
            {this.state.questions.map((current) => (
              <IndividualQuestion key={current.question_id} currentQuestion={current.question_body} />
            ))}
          </h4>
          <h4 id="Answers">
            {this.state.questions.map((current) => (
              <Answers currentAnswers={current.answers}/>
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
