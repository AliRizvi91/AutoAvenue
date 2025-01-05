const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Advertisment_Schema = new Schema({
    image: {
        type: Schema.Types.String,
        // required: true
    },
    name: {
        type: Schema.Types.String,
        required: true
    },
    price: {
        type: Schema.Types.String,
        required: true
    },
    descriptions: {
        type: Schema.Types.String,
        required: true
    },
    postedById: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    postOn: {
        type: Schema.Types.Date,
        required: true
    },
    expireOn: {
        type: Schema.Types.Date,
        required: true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    cityAreasId: {
        type: Schema.Types.ObjectId,
        ref: 'CityAreas',
        required: true
    },
});

const Advertisment_model = mongoose.model('Advertisment', Advertisment_Schema);
module.exports = Advertisment_model;
