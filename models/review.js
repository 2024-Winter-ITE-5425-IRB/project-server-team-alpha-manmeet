const mongoose = require('mongoose');

const reviewsSchema = new mongoose.Schema({
    // reviewId: {
    //     type: Number
    // },
    // userId: {
    //     type: Number
    // },
    roomId: {
        type: Number,
        ref: 'Room',
        unique: true
    },
    cleanliness: {
        type: Number
    },
    location: {
        type: Number
    },
    value: {
        type: Number
    },
    accuracy: {
        type: Number
    },
    communication: {
        type: Number
    },
    checkin: {
        type: Number
    },
    rating: {
        type: Number
    },
    // isRecommended: {
    //     type: Boolean
    // },
    reviewDate: {
        type: Date,
        default: Date.now
    },
    comment: {
        type: String
    }
    
});

module.exports = mongoose.model('Review', reviewsSchema);