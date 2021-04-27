var unirest = require('unirest');
var express = require('express');
const bodyParser=require("body-parser");
var app = express();
const path = require('path');
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'assets')));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post('/', function(req, res){
  var query = req.body.cityName;
  console.log(query);
unirest.get("https://community-open-weather-map.p.rapidapi.com/forecast")
  .header("X-RapidAPI-Key", "3ad09272cbmsh76449fd82abb8cfp108186jsncd3e9947dafe")
  .header("x-rapidapi-host", "community-open-weather-map.p.rapidapi.com")
  .query({
        //'appid': <YOUR_APP_ID>,
        'q': query,
        'units': 'metric'
  })
  .end(function (result) {
    console.log(result.body.list[0].weather);
        res.render('index', {data:result.body});
  });
})
app.listen(process.env.PORT || 8081, function(){
  console.log('Server running at https://127.0.0.1:8081/');
})
