const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

// !Config Object for DATABASE
const Course = new Schema(
  {
    _id: { type: Number },
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    slug: { type: String },
    level: { type: String },
    videoId: { type: String, required: true },
    slug: { type: String, slug: 'name', unique: true },
  },
  {
    _id: false,
    timestamps: true,
  }
  );

  // *Add Plugin
mongoose.plugin(slug);
Course.plugin(mongooseDelete, { overrideMethods: 'all',  deletedAt : true  })
Course.plugin(AutoIncrement);

module.exports = mongoose.model('Course', Course);
