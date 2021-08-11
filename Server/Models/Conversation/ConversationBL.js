let Conversation = require('./ConversationSchema')

var getAllConversations = ()=> {

    return new Promise((resolve, reject)=>{
        Conversation.find({},(err, data)=>{
            if(err){
                reject(err)
            } 
            else{
                resolve(data)
            }
        })

    })
}
var getConversationById = (conversationId)=> {
    return new Promise((resolve, reject)=>{
        Conversation.findById(conversationId,(err,data)=>{
            if(err){
                reject(err)
            }
            else {
                resolve(data)
            }
        })
    })
}

var addConversation = (newConversation) => {
    return new Promise((resolve,reject)=> {
            var conversation = new Conversation({
            login:newConversation.login,
            recipients: newConversation.recipients,
            messages:newConversation.messages
        })
        conversation.save((err)=>{
            if(err){
                reject(err)
            }
            else {
                resolve(conversation)
            }
        })
    })
}
var updateConversation = (conversationId,conversationObj) => {
    return new Promise((resolve, reject)=>{
        Conversation.findByIdAndUpdate(conversationId,{
            login:conversationObj.login,
            recipients: conversationObj.recipients,
            messages: conversationObj.messages
        },(err)=>{
            if(err){
                reject(err)
            }
            else {
                resolve("Conversation has updated!")
            }
        })

    })
}

var deleteConversation = (conversationId)=> {
    return new Promise((resolve,reject)=>{
        Conversation.findByIdAndDelete(conversationId,(err)=>{
            if(err){
                reject(err)
            }
            else{
                resolve("user deleted!!!")
            }
        })
    })
}

module.exports = {deleteConversation,updateConversation,addConversation,getConversationById,getAllConversations}