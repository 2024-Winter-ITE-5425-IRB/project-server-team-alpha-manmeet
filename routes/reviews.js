const express = require('express');
const router = express.Router();
const Review = require('../models/review');

//Getting all reviews
router.get('/', async (req,res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (error) {
        res.status(500).json({message : error.message })
    }
});

//Getting review by id
// router.get('/:id', async (req, res) => {
//     try {
//         const review = await Review.findById(req.params.id);
//         if( review == null){
//             return res.status(404).json({message : "Cannnot find such review"})
//         }
//         res.json(review);
//     } catch (error) {
//         res.status(500).json({message : error.message })
//     }
    
// });

//Getting review by roomid
router.get('/:roomId', async (req, res) => {
    const roomId = req.params.roomId;
    try {
        const review = await Review.find({ roomId : roomId });
        if( review == null){
            return res.status(404).json({message : "Cannnot find room id"})
        }
        res.json(review);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({message : error.message })
    }
    
});

router.post('/', async (req, res) => {
    
    try {
        // Extract review data from request body
        const { cleanlinessRating, locationRating, valueRating, accuracyRating, communicationRating, checkInRating, comment } = req.body;
        console.log(req.body);
        console.log(cleanlinessRating);
        // Calculate average rating
        const averageRating = ((cleanlinessRating + locationRating + valueRating + accuracyRating + communicationRating + checkInRating) / 6).toFixed(1);
        console.log(averageRating);

        // Create a new review instance
        const newReview = new Review({
            roomId: req.body.roomId,
            cleanliness: cleanlinessRating,
            location: locationRating,
            value: valueRating,
            accuracy: accuracyRating,
            communication: communicationRating,
            checkin: checkInRating,
            rating: averageRating, // Store the average rating in the 'rating' field
            comment: comment
        });

        // Save the review to the database
        await newReview.save();

        // Send response to client
        res.status(201).json({ message: 'Review submitted successfully' });
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: 'Failed to submit review', error: error.message });
    }
});

// //Creating a review
// router.post('/', async (req, res) => {
//     const review = new Review({
//         //reviewId: req.body.reviewId,
//         // userId: req.body.userId,
//         // roomId: req.body.roomId,
//         // cleanliness: req.body.cleanlinessRating,
//         // location: req.body.locationRating,
//         // value: req.body.valueRating,
//         // accuracy: req.body.accuracyRating,
//         // communication: req.body.communicationRating,
//         // checkin: req.body.checkInRating,
//         // rating: req.body.averageRating,
//         // comment: req.body.comment
//         cleanliness: req.body.cleanliness,
//         location: req.body.location,
//         value: req.body.value,
//         accuracy: req.body.accuracy,
//         communication: req.body.communication,
//         checkin: req.body.checkin,
//         rating: req.body.rating,
//         comment: req.body.comment
//     })
//     try {
//         const newReview = await review.save();
//         res.status(201).json(newReview); 
//     } catch (error) {
//         res.status(400).json({message : error.message})
//     }

// });

//Updating the comment in review by id
router.patch('/:id', async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if( review == null){
            return res.status(404).json({message : "Cannnot find such review"})
        }
        if( req.body.comment != null) {
            review.comment = req.body.comment;
        }
        await review.save();
        res.json(review);
    } catch (error) {
        res.status(500).json({message : error.message })
    }
});

//Delete review by id
router.delete('/:id', async (req, res) => {
    try {
        const deleteReview = await Review.findByIdAndDelete(req.params.id);
        res.json({message : "Review Deleted"})
    } catch (error) {
        res.status(400).json({message : error.message})
    }
});

module.exports = router;