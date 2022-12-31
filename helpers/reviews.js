const axios = require('axios')
const config = require('../config.js');

const apiOptions = (itemid) => {
  const id = 71697
  const filter = 'relevant'
  const options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/?product_id=${id}`,
    headers: {
      Authorization: `${process.env.GITHUB_API}`,
      body: {}
    }
  }
  return options;
}
const getReviews = (itemid) => {
  const options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews?product_id=${itemid}`,
    headers: {
      Authorization: `${process.env.GITHUB_API}`,
      body: {}
    }
  }
  return axios.get(options.url, options)
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      console.log(`err while gettingreviews in helper function ${err}`);
    })
}

const getReviews2 = (itemid, filter, count) => {
  console.log(`itemid is equal to ${itemid} and filter is equal to ${filter} and count is equal to ${count}`);
  const options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews?product_id=${itemid}&sort=${filter}&count=${count}`,
    headers: {
      Authorization: `${process.env.GITHUB_API}`,
      body: {}
    }
  }
  return axios.get(options.url, options)
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      console.log(`err while gettingreviews in helper function ${err}`);
    })
}
const getMeta = (itemid) => {
  itemid = parseInt(itemid)
  const options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta?product_id=${itemid}`,
    headers: {
      Authorization: `${process.env.GITHUB_API}`,
      body: {}
    }
  }
  return axios.get(options.url, options)
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      console.log(`err while gettingmeta in helper function ${err.response.data}`);
    })
}
const addReviews = (review) => {
  // const options = apiOptions(1)
  // console.log(`options is equal to ${JSON.stringify(options)}`);
  const options = {
    headers: {
      authorization: `${process.env.GITHUB_API}`
    }
  }
  const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/`;
  const sampleReview = { product_id: 71697, rating: 1, summary: 'awesome! FWGWEGWEGWEGWGWGEWFWEGEWGWEDDDDDDDDDGWGWEGEWG',
    body: 'a gift for my granddaughter. She loves them and has them on anytime they are clean. Good product easy care and stretch is just right.',
    recommend: true, name: 'Andy', email: 'andy@test.com', photos:[],
    characteristics:{["240583"]:1, ["240584"]:2, ["240585"]:3}}

  return axios.post(url, sampleReview, options)
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
module.exports.getReviews2 = getReviews2;
module.exports.getMeta = getMeta;
