const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongoose_delete = require('mongoose-delete');


const Schema = mongoose.Schema;

const course = new Schema({
    name: { type: String, maxLength: 255},
    description: { type: String},
    image: { type: String},
    videoId: { type: String},
    slug: { type: String, slug: 'name', unique: true },

  }, {timestamps: true,});

mongoose.plugin(slug);
course.plugin(mongoose_delete, {
  deletedAt : true,
  overrideMethods: 'all',
});
module.exports = mongoose.model('Coure', course);

