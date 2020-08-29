const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const https = require("https");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");

	});


app.post("/", function(req, res){
    const query = req.body.cityName;
    const apiKey = "adb1a13a8225d78f0a27a873e0134f80";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

  https.get(url, function(response){
     console.log(response.statusCode);

     response.on("data", function(data){
       const weatherData = JSON.parse(data)
       const temp = weatherData.main.temp
       const desc = weatherData.weather[0].description
       const loc = weatherData.name
       const icons = weatherData.weather[0].icon
       const imageURL = "https://openweathermap.org/img/wn/" + icons + "@2x.png"
       console.log(loc);
       res.write("<h1>The temperature in " + loc + " is " + temp + " degrees celsius.</h1>")
       res.write("<p>The weather is currently " + desc + ". </p>")
       res.write("<img src=" + imageURL + ">")
       res.send();
     })

   });
})


app.listen(3000, function(){
 	 console.log("Server has Started on port 3000.");
	});
