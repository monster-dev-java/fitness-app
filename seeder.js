const fs = require('fs');

const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: "./config/.env" });


const User = require("./models/User");

//connect to the data
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//read json data from files
const users = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/user.json`, 'utf-8')
);

console.log("user", users);

//import data into db
const importData = async () => {
    try {
        await User.create(users);
        console.log("data imported")
        exit(1);
    } catch (error) {
        console.error("error", error);
    }
}

//delete the data from the database
const deleteData = async () => {
    try {
        await User.deleteMany(users);
        console.log("data deleted");
    } catch (error) {
        console.error(error);
    }
}

if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
}