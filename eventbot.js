#!/usr/bin/env node

console.log(process.env);

var fs = require('file-system');
var express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
var app = express();
var fs = require('file-system');
const path = require('path');
var ExifImage = require('exif').ExifImage;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

const mkdirSync = function (dirPath) {
  try {
    fs.mkdirSync(dirPath)
  } catch (err) {
    if (err.code !== 'EEXIST') throw err
  }
};

// If this is a snap the current directory is not writable
var images_path;
if (process.env.SNAP_COMMON) {
  images_path = path.join(process.env.SNAP_COMMON, "images");
  app.use(express.static(process.env.SNAP_COMMON));
  app.set('views', path.join(__dirname, 'views'));
} else {
  images_path = "public/images";
}

console.log("Images path: " + images_path);
mkdirSync(images_path);

var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, images_path);
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({
    storage: Storage
}).array("imgUploader", 10); //Field name and max count

var orientations = {};
app.get("/", function(req, res) {
    //res.sendFile(__dirname + "/index.html");
    var pictures = [];  
    fs.recurseSync(images_path,
                   ['**/*.JPG', '**/*.PNG', '**/*.JPEG', '**/*.jpg', '**/*.png', '**/*.jpeg'],
                   function(filepath, relative, filename) {
                       try {
                           new ExifImage({ image : filepath }, function (error, exifData) {
                               console.log(filename);
                               if (error)
                                   console.log('Error: '+error.message);
                               else {
                                   orientations["/images/" + filename] = exifData.image.Orientation || 1;
                               }
                           });
                       } catch (error) {
                           console.log('Error: ' + error.message);
                       }
                       pictures.push("/images/" + filename);
                   });
    res.render("index.ejs", {pictures: pictures, orientations: orientations});
});

app.post("/api/upload", function(req, res) {
    upload(req, res, function(err) {
        if (err) {
            console.error(err.stack);
            return res.status(500).send("Something went wrong!");
        }
        else {
            return res.end("File Uploaded Successfully!");
        }
    });
});

app.listen(8090, function(a) {
    console.log("Listening to port 8090");
});
