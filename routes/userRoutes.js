const express = require('express');
const passport = require('passport');

const router = express.Router();

const controller = require('./../controllers/userController')


router.post('/register', controller.registerUser);
router.post('/login', controller.login);

router.use(passport.authenticate('jwt', {session:false}));

router.get('/list', controller.listUsers);
router.get('/profile', controller.profile);


module.exports = router;