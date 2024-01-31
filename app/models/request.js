const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema({
    address: { 
        type: String,
        required: true
    },
    sent : {
        type: [String],
    },
    received : { 
        type: [String],
    },
})

module.exports = mongoose.model('Request', requestSchema)