'use strict'
const db = require('../db');

exports.all = (cb) =>
  db.get().collection('artists')
    .find().toArray(
      (err, docs) => cb(err, docs)
    );
