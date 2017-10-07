var Express = require('express');
 var multer = require('multer');
 var bodyParser = require('body-parser');
 var app = Express();
 app.use(bodyParser.json());
 app.use(express.static("public"));

 var Storage = multer.diskStorage({
     destination: function(req, file, callback) {
         callback(null, "./Images");
     },
     filename: function(req, file, callback) {
         callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
     }
 });

 var upload = multer({
     storage: Storage
 }).array("imgUploader", 3); //Field name and max count

 array(fieldname[, maxCount])

 app.get("/", function(req, res) {
     res.sendFile(__dirname + "/index.html");
 });
 app.post("/api/Upload", function(req, res) {
     upload(req, res, function(err) {
         if (err) {
             return res.end("Something went wrong!");
         }
         return res.end("File uploaded sucessfully!.");
     });
 });

  app.listen(80, function(a) {
     console.log("Listening to port 80");
 });
  