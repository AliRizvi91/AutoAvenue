const mongoose = require('mongoose')
const Schema= mongoose.Schema

const City_Schema = new Schema({
    name:{
        type : Schema.Types.String,
    },
    provinceId: {
        type: Schema.Types.ObjectId, 
        ref: "Province",
        required: true 
    }
    
})
// console.log(CountryId)
const CitiesModel = mongoose.model('City',City_Schema)

module.exports= CitiesModel;