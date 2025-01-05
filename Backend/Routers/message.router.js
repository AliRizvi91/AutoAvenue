const express = require('express')
const Message_Router = express.Router()


const {createMessage} =require('../Controllers/message.controller')


Message_Router.post('/message', createMessage);

  module.exports = {Message_Router};

