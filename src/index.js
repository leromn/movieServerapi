const express = require('express');
const app = express();
require('./plugs/dbInit').start();
const models = require('./models/dbModels');
const PORT = 9090;

//   let uid = req.params.uid;
//   if (!uid || uid === '') {
//     return resp.status(500).json({ error: 'uid is required' });
//   }

//   let expireTime = req.query.expiry;

app.get('/home', (req, resp) => {
  models.Movie.find()
    .then((result) => {
      resp.json(result);
      console.log(result + 'from Db');
    })
    .catch((err) => console.log(err));
});

app.get('customer/movies/:genre', (req, resp) => {});

app.get('customer/search/movie/:name', (req, resp) => {
  models.Movie.find({ $text: { $search: 'love' } }).catch((err) =>
    console.log(err)
  );
});

app.get('customer/search/person/:name', (req, resp) => {
  models.Person.find({ name: req.params.name })
    .then((result) => {
      resp.json(result);
    })
    .catch((err) => console.log(err));
});

app.post('customer/bookmovie', (req, resp) => {});

app.post('customer/comment', (req, resp) => {
  // what movie,by whom,text or ratig?
  // add it under movie docjment on comment row
});
///////////////////////////////////////////////////////////////////////////////////admin

app.post('admin/add/movie', (req, resp) => {});

app.post('admin/edit/movie', (req, resp) => {
  //delete or update
});

app.post('admin/add/person', (req, resp) => {});

app.post('admin/edit/person', (req, resp) => {});

app.listen(PORT, () => {
  console.log(`Listenin...g on port: ${PORT}`);
});
