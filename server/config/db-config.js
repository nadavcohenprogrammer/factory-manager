const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const connectDB = async () => {
    try {
        const mongoUrl = process.env.MONGO_URL;
        
        if (!mongoUrl) {
            throw new Error('MONGO_URL is not defined in environment variables');
        }
        await mongoose.connect(mongoUrl, {
            useNewUrlParser: true,
            dbName: 'Factory',
            useUnifiedTopology: true,
            // bufferCommands: false, // Disable command buffering
        });
        console.log('MongoDB Connected...');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

module.exports = connectDB;
