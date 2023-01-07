const express = require('express');
const axios = require('axios')
const app = express();
const { getReviews, addReviews, getMeta, getReviews2 } = require('../helpers/reviews.js');
// const config = require('../config.js');
const cors = require('cors');
require('dotenv').config()
const PORT = process.env.DEV_PORT || 3033;
const path = require('path');
const expressStaticGzip = require("express-static-gzip")

app.use(expressStaticGzip(__dirname + '/../client/dist'));
app.use(express.json());
app.use(cors());



app.use(expressStaticGzip(path.join(__dirname, 'build')));

app.get('/#Reviews', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/getReview', (req, res) => {
  getReviews(req.query.id)
    .then((response) => {
      res.send(response)
    })
    .catch((err) => {
      console.log(`err found while getting a review ${err}!`);
      throw (err);
    })
})

app.get('/getReview2', (req, res) => {
  console.log(`req.querycount is equal to ${req.query.count}`);
  getReviews2(req.query.id, req.query.sort, req.query.count)
    .then((response) => {
      res.send(response)
    })
    .catch((err) => {
      console.log(`err found while getting a review ${err}!`);
      throw (err);
    })
})
app.get('/getReviewMeta', (req, res) => {
  console.log(`getting meta data!!`);
  console.log(req.query.id)
  getMeta(req.query.id)
    .then((response) => {
      res.send(response)
    })
})
app.post('/addReview', (req, res) => {
  //console.log(`input for addReview is ${JSON.stringify(req.body)}`);
  addReviews(req.body)
    .then((response) => {
      //console.log(`response from addReview is ${response}`)
      res.send(response)
    })
    .catch((err) => {
      console.log(`err while adding Review is equal to ${err}`);
      throw (err);
    })
})
app.post('/helpful', (req, res) => {
  console.log(`helpful is called, id is equal to ${req.body.id}`)
  markHelpful(req.body.id)
    .then((response) => {
      res.send(response);
    });
})

app.post('/reportReview', (req, res) => {
  reportReview(req.body.id)
    .then((response) => {
      res.send(response);
    })
})
app.get('/products', (req,res) => {
  console.log(`getting products`);

    axios({
    method: 'get',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/',
    headers :{
      'Authorization': `${process.env.GITHUB_API}`
    }
  })
  .then((result) =>{
    res.send(result.data)
  })
  .catch((error) =>{
    console.log(error, "error all products")
    res.send(err)
})

})

app.get('/products/:product_id', (req,res) => {
  axios({
  method: 'get',
  url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${req.query.id}`,
  params:{
    "products_id": req.query.id,
  },
  headers :{
    'Authorization': `${process.env.GITHUB_API}`
  }
})
.then((result) =>{
  console.log(result.data, "urlllll")
  res.send(result.data)
})
.catch((error) =>{
  console.log(error, "error")
  console.log(req.query.id)
  return error
})

})


app.get('/products/:product_id/styles', (req,res) => {


  axios({
  method: 'get',
  url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${req.query.id}/styles`,
  headers: {
    Authorization: `${process.env.GITHUB_API}`,
    body: {}
  }
  })
.then((result) =>{
  //console.log(result.data.results[0].photos, "result")
  res.send(result.data)
  })
.catch((error) =>{
  console.log(error, "error")
  console.log(req.query.id)
  return error
})

})

app.get('/products/:product_id/related', (req,res) => {

  axios({
  method: 'get',
  url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${req.query.id}/related`,
  headers: {
    Authorization: `${process.env.GITHUB_API}`,
    body: {}
  }
})
.then((result) =>{
  //console.log(result.data.results[0].photos, "result")
  res.send(result.data)
})
.catch((error) =>{
  console.log(error, "error")
  console.log(req.query.id, "related")
  return error
})

})

// // Questions and Answers
// app.get('/qa/questions', (req, res) => {
//   console.log('Getting questions');
// })

app.listen(process.env.DEV_PORT, function() {
  console.log(`listening on port 3033`);

});
