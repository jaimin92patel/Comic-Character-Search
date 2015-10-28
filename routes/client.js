module.exports = function (app) {

  app.get('/', function(req, res) {
    res.render('search');
  });

  app.get('/Character/:id', function(req, res) {
    res.render('detail');
  });
  app.get('/character/:main/versus/:challenger', function(req, res) {
    res.render('versus');
  });
  app.get('/help', function(req, res) {
    res.render('help');
  });

};