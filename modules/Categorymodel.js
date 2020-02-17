const mongoose = require('mongoose');


const CategorySchema = mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    catId: String,
})

module.exports = mongoose.model('Category', CategorySchema);