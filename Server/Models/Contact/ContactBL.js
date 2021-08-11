let Contact = require('./ContactSchema')

var getAllContacts = ()=> {

    return new Promise((resolve, reject)=>{
        Contact.find({},(err, data)=>{
            if(err){
                reject(err)
            } 
            else{
                resolve(data)
            }
        })

    })
}
var getContactById = (contactId)=> {
    return new Promise((resolve, reject)=>{
        Contact.findById(contactId,(err,data)=>{
            if(err){
                reject(err)
            }
            else {
                resolve(data)
            }
        })
    })
}



var addContact = (newContact) => {
    return new Promise((resolve,reject)=> {

        var contact = new Contact({
         senderId:newContact.senderId,
         contacts:newContact.contacts
        })
        contact.save((err)=>{
            if(err){
                reject(err)
            }
            else {
                resolve(contact)
            }
        })
    })
}
var updateContact = (contactId,contactObj) => {

    console.log(contactId);
    return new Promise((resolve, reject)=>{
        Contact.findByIdAndUpdate(contactId,{
            
            senderId:contactObj.senderId,
            contacts:contactObj.contacts

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

var deleteContact = (contactId)=> {
    return new Promise((resolve,reject)=>{
        Contact.findByIdAndDelete(contactId,(err)=>{
            if(err){
                reject(err)
            }
            else{
                resolve("user deleted!!!")
            }
        })
    })
}

module.exports = {deleteContact,updateContact,addContact,getContactById,getAllContacts}