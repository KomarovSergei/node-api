'use strict'
const db = require('../db');
const ObjectID = require('mongodb').ObjectID;

exports.all = (cb) =>
  db.get().collection('artists')
    .find().toArray(
      (err, docs) => cb(err, docs)
    );

exports.findById = (id, cb) =>
  db.get().collection('artists')
    .findOne({ _id: ObjectID(id) },
      (err, doc) => cb(err, doc)
    );

exports.create = (artist, cb) =>
  db.get().collection('artists')
    .insert(artist, (err, result) => cb(err, result));

exports.udpate = (id, newData, cb) =>
  db.get().collection('artists').updateOne(
    { _id: ObjectID(id) },
    newData,
    (err, result) => cb(err, result)
  );
