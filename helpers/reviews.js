const axios = require('axios')
//const config = require('../config.js');

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

const markHelpful = (reviewid) => {
  console.log(`reviewid is equal to ${reviewid}`);
  // const options = {
  //   url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/${reviewid}/helpful`,
  //   headers: {
  //     Authorization: process.env.GITHUB_API
  //   }
  // }
  // return axios.put(options.url, options)
  //   .then((response) => {
  //     return response.data
  //   })
  //   .catch((err) => {
  //     console.log(`err while marking helpful in helper function ${err.response.data}`);
  //   })
  const options = {
    method: 'PUT',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/${reviewid}/helpful`,
    headers: {
      Authorization: process.env.GITHUB_API
    }
  };

  return axios(options)
    .then((response) => {
      console.log(`response for helpful is equal to ${response.status}`);
      return response.data
    })
    .catch((error) => {
      throw error;
    });
}

const reportReview = (reviewid) => {
  const options = {
    method: 'PUT',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/${reviewid}/report`,
    headers: {
      Authorization: process.env.GITHUB_API
    }
  };

  return axios(options)
    .then((response) => {
      console.log(`response for reportreview is equal to ${response.status}`);
      return response.data
    })
    .catch((error) => {
      throw error;
    });
}
const getReviews2 = (itemid, filter, count) => {
  // console.log(`itemid is equal to ${itemid} and filter is equal to ${filter} and count is equal to ${count}`);
  const options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews?product_id=${itemid}&sort=${filter}&count=${count}`,
    headers: {
      Authorization: `${process.env.GITHUB_API}`
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
  console.log(`review is equal to ${JSON.stringify(review)}`);
  const options = {
    headers: {
      authorization: `${process.env.GITHUB_API}`
    }
  }
  const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/`;
  return axios.post(url, review, options)
    .then((response) => {
      console.log(`response for successful addreview is equal to ${response}`)
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
module.exports.markHelpful = markHelpful;
module.exports.reportReview = reportReview;