const mongoose = require('mongoose');

const connect = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/f8_education_dev', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connect successfully!!!');
  } catch (err) {
    console.log('Connect fail!!!');
  }
};

module.exports = { connect };
