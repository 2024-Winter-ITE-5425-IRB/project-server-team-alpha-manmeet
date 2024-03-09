const mongoose = require('mongoose');

const roomImageSchema = new mongoose.Schema({
    imageId: {
        type: Number
    },
    roomId: {
        type: Number
    },
    imageURL: {
        type: String,
        
    }, 
});

module.exports = mongoose.model('RoomImage', roomImageSchema);