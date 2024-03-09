const express = require('express');
const router = express.Router();
const Room = require('../models/room');
const room = require('../models/room');
const roomImage = require('../models/roomImage');

// Getting all rooms
router.get('/', async (req, res) => {
    try {
        const room = await Room.find();
        res.json(room);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Creating a room
router.post('/', async (req, res) => {
    const room = new Room({
        roomId: req.body.roomId,
        noofrooms: req.body.noofrooms,
        hotelName: req.body.hotelName,
        roomImage: req.body.roomImage,
        //rating: req.body.rating,
        roomDescription: req.body.roomDescription,
        price: req.body.price
    });
    try {
        const newRoom = await room.save();
        res.status(201).json(newRoom);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Delete room by id
router.delete('/:id', async (req, res) => {
    try {
        await Room.findByIdAndDelete(req.params.id);
        res.json({ message: "Room Deleted" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;