// const Users = require('../models/user_schema');
// const { provider } = require('@hapi/joi/lib/cache');
const firebase = require('../firebase');
const { registerValidation } = require('../services/validation');
const Users = require('../models/user_schema');
const { empty } = require('@hapi/joi/lib/base');

exports.register = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(200).json({result: 'OK', message: error.details[0].message, data: {}});

  firebase
    .auth()
    .createUserWithEmailAndPassword(req.body.email, req.body.password)
    .then( async (userdata) => {

      const data = await Users.create(req.body)
      const userScheama = {
        email: data.email,
        firstname: data.firstname,
        lastname: data.lastname,
        dob: data.dob,
        gender: data.gender,
        address: data.address
      }

      return res.status(200).json({result: 'OK', message: 'Success create account', data: {userScheama}}), 
      userdata.user.updateProfile({displayName: req.body.firstname})
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return res.status(500).json({result: 'Internal Server Error', message: errorMessage, errorCode: errorCode});
    });
};

exports.login = async (req, res) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(req.body.email, req.body.password)
    .then( async (userdata) => {
      //fetch user data from mongo here using email
      //give both userdata from mongo and user creds (accessToken) from firebase
      const data = await Users.findOne({
        email: req.body.email
      })

      const accessToken = userdata.user.toJSON().stsTokenManager.accessToken
      return res.status(202).header('Authorization', `Bearer ${accessToken}`).json({result: 'Accepted', message: '', data: userdata});
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return res.status(500).json({result: 'Internal Server Error', message: errorMessage, errorCode: errorCode});
    });
};

exports.resetPassword = (req, res) => {
  firebase
    .auth()
    .sendPasswordResetEmail(req.body.email)
    .then(function (userdata) {
      return res.status(200).json({result: 'OK', message: "Password reset email sent!", data: {userdata}});
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return res.status(500).json({result: 'Internal Server Error', message: errorMessage, errorCode: errorCode});
    });
};

exports.userCreds = async (req, res, next) => {
  const accessToken = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null;
  if (!accessToken) {
    return res.status(403).json({ result: 'Not found', message: 'No token provied.', data: {}})
  }

  firebase.auth().signInWithCustomToken(token)
      .then((userCredential) => {
        const user = userCredential.user;
        req.useremail = user.email;
        next();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        return res.status(500).json({result: 'Internal Server Error', message: errorMessage, errorCode: errorCode});
      });
}

