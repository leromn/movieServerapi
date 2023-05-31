const mongoose = require('mongoose');

const start = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://esru2:esru2@cluster0.sbh1vyc.mongodb.net/Movie?retryWrites=true&w=majority'
    );
    console.log('connceted to db');
  } catch (error) {
    console.error(error, 'db error');
  }
};

module.exports.start = start;
