const mongoose = require('mongoose')
const Schema= mongoose.Schema
const Advertisment_Status_Schema = new Schema({
    name:{
        type : Schema.Types.String,
        require: true,
    },
    
})

const Adver_Status_Model = mongoose.model('Advertisment_Status',Advertisment_Status_Schema)

module.exports= Adver_Status_Model;