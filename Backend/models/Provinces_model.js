const mongoose = require('mongoose')
const Schema= mongoose.Schema
const Province_Schema = new Schema({
    name:{
        type : Schema.Types.String,
    },
    countryId: {
        type: Schema.Types.ObjectId, 
        ref: "Country",
        required: true 
    }
    
})
const ProvincesModel = mongoose.model('Province',Province_Schema)

module.exports= ProvincesModel;