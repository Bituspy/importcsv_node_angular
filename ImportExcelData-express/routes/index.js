var express = require('express');
var router = express.Router();

const fs = require("fs");
const multer = require("multer");
const { parse } = require("csv-parse");

const {
  createCountry,
  getCountries,
  readCountry,
  deleteCountry,
  updateCountry,
  addCountry
} = require("../controllers/countryController");

router.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const upload = multer({ dest: "./public/data/uploads/" });
router.post("/upload", upload.single("uploaded_file"), function (req, res) {
    let data = fs.createReadStream(req.file.path, "utf8")
                 .pipe(parse({ delimiter: ",", from_line: 1 }))
                 .on("data", function (row) {
                    let body = {
                        name : row[0],
                        code : row[1]
                    }
                    addCountry(body);
                  })
                 .on("end", function () {
                        console.log("finished");

                        res.status(200).send({
                          message: "Uploaded the file successfully: " + req.file.originalname,
                        });
                 })
                .on("error", function (error) {
                  console.log(error.message);
                });
      if (req.file == undefined){
         response.status(400).json(error);
      }
});

router.route('/country').post(createCountry).get(getCountries);
router.route("/country/:Countryid").get(readCountry).delete(deleteCountry).put(updateCountry);


module.exports = router;
