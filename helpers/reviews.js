const axios = require('axios')
const config = require('../config.js');

const apiOptions = (itemid) => {
  const options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/:hr-rpp/reviews/?product_id=${itemid}`,
    headers: {
      Authorization: `${config.TOKEN}`,
      body: {}
    }
  }
  return options;
}
const getReviews = (itemid) => {
  const options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/:hr-rpp/reviews/?product_id=${itemid}`,
    headers: {
      Authorization: `${config.TOKEN}`,
      body: {}
    }
  }
  return axios.get(options.url, {})
    .then((response) => {
      console.log(`response is equal to ${JSON.stringify(response.data)}`);
      return response.data
    })
    .catch((err) => {
      console.log(`err while gettingreviews in helper function ${err}`);
    })
}

const addReviews = (review) => {
  // const options = apiOptions(1)
  // console.log(`options is equal to ${JSON.stringify(options)}`);
  const options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/:hr-rpp/reviews/`,
    headers: {
      Authorization: `${config.TOKEN}`
    }
  }
  const sampleReview = {product_id: 1, rating: 1, summary: 'awesome!', body : 'testing',recommend: true,
  name: 'Andy', email: 'andy@test.com', photos:[], characteristics:{'14':1, '15':2, '16':3}}

  return axios.post(options.url, sampleReview, options)
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      console.log(`err code is equal to ${err}`);
      console.log(`err found while axios.post reviews : ${err.response.data}`);
    })
}
module.exports.getReviews = getReviews;
module.exports.addReviews = addReviews;
