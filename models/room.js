const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomId: {
        type: Number,
        unique: true
    },
    noofrooms: {
        type: Number,
    },
    hotelName: {
        type: String,
    },
    roomImage: {
        type: String,
    },
    // rating: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Review'
    // },
    roomDescription: {
        type: String
    },
    price: {
        type: Number
    }
});

module.exports = mongoose.model('Room', roomSchema);