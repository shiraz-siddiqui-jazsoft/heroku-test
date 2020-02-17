const mongoose = require('mongoose');


const ServicesSchema = mongoose.Schema({
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
    serviceId: String,
})

module.exports = mongoose.model('Services', ServicesSchema);