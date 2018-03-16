'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const dbName = 'artists';
let db;

let artists = [
  { id: 1, name: 'Metallica' },
  { id: 2, name: 'Iron Maiden' },
  { id: 3, name: 'Deep Purple' }
];

app.get('/', (req, res) =>
  res.send('It\'s artists API')
);

app.get('/artists', (req, res) =>
  db.collection('artists').find().toArray((err, docs) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(docs);
  })
);

app.get('/artists/:id', (req, res) =>
  db.collection('artists').findOne({ _id: ObjectID(req.params.id)},
    (err, data) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      res.send(data);
    }
  )
);

app.post('/artists', (req, res) => {
  const artist = {
    name: req.body.name
  };

  const collection = db.collection('artists');

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
  db.collection('artists').updateOne(
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
  db.collection('artists').deleteOne(
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

MongoClient.connect('mongodb://localhost:27017/myapi', (err, client) => {
  if (err)
    return console.log(err);
  console.log('connected successfully to db');

  db = client.db(dbName);

  app.listen(3012, () =>
    console.log('API app started')
  );
});
