const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CityAreas_Schema = new Schema({
    name: {
        type: Schema.Types.String,
    },
    cityId: {
        type: Schema.Types.ObjectId, 
        ref: "City",
        required: true 
    }
});

const CitiesAreasModel = mongoose.model('CityAreas', CityAreas_Schema);
module.exports = CitiesAreasModel;
