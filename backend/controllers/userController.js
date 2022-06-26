const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc    Register User
// @route   POST /api/users/
// @access  Private
const registerUser = asyncHandler(async ( req, res ) => {

    console.log('@backend registerUser...');

    const {firstName, lastName, email, password} = req.body;
    
    if(!firstName || !lastName || !email || !password){
        res.status(400);
        throw new Error('Please submit values for all fields.')
    }

    const userExists = await User.findOne({email});

    if(userExists){
        res.status(500)
        throw new Error('User already exists with that email.')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword
    })

    if(user){
        console.log('backend user created');
        res.status(201).json({
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        console.log('backend user creation failed');
        res.status(400)
        throw new Error('invalid user data.')
    }
})

// @desc    login User
// @route   POST /api/users/login
// @access  Private
const loginUser = asyncHandler(async (req, res) => {
    
    const {email, password} = req.body

    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.status(201).json({
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user credentials.')
    }
})

// @desc    Get User
// @route   GET /api/users/me
// @access  Private

const getUser = asyncHandler(async (req, res) => {

    res.status(200).json(req.user)

})

const generateToken = (id) => {

    return jwt.sign(
        {id}, 
        process.env.JWT_SECRET, 
        {expiresIn: '30d'}
    )

}

module.exports = {
    registerUser,
    loginUser,
    getUser
}