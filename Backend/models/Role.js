const mongoose = require('mongoose')
const Schema= mongoose.Schema

const Role_Schema = new Schema({
    Name:{
        type : Schema.Types.String,
    },
    
})
const RoleModel = mongoose.model('Role',Role_Schema)

module.exports = RoleModel;