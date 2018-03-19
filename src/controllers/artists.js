const Artists = require('../models/artists');

exports.all = (req, res) =>
  Artists.all((err, docs) => {
    if (err) {
      console.log(err);
      return res.senStatus(500);
    }
    res.send(docs);
  });

exports.findById = (req, res) =>
  Artists.findById(req.params.id, (err, doc) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(doc);
  });

exports.create = (req, res) =>
  Artists.create({ name: req.body.name }, err => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.sendStatus(200);
  });
exports.update = (req, res) =>
  Artists.update(req.params.id, { $set: { name: req.body.name } }, (err, result) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.sendStatus(200);
  });
exports.delete = (req, res) =>
  Artists.delete(req.params.id, (err, result) => {
    if (err) {
      console.log(err);
      return res.senStatus(500);
    }
    res.sendStatus(200);
  });
