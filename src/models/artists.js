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
