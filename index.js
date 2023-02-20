const express = require('express')
const dotenv = require('dotenv');
const connectDb = require('./config/db');
const auth = require("./routes/auth");

dotenv.config({ path: './config/.env' });
connectDb();

const app = express();

app.use(express.json());

//mount routes
app.use("/api/v1/auth", auth);

const port = process.env.PORT || 5001

const server = app.listen(
    port, console.log(`Server running in ${process.env.APP_ENV} mode on port ${port}`)
)

//handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {

    console.log(`error: ${err.message}`, err);

    //close server and exit process
    server.close(() => process.exit(1));
})