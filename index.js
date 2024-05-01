var express = require('express');
var cors = require('cors');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');


require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  if (req.file) {
    res.json({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
    });
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.log(err);
      }
    });
  } else {
    res.json({ error: 'No file uploaded' });
  }
});




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
