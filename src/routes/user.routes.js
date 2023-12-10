// userRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const Auth = require('../utils/Auth');

router.put('/:id', Auth.validaAcesso, UserController.alterarUsuario);

module.exports = router;
