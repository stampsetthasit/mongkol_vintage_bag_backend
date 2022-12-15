// Connect to MongoDB
// https://mongoosejs.com/docs/connections.html
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://m0ngk0l:gJvzElHzVMJX6kqV@mongkolcluster.pzwrdmy.mongodb.net/MongkolDB', {
    auth : {
      username: 'm0ngk0l',
      password: 'gJvzElHzVMJX6kqV'
    }
  })
  .then(() => console.log('DB Connected!')).catch((e) => console.log(`mongoose error: ${e}`));

// Connect success
mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection open');
});

// Connect fail
mongoose.connection.on('error', (err) => {
  console.log('Mongoose default connection error: ' + err);
});

// Connect disconnect
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});

process.on('SIGINT', () => {
  mongoose.connection.close( () => {
    console.log(
      'Mongoose default connection disconnected through app termination'
    );
    process.exit(0);
  });
});