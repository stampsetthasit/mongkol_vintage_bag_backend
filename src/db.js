const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://m0ngk0l:gJvzElHzVMJX6kqV@mongkolcluster.pzwrdmy.mongodb.net/test', {
    auth : {
      username: 'm0ngk0l',
      password: 'gJvzElHzVMJX6kqV'
    }
  })
  .then(() => console.log('DB Connected!')).catch((e) => console.log(`mongoose error: ${e}`));

mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection open');
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose default connection error: ' + err);
});

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