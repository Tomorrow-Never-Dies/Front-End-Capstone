import React from "react";
import sampleData from "./fixtures/sampleData"
import IndividualQuestion from "./individualQuestion.jsx"
import Answers from "./answers.jsx"
import QuestionModal from "./questionModal.jsx";
import './q&a.css';
const getQuestions = require('../../../../helpers/q&a.js');

class QuestionAnswers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      item_id: this.props.id,
      questions: [],
      show: false
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  componentDidMount () {
    getQuestions.getQuestions(this.state.item_id)
      .then((result) => {
        this.setState({
          questions: result.data.results
        })
      });
  };

  componentWillReceiveProps (nextProps) {
    if (nextProps.id !== this.state.item_id) {
      this.setState({
        item_id: nextProps.id
      }, () => {
        getQuestions.getQuestions(this.state.item_id)
          .then((newResult) => {
            this.setState({
              questions: newResult.data.results
            })
          })
      })
    }
  }

  showModal () {
    this.setState({ show: true });
  }

  hideModal () {
    this.setState({ show: false });
  }

  render () {
    return (
      <div className="entire-widget">
        <h1 className="header">
          Q&A
        </h1>
        {/* <input
          id="QuestionSearch"
          type="text"
          placeholder="Have a Question?"
        /> */}
        <div className="QuestionList">
          <h4 id="Question">
            {this.state.questions.map((current) => (
              <IndividualQuestion key={current.question_id} questionKey={current.question_id} currentQuestion={current.question_body} currentAnswers={current.answers} />
            ))}
          </h4>
        </div>
        <div id="AdditionalButtons">
          <button>More Answered Questions</button>
          <button type="button" onClick={this.showModal}>Ask a New Question</button>
          <QuestionModal show={this.state.show} handleClose={this.hideModal}>
            <form>
              <label>
                Question:
                <input type='text' name="question" required />
              </label>
              <label>
                Nickname:
                <input type='text' name='nickname' required />
              </label>
              <label>
                Email:
                <input type='text' name='email' required />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </QuestionModal>
        </div>

      </div>
    )
  }
}
export default QuestionAnswers;
