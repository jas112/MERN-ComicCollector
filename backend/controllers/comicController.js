const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Comic = require('../models/comicModel')
const { restart } = require('nodemon')
const { runInNewContext } = require('vm')

// @desc    Collect Comic
// @route   POST /api/comics/
// @access  Private
const collectComic = asyncHandler(async ( req, res ) => {

    const {title, issueNumber, publisher, yearOfPublication, writer, artist} = req.body;
    
    if(!title || !issueNumber || !publisher || !yearOfPublication || !writer || !artist){
        res.status(400);
        throw new Error('Please submit values for all fields.')
    }

    const comic = await Comic.create({
        user: req.user.id,
        title, 
        issueNumber, 
        publisher, 
        yearOfPublication, 
        writer, 
        artist
    })

    res.status(200).json(comic)
})

// @desc    Get User Comics
// @route   GET /api/comics/
// @access  Private
const getUserComics = asyncHandler(async (req, res) => {
    
    const comics = await Comic.find({user: req.user.id})

    res.status(200).json(comics)

})

// @desc    Remove Comic
// @route   GET /api/comics/:id
// @access  Private

const removeComic = asyncHandler(async (req, res) => {

    const  comic = await Comic.findById(req.params.id)

    if(!comic){
        res.status(400)
        throw new Error('Comic not found.')
    }

    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    if(comic.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized.')
    }

    await comic.remove()

    res.status(200).json({ id: req.params.id })

})

module.exports = {
    collectComic,
    getUserComics,
    removeComic
}