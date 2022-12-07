const axios = require('axios')
const config = require('../config.js');

const apiOptions = (itemid) => {
  const options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/:hr-rpp/reviews/?product_id=${itemid}`,
    headers: {
      'User-Agent': ' request',
      Authorization: `${config.TOKEN}`
    }
  }
  return options;
}
const getReviews = (itemid) => {
  const options = apiOptions(itemid)
  return axios.get(options.url, options)
    .then((response) => {
      console.log(`response is equal to ${JSON.stringify(response.data)}`);
      return response.data
    })
}

const addReviews = (review) => {
  const options = apiOptions(review.product_id)
  return axios.post(options.url, options)
    .then((response) => {
      console.log(`addReviews response is equal to ${JSON.stringify(response.data)}`);
      return response.data
    })
}
module.exports.getReviews = getReviews
