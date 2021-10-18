const connectionTomongo = require("./db");
connectionTomongo();
const express = require('express')

const app = express()
const port = 5000;

app.use(express.json());

// routes 
app.use('/', require('./routes/home'));
app.use('/', require('./routes/auth'));



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})