const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

const corsOptions = {
    origin: '*',
    exposedHeaders: 'Authorization'
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/public/images", express.static(path.join(__dirname, '/public/images')));
app.use('/api', require('./src/middlewares/api'));

const host = 'localhost';
const port = 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}. | http://${host}:${port}`);
});