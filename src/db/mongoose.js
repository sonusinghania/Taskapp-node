const mongoose = require('mongoose');

// Define the MongoDB connection URL with the correct IP and port
const mongodbUrl = 'mongodb://127.0.0.1:27017/task-manager-app-api';

// Use createConnection method to establish the connection
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');

    
       
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
