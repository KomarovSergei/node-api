const Artists = require('../models/artists');

exports.all = (req, res) =>
  Artists.all((err, docs) => {
    if (err) {
      console.log(err);
      return res.senStatus(500);
    }
    res.send(docs);
  });
