var express = require('express');
var app = express();
app.use( function (req, res, next) {
  req.requestTime = Date.now();
  next();
});
app.get('/', function (req, res) {
  var responseText = '<h4>Hello-Requested at: ' + req.requestTime + '</h4>';
  res.send(responseText);
})
app.listen(3009);