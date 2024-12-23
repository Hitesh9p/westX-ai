require('dotenv').config();
const mongoose = require('mongoose');

async function testConnection() {
    try {
        // Print the URI (but hide the password)
        const maskedURI = process.env.MONGODB_URI.replace(
            /:([^@]+)@/, 
            ':****@'
        );
        console.log('Attempting to connect with URI:', maskedURI);

        // Try to connect
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected successfully to MongoDB!');

        // Get database information
        const dbName = mongoose.connection.name;
        console.log('Connected to database:', dbName);

        // Close the connection
        await mongoose.connection.close();
        console.log('Connection closed successfully');
    } catch (error) {
        console.error('❌ Connection error:', error);
    } finally {
        // Exit the process
        process.exit();
    }
}

// Run the test
console.log('🔄 Testing MongoDB connection...');
testConnection();