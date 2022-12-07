const express = require('express');
const axios = require('axios')


let app = express();
const { getReviews, addReviews } = require('../helpers/reviews.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());

app.get('/getReview', (req, res) => {
  console.log(`getting review!, ${req.query.id}`)
  getReviews(req.query.id)
    .then((response) => {
      res.send(response)
    })
    .catch((err) => {
      console.log(`err found while getting a review! : ${err}`)
      throw(err)
    })
})

app.post('/addReview', (req, res) => {
  console.log(`input for addReview is ${JSON.stringify(req.body)}`);
  addReviews(req.body)
  .then((response) => {
    console.log(`response from addReview is ${response}`)
  })


app.get('/products', (req,res) => {

    axios({
    method: 'get',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/',
    headers :{
      'Authorization': `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`
    }
  })
  .then((result) =>{
    console.log(result.data, 'data')
    res.send(result.data)
  })
  .catch((error) =>{
    console.log(error, "error")
    return error
})

})







app.listen(3033, function() {
  console.log(`listening on port 3033`);
});
