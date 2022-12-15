const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

const corsOptions = {
    origin: '*',
    exposedHeaders: 'Authorization'
}

app.use(cors(corsOptions)); //use cors for header Authorization
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/public/images", express.static(path.join(__dirname, '/public/images'))); //Images path
app.use('/api', require('./src/middlewares/api')); //Use API path

// Server
const host = 'localhost';
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}. | http://${host}:${port}`);
});