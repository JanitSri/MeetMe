require('dotenv').config()

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');


/*
// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION_URL, { 
  useNewUrlParser:true, 
  useUnifiedTopology: true 
})
  .then(() => console.log("Connected to database"))
  .catch((error) => console.log(`Error connecting to MongoDB ${error}`));
*/

const app = express();
const PORT = process.env.PORT || 8081;

app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());

app.get('/', (req, res) => {
  res.end("<h1>Express and Mongoose Template</h1>");
});

app.listen(PORT, () => {
  console.log('Server started on port '+ PORT);
});
