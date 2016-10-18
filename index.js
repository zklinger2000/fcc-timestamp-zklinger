var moment = require('moment');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/*', function(req, res) {
  var param = req.params[0];
  var dateArray, month, day, year, stringDate, numDate;

  numDate = Number(param);

  if (numDate && moment.unix(numDate).isValid()) {
    return res.json({
      "unix": numDate,
      "natural": moment.unix(numDate).format('MMMM D, YYYY')
    });
  } else {
    dateArray = param.split(' ');

    if (dateArray.length === 3) {
      month = dateArray[0];
      day = dateArray[1].slice(0, 2);
      year = dateArray[2];

      stringDate = moment(month + ' ' + day + ', ' + year, 'MMMM D, YYYY');

      if (stringDate.isValid()) {
        res.json({
          "unix": stringDate.unix(),
          "natural": stringDate.format('MMMM D, YYYY')
        });
      }
    } else {
      res.json({
        "unix": null,
        "natural": null
      });
    }
  }

});

app.post('/api/timestamp', function(req, res) {
  res.json({ Date: Date.now() });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
