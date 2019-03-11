const express = require('express');
const request = require('request');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());

app.use(express.static(path.resolve(__dirname, 'build')));

app.get('/representatives/:state',
  findRepresentativesByState,
  jsonResponse
);

app.get('/senators/:state',
  findSenatorsByState,
  jsonResponse
);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build/index.html'));
});

function findRepresentativesByState(req, res, next) {
  const url = `http://whoismyrepresentative.com/getall_reps_bystate.php?state=${req.params.state}&output=json`;
  request(url, handleApiResponse(res, next));
}

function findSenatorsByState(req, res, next) {
  const url = `http://whoismyrepresentative.com/getall_sens_bystate.php?state=${req.params.state}&output=json`;
  request(url, handleApiResponse(res, next));
}

function handleApiResponse(res, next) {
  return (err, response, body) => {
    if (err || body[0] === '<') {
      res.locals = {
        success: false,
        error: err || 'Invalid request. Please check your state variable.'
      };
      return next();
    }
    console.log(body);
    res.locals = {
      success: true,
      results: JSON.parse(body).results
    };
    return next();
  };
}

function jsonResponse(req, res, next) {
  return res.json(res.locals);
}

const server = app.listen(3001, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log('API listening at http://%s:%s', host, port);
});
