var express = require('express')
var appRouter = express.Router()
let contactBL = require('../Models/Contact/ContactBL')


appRouter.route('/').get(async(req,resp)=>{
    var contacts = await contactBL.getAllContacts()
    return resp.json(contacts)
})


appRouter.route('/:id').get(async(req,resp)=>{
    var id = req.params.id
    var contact = await contactBL.getContactById(id)
    return resp.json(contact)
})

appRouter.route('/').post(async(req,resp)=>{
    var contactsObj = req.body;
    var contacts = await contactBL.addContact(contactsObj)
    return resp.json(contacts)

})

appRouter.route('/:id').put(async(req, resp)=>{
    var id = req.params.id
    var contactsObj = req.body
    var result = await contactBL.updateContact(id,contactsObj)
    return resp.json(result)

})

appRouter.route('/:id').delete(async(req,resp)=>{
    var id = req.params.id
    var result = await contactBL.deleteContact(id)
    return resp.json(result)
})

module.exports = appRouter
