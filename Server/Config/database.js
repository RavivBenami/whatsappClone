var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/whatsappDB',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})