const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName: { 
        type: String, 
        required: [true, 'Please add first name value']
    },
    lastName: { 
        type: String, 
        required: [true, 'Please add last name value']
    },
    email: { 
        type: String, 
        required: [true, 'Please add email value'], 
        unique: true
    },
    password: { 
        type: String, 
        required: [true, 'Please add email value']
    },
},{timestamps: true})

module.exports = mongoose.model('User', userSchema);