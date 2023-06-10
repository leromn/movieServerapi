const express = require('express');
const app = express();
require('./plugs/dbInit').start();
const models = require('./models/dbModels');
const PORT = 9090;

const multer = require('multer');
const sharp = require('sharp');
const bodyparser = require('body-parser');

const upload = multer({ dest: './images' });
app.use(bodyparser.urlencoded({ extended: true }));

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
  models.Movie.find({ $text: { $search: req.params.query } })
    .then((result) => resp.json(result))
    .catch((err) => console.log(err));
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

app.post('admin/add/movie', upload.single('avatar'), manageMovie(req, resp));

app.post('admin/edit/movie', (req, resp) => {
  //delete or update
});

app.post('admin/add/person', (req, resp) => {});

app.post('admin/edit/person', (req, resp) => {});

app.listen(PORT, () => {
  console.log(`Listenin...g on port: ${PORT}`);
});

const manageMovie = (req, resp) => {
  fs.rename(req.file.path, './images/avatar.jpg', (err) => {
    console.log(err);
  });

  sharp(__dirname + '/images/avatar.jpg')
    .resize(200, 200)
    .jpeg({ quality: 50 })
    .toFile(__dirname + '/images/avatar_thumb.jpg');

  // Configuring Preview Image
  sharp(__dirname + '/images/avatar.jpg')
    .resize(640, 480)
    .jpeg({ quality: 80 })
    .toFile(__dirname + '/images/avatar_preview.jpg');

  var movieTemp = {
    title: req.body.title,
    budget: req.body.budget,
    releaseDate: req.body.relDate,
    avatar: {
      data: fs.readFileSync(
        path.join(__dirname + '/images/avatar_preview.jpg')
      ),
      contentType: 'image/jpg',
    },
    thumbnail: {
      data: fs.readFileSync(path.join(__dirname + '/images/avatar_thumb.jpg')),
      contentType: 'image/jpg',
    },
    revenue: req.body.revenue,
    status: req.body.status,
    runtime: req.body.runtime,
    genre: req.body.genre,
    language: req.body.language,
    cast: req.body.cast,
  };

  models.Movie.create(movieTemp)
    .then((response) => console.log('movie upload complete'))
    .catch((err) => console.log(err));
};
