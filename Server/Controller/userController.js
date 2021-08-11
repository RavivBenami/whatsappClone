var express = require('express')
var appRouter = express.Router()
let userBL = require('../Models/users/usersBL')


appRouter.route('/').get(async(req,resp)=>{
    var users = await userBL.getAllUsers()
    return resp.json(users)
})


appRouter.route('/:id').get(async(req,resp)=>{
    var id = req.params.id
    var users = await userBL.getUserById(id)
    return resp.json(users)
})

appRouter.route('/').post(async(req,resp)=>{
    var userObj = req.body;
    var users = await userBL.addUser(userObj)
    return resp.json(users)

})

appRouter.route('/:id').put(async(req, resp)=>{
    var id = req.params.id
    var userObj = req.body
    var result = await userBL.updateUser(id,userObj)
    return resp.json(result)

})

appRouter.route('/:id').delete(async(req,resp)=>{
    var id = req.params.id
    var result = await userBL.deleteUser(id)
    return resp.json(result)
})

module.exports = appRouter
