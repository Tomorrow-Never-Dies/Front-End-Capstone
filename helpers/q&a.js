const axios = require('axios');
const config = require('../config.js');

const getQuestions = function (itemid) {
  const options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/:hr-rpp/qa/questions/`,
    headers: {
      Authorization: `${config.TOKEN}`,
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

// const getAnswers = function (question_id) {
//   const options = {
//     url: `https://app-hrsei-api.herokuapp.com/api/fec2/:hr-rpp/qa/questions/${71697}/answers`,
//     headers: {
//       Authorization: `${config.TOKEN}`,
//       'Content-Type': 'application/json'
//     },
//     params: {
//       question_id: 71697,
//       page: 1,
//       count: 5
//     }
//   };
//   return axios.get(options.url, options)
//     .then((res) => {
//       return res;
//     })
//     .catch((err) => {
//       console.log('ERROR GETTING ANSWERS:', err)
//     })
// }

module.exports.getQuestions = getQuestions;
//module.exports.getAnswers = getAnswers;
