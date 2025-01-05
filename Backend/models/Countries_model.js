const mongoose = require('mongoose')
const Schema= mongoose.Schema

const Country_Schema = new Schema({
    name:{
        type : Schema.Types.String,
    },
    code:{
        type : Schema.Types.String,
        require : true,
    }
    
})

const Country_Model = mongoose.model('Country',Country_Schema)

module.exports= Country_Model;