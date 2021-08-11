let app = require('express')()
let cors = require('cors')
const http = require('http').createServer(app)
var bodyParser = require('body-parser')

app.use(cors())

const io = require('socket.io')(http,{
  cors:{
    origin: 'http://localhost:3000',
    credentials: true,
  },
})

let conversationController = require('./Controller/conversationController')
let contactController = require('./Controller/contactController')
let userController = require('./Controller/userController')

require("./Config/database")
app.use(bodyParser.json())
app.use('/conversation',conversationController)
app.use('/contact',contactController)
app.use('/user',userController)

app.use(bodyParser.urlencoded({extended:false}))


http.listen(5000,async()=>{
    console.log("The server is up");
})

io.on('connection', socket => {
  const id = socket.handshake.query.id
  socket.join(id)

  socket.on('send-message', ({ recipients, text }) => {
    recipients.forEach(recipient => {
      const newRecipients = recipients.filter(r => r !== recipient)
      newRecipients.push(id)
      socket.broadcast.to(recipient).emit('receive-message', {
        recipients: newRecipients, sender: id, text
      })
    })
  })
})