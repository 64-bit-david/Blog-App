const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config();

const postRoutes = require('./routes/posts');

const MONGODB_URI = process.env.MONGODB_URI;


const app = express();

app.use(bodyParser.json());

app.use(postRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message });
})

const PORT = process.env.PORT || 5000;

mongoose.connect(MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(app.listen(PORT))
