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
