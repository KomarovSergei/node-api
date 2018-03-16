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
// app.get('/artists/:id', (req, res) =>
//   db.get().collection('artists').findOne({ _id: ObjectID(req.params.id)},
//     (err, data) => {
//       if (err) {
//         console.log(err);
//         return res.sendStatus(500);
//       }
//       res.send(data);
//     }
//   )
// );

app.post('/artists', (req, res) => {
  const artist = {
    name: req.body.name
  };

  const collection = db.get().collection('artists');

  collection.insert(artist, (err, results) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    console.log("Insert succesfull");
    res.send(artist);
  });
});

// debug it!
app.put('/artists/:id', (req, res) => {
  console.log(ObjectID(req.params.id));
  console.log(req.body.name);
  db.get().collection('artists').updateOne(
    { _id: ObjectID(req.params.id) },
    { name: req.body.name },
    (err, results) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      res.sendStatus(200);
    }
  )
});

app.delete('/artists/:id', (req, res) => {
  db.get().collection('artists').deleteOne(
    { _id: ObjectID(req.params.id) },
    (err, result) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      res.sendStatus(200);
    }
  )
});

db.connect('mongodb://localhost:27017/api', (err, database) => {
  if (err) {
    return console.log(err);
  }
  app.listen(3012, () => console.log('API app started'));
});
