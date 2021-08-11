var mongoose = require('mongoose')

var appSchema = mongoose.Schema

var UserSchema = new appSchema({

    username:String,
    password:String,

},{versionKey:false})

module.exports = mongoose.model('users', UserSchema)