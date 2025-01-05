const mongoose = require('mongoose')
const Schema= mongoose.Schema

const Type_Schema = new Schema({
    name:{
        type : Schema.Types.String,
    }
    
})
const TypeModel = mongoose.model('Types',Type_Schema)

module.exports= TypeModel;