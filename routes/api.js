var async = require('async');
var config = require('../config');
var superagent = require('superagent');

module.exports = function (app) {
  
  app.get('/characters/search', function(req, res) {
    superagent
      .get(config.api.base + '/characters/' )
      .query({api_key: config.api.key})
      .query({filter: 'name:' + req.query.title})
      .query({format: 'json'})
      .end(function(err, result) {
        if (err || result.statusCode !== 200) {
          res.send(err);
        }
        else {          
          res.json(JSON.parse(result.text));
        }
      });
  });

  app.get('/characters/details', function(req, res) {
    console.log(req.query.id);
    superagent
      .get(config.api.base + '/character/4005-' + req.query.id + '/')
      .query({api_key: config.api.key})
      .query({format: 'json'})
      .end(function(err, result) {
        if (err || result.statusCode !== 200) {
          res.send(err);
        }
        else {
          res.json(JSON.parse(result.text));
        }
      });
  });

  app.get('/characters/versus', function(req, res) {

    async.parallel({
      mainDetail: function(next) {
        _characterDetails(req.query.main, next);
      },
      challengerDetail: function(next) {
      _characterDetails(req.query.challenger, next);
      },
    }, function done(err, results) {
      if (err) {
        res.json(err);
      }
      else {
        res.json(results);
      }
    });
  });


};
function _characterDetails(id, callback) {
  superagent
    .get(config.api.base + '/character/4005-' + id+'/')
    .query({api_key: config.api.key})
    .query({format: 'json'})
    .end(function(err, result) {
      callback(err, JSON.parse(result.text));
  });
}