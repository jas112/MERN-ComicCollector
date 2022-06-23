const express = require('express')
const router = express.Router();
const {collectComic, getUserComics, removeComic} = require('../controllers/comicController')

const {protect} = require('../middleware/authMiddleware')

router.post('/', protect, collectComic)
router.get('/', protect, getUserComics)
router.delete('/', protect, removeComic)

module.exports = router