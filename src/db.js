const MongoClient = require('mongodb').MongoClient;

let state = { db: null };

exports.connect = (url, done) => {
  if (state.db) {
    return done();
  }

  MongoClient.connect(url, (err, client, dbName = 'artists') => {
    if (err) {
      return done(err);
    }
    state.db = client.db(dbName);
    done();
  });
}

exports.get = () => state.db;
