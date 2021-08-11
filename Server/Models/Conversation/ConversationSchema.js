var mongoose = require('mongoose')

var appSchema = mongoose.Schema

var ConversationSchema = new appSchema({

    login: String,
    recipients: [
       String
    ],
    messages: [{
        sender: String,
        text:String
    }]

},{versionKey:false})

module.exports = mongoose.model('conversations', ConversationSchema)