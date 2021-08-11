var mongoose = require('mongoose')

var appSchema = mongoose.Schema

var ContactSchema = new appSchema({

    senderId: String,
    contacts:[{
    id:String,
    name:String
    }]

},{versionKey:false})

module.exports = mongoose.model('contacts', ContactSchema)