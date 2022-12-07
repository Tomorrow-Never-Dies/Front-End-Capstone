const express = require('express');
const axios = require('axios')


let app = express();

app.use(express.static(__dirname + '/../client/dist'));




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
