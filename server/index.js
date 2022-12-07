const express = require('express');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());

// app.get("/", (req, res)=>{

// })

app.listen(3033, function() {
  console.log(`listening on port 3033`);
});
