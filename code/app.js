require('dotenv').config()

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const locationsRoutes = require('./routes/locations');


// Connect to MongoDB
mongoose.connect(process.env.MONGO_DB_CONNECTION, { 
  useNewUrlParser:true, 
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(() => console.log("Connected to MongoDB database"))
  .catch((error) => console.log(`Error connecting to MongoDB ${error}`));

const app = express();
const PORT = process.env.PORT || 8081;

app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());

app.use('/api/v1/locations', locationsRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + 'public/index.html'));
});

app.listen(PORT, () => {
  console.log('Server started on port '+ PORT);
});
