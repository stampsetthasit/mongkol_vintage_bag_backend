// const Users = require('../models/user_schema');
// const { provider } = require('@hapi/joi/lib/cache');
const firebase = require('../firebase');
const { registerValidation } = require('../services/validation');
const Users = require('../models/user_schema');

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
        address: data.address,
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
      
      const idToken = await userdata.user.getIdToken(true)
      return res.status(202).header('Authorization', `Bearer ${idToken}`).json({result: 'Accepted', message: '', data: userdata});
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return res.status(500).json({result: 'Internal Server Error', message: errorMessage, errorCode: errorCode});
    });
};

exports.resetPassword = async (req, res) => {
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

exports.isAdmin = async (req, res, next) => {
  const idToken = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null;
  mongkolGetAuth
  .verifyIdToken(idToken)
  .then( async (decodedToken) => {
    const user = decodedToken.email    
    const data = await Users.findOne({ 'email': user});
    const roles = String(data.roles)
    if (roles != "admin") return res.status(401).json({result: 'Unauthorized', message: "You do not have the correct administrator privileges.", data: {}})
    
    next()
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    return res.status(500).json({result: 'Internal Server Error', message: errorMessage, errorCode: errorCode});
  })
}

exports.userCreds = async (req, res, next) => {
  const idToken = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null;
  if (!idToken) {
    return res.status(404).json({ result: 'Not found', message: 'No token provied.', data: {}})
  }

  mongkolGetAuth
  .verifyIdToken(idToken)
      .then((userCredential) => {
        const user = userCredential;
        req.useremail = user.email;
        next();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        return res.status(500).json({result: 'Internal Server Error', message: errorMessage, errorCode: errorCode});
      });
}

