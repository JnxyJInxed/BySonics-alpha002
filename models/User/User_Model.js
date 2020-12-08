const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    //_id : mongoose.Schema.Types.ObjectId,
    name : { 
        type : String,
        min : 6
    },
    email : { 
        type : String
    },
    password : { 
        type : String,
        required : true,
        min : 6
    }
})

UserData = mongoose.connection.useDb('User')

module.exports = UserData.model('UserData', userSchema);