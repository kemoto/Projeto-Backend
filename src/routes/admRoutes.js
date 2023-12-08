const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdmController');
const Auth = require('../utils/Auth');

router.post('/criar-adm', Auth.validaAcesso, AdminController.criarAdministrador);

router.delete('/:id', Auth.validaAcesso, AdminController.excluirUsuario);

router.put('/:id', Auth.validaAcesso, AdminController.alterarUsuario);

module.exports = router;
