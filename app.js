const unirest = require('unirest');
const express = require('express');
const bodyParser=require("body-parser");
const app = express();
const path = require('path');

app.set("view engine", "ejs");

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'assets')));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  const query = req.body.cityName;
  console.log(query);
unirest.get("https://community-open-weather-map.p.rapidapi.com/forecast")
  .header("X-RapidAPI-Key", "3ad09272cbmsh76449fd82abb8cfp108186jsncd3e9947dafe")
  .header("x-rapidapi-host", "community-open-weather-map.p.rapidapi.com")
  .query({
        'q': query,
        'units': 'metric'
  })
  .end(function (result) {
        console.log(result.body.list);
        res.render('index', {data:result.body});
  });
})
app.listen(process.env.PORT || 8081, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
})
