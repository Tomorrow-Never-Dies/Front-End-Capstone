const express = require('express');
let app = express();
const { getReviews } = require('../helpers/reviews.js');

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
})






app.listen(3033, function() {
  console.log(`listening on port 3033`);
});
