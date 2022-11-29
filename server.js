const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/images", express.static(path.join(__dirname, '/public/images')));
app.use("/css", express.static(path.join(__dirname, '/public/css')));
app.use('/api', require('./src/middlewares/api'));

const host = 'localhost';
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}. | http://${host}:${port}`);
});