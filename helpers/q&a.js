const axios = require('axios');
const config = require('../config.js');

const getQuestions = function (itemid) {
  const options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/:hr-rpp/qa/questions/`,
    headers: {
      Authorization: `${config.TOKEN}`,
      body: {}
    }
  };
  return axios.get(options.url, )
    .then((res) => {
      console.log('HERE IS THE RESPONSE:', res)
      return res;
    })
    .catch((err) => {
      console.log('ERROR CAUGHT:', err);
    })
};

module.exports.getQuestions = getQuestions;
