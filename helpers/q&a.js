const axios = require('axios');
const config = require('../config.js');
// require('dotenv').config()

const getQuestions = function (itemid) {
  // console.log('process:', process.env)
  const options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/:hr-rpp/qa/questions/`,
    headers: {
      Authorization: `${process.env.REACT_APP_GIT_API}`,
      'Content-Type': 'application/json'
    },
    params: {
      product_id: itemid,
      count: 10
    }
  };
  return axios.get(options.url, options)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('ERROR CAUGHT:', err);
    })
};

// const postAnswer = function (questionId, body, name, email) {
//   const options = {
//     url: `https://app-hrsei-api.herokuapp.com/api/fec2/:hr-rpp/qa/questions/:question_id/answers`,
//     headers: {
//       Authorization: `${process.env.GITHUB_API}`,
//       'Content-Type': 'application/json'
//     },
//     params: {
//       question_id: questionId
//     },
//     answerBody: {
//       body: 'This thing is alright',
//       name: 'The Tester',
//       email: 'thetester@rppmail.com'
//     }
//   };
//   return axios.post(options.url, options.answerBody, options.params)
//     .then((response) => {
//       // console.log('Posting successfully:', response);
//     })
//     .catch((error) => {
//       // console.log('Posting failed', error)
//     })
// }

module.exports.getQuestions = getQuestions;
// module.exports.postAnswer = postAnswer;
