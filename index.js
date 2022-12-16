require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const apiRouter = require('./src/routes');

const cors = require('cors');

var port = process.env.PORT;
const app = express();

var uri = process.env.URL;

app.use(bodyParser.json());

app.use(cors())

app.use('/api/v1/', apiRouter);

app.listen(port, (err) => {
    if (err) {
      console.log(`Errors: ${err}`);
      process.exit(-1);
    }
    console.log(`app is runnning on port ${port}`);
    });

mongoose.connect(uri)
    .then(() => {
        console.log("successfully connected to the database")
    }).catch(err => {
        console.log("couldnt connect to the database", err);
        process.exit();
    })