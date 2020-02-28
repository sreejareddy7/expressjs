const exp=require('express');
const port=3000;
const app=exp();

app.get('/', function (req, res) {
    res.send('<h1>Hello this is first web server program</h1>');
  });
  app.listen(port,function(){
    console.log("Server running sucessfully");
  });