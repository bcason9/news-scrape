var cheerio = require("cheerio");
var axios = require("axios");

var express = require("express");
var exphbs = require("express-handlebars");

//var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));


app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
//require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Making a request via axios 
axios.get("https://www.nytimes.com/").then(function(response) {

  // Load the Response into cheerio and save it to a variable
  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
  var $ = cheerio.load(response.data);

  
  var results = [];

  
  $("span").each(function(i, element) {

    // Save the text of the element in a "title" variable
    var title = $(element).text();

    // In the currently selected element, look at its child elements (i.e., its a-tags),
    // then save the values for any "href" attributes that the child elements may have
    var link = $(element).children().attr("href");

    // Save these results in an object that we'll push into the results array we defined earlier
    results.push({
      title: title,
      link: link
    });
  });

  // Log the results once you've looped through each of the elements found with cheerio
 
  for (i=0; i<10; i++) {

    console.log(results)
  }
 

});






  app.listen(PORT, function() {
    console.log(
      "Listening on port",
      PORT,
      PORT
    );
});

module.exports = app;
