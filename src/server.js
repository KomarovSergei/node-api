'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const artistsController = require('./controllers/artists');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const dbName = 'artists';
let db = require('./db');

app.get('/', (req, res) =>
  res.send('It\'s artists API')
);
app.get('/artists', artistsController.all);
app.get('/artists/:id', artistsController.findById);
app.post('/artists', artistsController.create);
app.put('/artists/:id', artistsController.update);
app.delete('/artists/:id', artistsController.delete);

db.connect('mongodb://localhost:27017/api', (err, database) => {
  if (err) {
    return console.log(err);
  }
  app.listen(3012, () => console.log('API app started'));
});
