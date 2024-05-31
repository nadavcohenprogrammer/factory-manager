const mongoose = require('mongoose');
require('dotenv').config();
const dbUrl = process.env.MONGO_URL

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://Nadav:Qwaszx058@atlascluster.gfoswkl.mongodb.net/', {
            useNewUrlParser: true,
            dbName:'Factory',
            useUnifiedTopology: true,
            // bufferCommands: false, // Disable command buffering
        });
        console.log('MongoDB Connected...');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}
module.exports = connectDB;