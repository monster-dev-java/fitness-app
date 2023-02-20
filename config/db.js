const mongoose = require('mongoose');

const connectDb = async () => {
    const con = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    console.log(`Mongo connected: ${con.connection.host}`);
}

module.exports = connectDb