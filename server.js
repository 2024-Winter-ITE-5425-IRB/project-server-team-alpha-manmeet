require('dotenv').config;
const express = require('express');
const app = express();
//const port      = process.env.PORT;
const {connect} = require("./Database_mongoose");
const cors = require("cors");

app.use(cors());

connect().then((connectedClient) => {
    client = connectedClient;
    console.log("Connected to MongoDB");
   }).catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1); 
   });
   
app.use(express.json());

const reviewsRouter = require('./routes/reviews');
app.use('/reviews', reviewsRouter);

const roomImageRouter = require('./routes/roomImages');
app.use('/roomImages', roomImageRouter);

const FAQRouter = require('./routes/faqs');
app.use('/faqs', FAQRouter);

const RoomRouter = require('./routes/rooms');
app.use('/rooms', RoomRouter);

app.listen(8080, () => {
    console.log('Server started');
});