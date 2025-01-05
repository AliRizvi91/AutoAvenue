const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Advertisment_category_Schema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true
    },
    images: {
        type: Schema.Types.String,
        required: true
    }
});

const Category = mongoose.model('Category', Advertisment_category_Schema);
module.exports = Category;
