var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");
var cloudinary = require("cloudinary");
var httpProxy = require("http-proxy");
var http = require("http")
var fs = require("fs");
var app = express();


var cloudinaryUrl =  "http://res.cloudinary.com/maggiemu";

cloudinary.config({
    cloud_name: "maggiemu",
    api_key: "575354932185368",
    api_secret: "krLSmSBP2kkZIbKkKJaLPbrdPSs"
});


var controlSettings = require("./json/controlsSetting.json");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

//allow CORS
app.all("/*", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});


app.use(express.static(__dirname + '/public'));

// Get controls
app.get("/controls", function(req, res) {
    res.json(controlSettings);
});


// Save images
app.post("/image", function(req, res) {
    var image = req.body.image;

    cloudinary.uploader.upload(image, function(result) {
        res.send(result);
    });
});

// Get milestones
app.get("/milestones", function(req, res) {
    var milestones = require("./json/milestones.json");

    res.json(milestones);
});

app.listen(3000, function(){
    console.log("Express server listening on port 3000")
});
