var express = require('express')
var appRouter = express.Router()
let conversationBL = require('../Models/Conversation/ConversationBL')


appRouter.route('/').get(async(req,resp)=>{
    var conversations = await conversationBL.getAllConversations()
    return resp.json(conversations)
})


appRouter.route('/:id').get(async(req,resp)=>{
    var id = req.params.id
    var conversation = await conversationBL.getConversationById(id)
    return resp.json(conversation)
})

appRouter.route('/').post(async(req,resp)=>{
    var conversationObj = req.body;
    console.log(conversationObj);
    var conversation = await conversationBL.addConversation(conversationObj)
    return resp.json(conversation)
})

appRouter.route('/:id').put(async(req, resp)=>{
    var id = req.params.id
    var conversationObj = req.body
    var result = await conversationBL.updateConversation(id,conversationObj)
    return resp.json(result)

})

appRouter.route('/:id').delete(async(req,resp)=>{
    var id = req.params.id
    var result = await conversationBL.deleteConversation(id)
    return resp.json(result)
})

module.exports = appRouter
