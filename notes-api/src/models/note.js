const mongoose = require('mongoose');

// Type of Mongoose Model
const Note = mongoose.model(/*Name Of Model*/'Note', {
    note:{
        type: String
    }
})

module.exports = Note  // In this step we are exporting the Note Model