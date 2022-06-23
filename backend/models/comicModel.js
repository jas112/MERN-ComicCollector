const mongoose = require('mongoose')

const comicSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: { 
        type: String, 
        required: [true, 'Please add title value']
    },
    issueNumber: { 
        type: Number, 
        required: [true, 'Please add issue number value']
    },
    publisher: { 
        type: String, 
        required: [true, 'Please add publisher value']
    }, 
    yearOfPublication: { 
        type: Number, 
        required: [true, 'Please add publication year value']
    }, 
    writer: { 
        type: String, 
        required: [true, 'Please add writer value']
    },
    artist: { 
        type: String, 
        required: [true, 'Please add artist value']
    },
},{ timestamps: true  })

module.exports = mongoose.model('Comic', comicSchema);