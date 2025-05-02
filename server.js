const express = require('express');
const mongoose = require('mongoose');
const ServiceRequest = require('./models/ServiceRequest'); // Import the model

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection URI
const mongoURI = 'mongodb://localhost:27017/roadbuddy'; // Replace with your MongoDB URI

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Middleware to parse JSON request body
app.use(express.json());

// Route to create a service request
app.post('/api/service-request', async (req, res) => {
  try {
    const { name, email, service, location } = req.body;
    
    // Create a new service request
    const newRequest = new ServiceRequest({ name, email, service, location });

    // Save the service request to the database
    await newRequest.save();

    res.status(201).json({ message: 'Service request created successfully', request: newRequest });
  } catch (error) {
    res.status(500).json({ message: 'Error creating service request', error });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${++PORT}`);
});
