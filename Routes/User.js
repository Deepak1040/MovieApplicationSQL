const express = require('express');
const router = express.Router();
const UserController = require('../Controller/UserController.js');
const auth = require('../middleware/auth.js')
router.get('/', auth, UserController.getUsers);
router.get('/:id', auth, UserController.getUser);
router.post('/', UserController.createUser);
router.post('/login', UserController.login);
router.put('/:id', auth, UserController.updateUser);
router.delete('/:id', auth, UserController.deleteUser);

module.exports = router;
