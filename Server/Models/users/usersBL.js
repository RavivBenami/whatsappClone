let User = require('./userSchema')

var getAllUsers = ()=> {

    return new Promise((resolve, reject)=>{
        User.find({},(err, data)=>{
            if(err){
                reject(err)
            } 
            else{
                resolve(data)
            }
        })

    })
}
var getUserById = (userId)=> {
    return new Promise((resolve, reject)=>{
        User.findById(userId,(err,data)=>{
            if(err){
                reject(err)
            }
            else {
                resolve(data)
            }
        })
    })
}



var addUser = (newUser) => {
    return new Promise((resolve,reject)=> {

        var user = new User({
         username:newUser.username,
         password:newUser.password
        })
        user.save((err)=>{
            if(err){
                reject(err)
            }
            else {
                resolve(user)
            }
        })
    })
}
var updateUser = (userId,userObj) => {
    return new Promise((resolve, reject)=>{
        User.findByIdAndUpdate(userId,{
            username: userObj.username,
            password: userObj.password
        },(err)=>{
            if(err){
                reject(err)
            }
            else {
                resolve("user has updated!")
            }
        })

    })
}

var deleteUser = (userId)=> {
    return new Promise((resolve,reject)=>{
        User.findByIdAndDelete(userId,(err)=>{
            if(err){
                reject(err)
            }
            else{
                resolve("user deleted!!!")
            }
        })
    })
}

module.exports = {deleteUser,updateUser,addUser,getUserById,getAllUsers}